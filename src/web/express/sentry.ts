import * as Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'

export class ExpressSentry {
  public requestHandler: (req: Request, res: Response, next: NextFunction) => void
  public errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void

  constructor (dsn: string) {

    Sentry.init({
      environment: process.env.NODE_ENV ?? 'local',
      dsn: dsn
    })

    this.requestHandler = Sentry.Handlers.requestHandler()
    this.errorHandler = Sentry.Handlers.errorHandler({
      shouldHandleError: (err): boolean => {
        const env = process.env.NODE_ENV ?? 'local'
        const statusCode = err.status || 500
        if (env === 'staging' || env === 'production') {
          return statusCode !== 404 && statusCode >= 400
        }
        return statusCode !== 404 && statusCode >= 500
      }
    })
  }
}