import { DeleteMemberUseCaseOutput } from '../../../app/usecase/member/delete-member.usecase'
import { Controller, Presenter, Request, Usecase } from '../../../core'

export class DeleteMemberController implements Controller {
  constructor (public interactor: Usecase) {}

  handle (input: Request): Promise<DeleteMemberUseCaseOutput> {
    const code = input.params.code

    return this.interactor.execute({
      code: code
    })
  }
}

interface DeleteMemberPresenterOutput {
  response: string;
}

export class DeleteMemberPresenter implements Presenter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  present (input: DeleteMemberUseCaseOutput): DeleteMemberPresenterOutput {
    return {
      response: 'ok'
    }
  }
}
