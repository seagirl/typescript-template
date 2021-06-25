import express, { Express, NextFunction, Request, Response } from 'express'
import { Server } from 'http'
import { DateTime } from 'luxon'
import { loadConfig } from '../../config'
import { DB } from '../../db'
import routes from './api'
import { corsHandler } from './cors'
import { OpenAPIValidator } from './openapi-validator'
import { ExpressSentry } from './sentry'
import { Session } from './session'

export default class Application {
  public readonly express: Express = express()
  private sentry!: ExpressSentry
  private db = new DB()
  private apiSpecPath = './doc/api/index.json'
  private validator = new OpenAPIValidator('./doc/api/index.json')
  private server!: Server

  private get isTest (): boolean {
    return process.env.NODE_ENV?.match(/^test/) ? true : false
  }

  async init (): Promise<void> {
    const config = await loadConfig()

    if (!this.isTest) {
      this.sentry = new ExpressSentry(config.sentryDSN)
    }

    await this.db.init()

    const session = new Session({
      secret: 'session-secret-s2',
      storeTableName: 'express_sessions'
    })

    if (config.trustProxy != null) {
      this.express.set('trust proxy', config.trustProxy)
    }

    if (!this.isTest) {
      this.express.use(this.sentry.requestHandler)
    }

    this.express.use(corsHandler)

    this.express.use(express.json({ limit: '10mb' }))
    this.express.use(express.urlencoded({ extended: true, limit:'10mb' }))

    const validationHandler = await this.validator.middleware()
    this.express.use(validationHandler)

    this.express.use(session.handler)
    this.express.use(session.authorizationHandler)
    this.express.use(this.apiCacheControlHandler)

    this.express.use('/api', routes)

    if (!this.isTest) {
      this.express.use(this.sentry.errorHandler)
    }

    this.express.use(this.errorHandler)
  }

  start (): void {
    process.on('SIGTERM', this.shutdownHandler)
    process.on('SIGINT', this.shutdownHandler)

    const port = process.env.PORT || 3000
    this.server = this.express.listen(port, () => {
      console.log(`Example app listening on port ${port}!`)
    })
    // AWS ELB のデフォルトが 60sec なのでそれより長くする
    this.server.keepAliveTimeout = 120000
    // headersTimeout は keepAliveTimeout より長い必要がある
    this.server.headersTimeout = 130000
  }

  async finish (): Promise<void> {
    await this.db.close()
  }

  private apiCacheControlHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.header('Pragma', 'no-cache')
    res.header('Cache-Control', ['no-cache', 'no-store', 'must-revalidate'])
    res.header('Expires', DateTime.local().minus({ day: 1 }).toHTTP())
    res.header('X-Content-Type-Options', 'nosniff')
    res.header('X-Frame-Options', 'DENY')
    next()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  private errorHandler = (err: { stack: string; status: number; message: string }, req: Request, res: Response, next: NextFunction): void => {
    if (!this.isTest) {
      console.error(`[ERROR] ${err.stack}`)
    }

    res.status(err.status || 500)
    res.json({
      response: 'error',
      status: err.status,
      message: err.message,
      stacktrace: err.stack
    })
  }

  private shutdownHandler = (): void => {
    console.log('Closing HTTP Server.')

    this.server.close(() => {
      console.log('HTTP Server closed.')

      this.finish().finally(() => {
        console.log('DB connection closed.')

        process.exit()
      })
    })
  }
}
