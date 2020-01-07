import { GetMemberUseCaseOutput } from '../../../app/member/get-member.usecase'
import { Controller, Presenter, Request, Usecase } from '../../../core'
import { MemberViewModel } from '../../view-model'
import { translate } from './translator'

export class GetMemberController implements Controller {
  constructor (public interactor: Usecase) {}

  handle (input: Request): Promise<GetMemberUseCaseOutput> {
    const code = input.params.code

    return this.interactor.execute({
      code: code
    })
  }
}

interface GetMemberPresenterOutput {
  response: string;
  member: MemberViewModel;
}

export class GetMemberPresenter implements Presenter {
  present (input: GetMemberUseCaseOutput): GetMemberPresenterOutput {
    return {
      response: 'ok',
      member: translate(input)
    }
  }
}
