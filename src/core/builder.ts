import { Controller, Presenter } from '.'

export abstract class Builder<T> {
  public controller!: Controller
  public presenter!: Presenter
}
