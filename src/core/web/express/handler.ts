import { Controller } from './controller'
import { Presenter } from './presenter'

export abstract class Handler {
  public controller!: Controller
  public presenter!: Presenter

  async finish (): Promise<void> {
    return Promise.resolve()
  }
}
