import { Request, Response, NextFunction } from 'express'
import { Builder } from '../../core'

export const handle = async (builder: Builder<object>, req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await builder.controller.handle(req)
    res.json(builder.presenter.present(result))
  } catch (error) {
    next(error)
  }
}