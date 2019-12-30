import { Request, Controller, Presenter, Usecase } from '../../../core'
import { Member } from '../../../domain/entity'
import { GetMembersUseCaseOutput } from '../../../app/member/get-members.usecase'
import { MemberViewModel } from '../../view-model'
import { translate } from './translator'

export class GetMembersController implements Controller {
  constructor (public interactor: Usecase) {}

  handle (input: Request): Promise<GetMembersUseCaseOutput> {
    const limit = input.query.limit || 10000
    const offset = input.query.offset || 0
    const state = input.query.state

    return this.interactor.execute({
      limit: limit,
      offset: offset,
      state: state
    })
  }
}

interface GetMembersPresenterOutput {
  response: string;
  members: MemberViewModel[];
}

export class GetMembersPresenter implements Presenter {
  present (input: GetMembersUseCaseOutput): GetMembersPresenterOutput {
    const data = input.data.map((entity: Member) => {
      return translate(entity)
    })
    return {
      response: 'ok',
      members: data
    }
  }
}
