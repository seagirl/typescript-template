import { NextFunction, Request, Response } from 'express'
import { Handler } from './handler'

export const handle = async (builder: Handler, req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await builder.controller.handle({
      query: req.query,
      params: req.params,
      body: req.body,
      url: `${req.protocol}://${req.hostname}${req.originalUrl}`
    })
    res.json(builder.presenter.present(result))
  } catch (error) {
    next(error)
  }
}