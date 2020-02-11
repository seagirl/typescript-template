import { Ttl, TypeormStore, ISession } from 'connect-typeorm'
import express from 'express'
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
}