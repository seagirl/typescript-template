import { GetMemberInteractor } from '../../../app/usecase/member/get-member.usecase'
import { Builder } from '../../../core'
import { MemberRepository } from '../../../db/repository'
import { GetMemberController, GetMemberPresenter } from '../../adapter/member/get-member'

export class GetMemberBuilder extends Builder {
  constructor () {
    super()

    const repository = new MemberRepository()
    const usecase = new GetMemberInteractor({ repository: repository })

    this.controller = new GetMemberController(usecase)
    this.presenter = new GetMemberPresenter()
  }
}
