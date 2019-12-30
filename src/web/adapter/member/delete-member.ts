import { Request, Controller, Presenter, Usecase } from '../../../core'
import { DeleteMemberUseCaseOutput } from '../../../app/member/delete-member.usecase'

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
