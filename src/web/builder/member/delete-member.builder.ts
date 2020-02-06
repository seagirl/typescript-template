import { DeleteMemberInteractor } from '../../../app/usecase/member/delete-member.usecase'
import { Builder } from '../../../core'
import { MemberRepository } from '../../../db/repository'
import { Transaction } from '../../../db/transaction'
import { DeleteMemberController, DeleteMemberPresenter } from '../../adapter/member/delete-member'

export class DeleteMemberBuilder extends Builder {
  constructor () {
    super()

    const transaction = new Transaction()
    const repository = new MemberRepository()
    const usecase = new DeleteMemberInteractor({
      transaction: transaction,
      repository: repository,
    })

    this.controller = new DeleteMemberController(usecase)
    this.presenter = new DeleteMemberPresenter()
  }
}
