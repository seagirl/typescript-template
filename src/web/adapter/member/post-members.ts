import { PostMembersUseCaseOutput } from '../../../app/member/post-members.usecase'
import { Controller, Presenter, Request, Usecase } from '../../../core'
import { MemberViewModel } from '../../view-model'
import { translate } from './translator'

export class PostMembersController implements Controller {
  constructor (public interactor: Usecase) {}

  handle (input: Request): Promise<PostMembersUseCaseOutput> {
    const code = input.query.code

    return this.interactor.execute({
      code: code
    })
  }
}

interface PostMembersPresenterOutput {
  response: string;
  member: MemberViewModel;
}

export class PostMembersPresenter implements Presenter {
  present (input: PostMembersUseCaseOutput): PostMembersPresenterOutput {
    return {
      response: 'ok',
      member: translate(input)
    }
  }
}
