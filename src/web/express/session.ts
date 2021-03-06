import { ISession, Ttl, TypeormStore } from 'connect-typeorm'
import express, { NextFunction, Request, RequestHandler, Response } from 'express'
import ExpressSession from 'express-session'
import { getManager, Repository } from 'typeorm'

type SessionOptions = Partial<ExpressSession.SessionOptions & {
  cleanupLimit: number;
  limitSubquery: boolean;
  ttl: Ttl;
}> & {
  secret: string;
  storeEntityClass: Function;
}

export class Session {
  public readonly handler: express.RequestHandler

  constructor (options: SessionOptions) {
    const repository: Repository<ISession> = getManager().getRepository(options.storeEntityClass)

    options.cleanupLimit = options.cleanupLimit ?? 2
    options.ttl = options.ttl ?? 60 * 60 * 24 * 14

    const store = new TypeormStore(options).connect(repository)

    options.store = store
    options.resave = options.resave ?? false
    options.saveUninitialized = options.saveUninitialized ?? false

    this.handler = ExpressSession(options)
  }

  get authorizationHandler (): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const authorization = req.header('Authorization')
      if (authorization != null) {
        const parts = authorization.split(' ')
        if (parts.length == 2 && parts[0].toLowerCase() === 'bearer') {
          const accessToken = parts[1]
          req.query.accessToken = accessToken
        }
      }

      next()
    }
  }
}