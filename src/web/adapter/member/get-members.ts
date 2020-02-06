import { GetMembersUseCaseOutput } from '../../../app/usecase/member/get-members.usecase'
import { Controller, Presenter, Request, Usecase } from '../../../core'
import { MemberEntity } from '../../../domain/entity'
import { MemberViewModel } from '../../view-model'
import { translate } from '../member.translator'

export class GetMembersController implements Controller {
  constructor (public interactor: Usecase) {}

  handle (input: Request): Promise<GetMembersUseCaseOutput> {
    const limit = input.query.limit || 10000
    const offset = input.query.offset || 0

    return this.interactor.execute({
      limit: limit,
      offset: offset,
    })
  }
}

interface GetMembersPresenterOutput {
  response: string;
  members: MemberViewModel[];
}

export class GetMembersPresenter implements Presenter {
  present (input: GetMembersUseCaseOutput): GetMembersPresenterOutput {
    const data = input.data.map((entity: MemberEntity) => {
      return translate(entity)
    })
    return {
      response: 'ok',
      members: data
    }
  }
}
