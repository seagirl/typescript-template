import { GetMembersInteractor } from '../../../app/usecase/member/get-members.usecase'
import { Builder } from '../../../core'
import { MemberRepository } from '../../../db/repository'
import { GetMembersController, GetMembersPresenter } from '../../adapter/member/get-members'

export class GetMembersBuilder extends Builder {
  constructor () {
    super()

    const repository = new MemberRepository()
    const usecase = new GetMembersInteractor({ repository: repository })

    this.controller = new GetMembersController(usecase)
    this.presenter = new GetMembersPresenter()
  }
}
