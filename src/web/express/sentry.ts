import { NextFunction, Request, Response } from 'express'
import * as Sentry from '@sentry/node'

export class ExpressSentry {
  public requestHandler: (req: Request, res: Response, next: NextFunction) => void
  public errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void

  constructor () {
    Sentry.init({
      environment: process.env.NODE_ENV ?? 'local',
      dsn: process.env.SENTRY_DSN
    })

    this.requestHandler = Sentry.Handlers.requestHandler()
    this.errorHandler = Sentry.Handlers.errorHandler({
      shouldHandleError: (err): boolean => {
        const statusCode = err.status || 500
        return statusCode !== 404 && statusCode >= 400
      }
    })
  }
}