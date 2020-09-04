import { NextFunction, Request, Response } from 'express'
import { Builder, ClientError } from '../../core'

export const handle = async (builder: Builder, req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await builder.controller.handle({
      query: req.query,
      params: req.params,
      body: req.body
    })
    res.json(builder.presenter.present(result))
  } catch (error) {
    next(error)
  }
}

export function handleInput <T> (translator: () => T): T {
  try {
    return translator()
  } catch (error) {
    throw new ClientError(error.stack)
  }
}