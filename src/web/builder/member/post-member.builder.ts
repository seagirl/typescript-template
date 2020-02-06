import { PostMembersInteractor } from '../../../app/usecase/member/post-members.usecase'
import { Builder } from '../../../core'
import { MemberRepository } from '../../../db/repository'
import { Transaction } from '../../../db/transaction'
import { PostMembersController, PostMembersPresenter } from '../../adapter/member/post-members'

export class PostMembersBuilder extends Builder {
  constructor () {
    super()

    const transaction = new Transaction()
    const repository = new MemberRepository()
    const usecase = new PostMembersInteractor({
      transaction: transaction,
      repository: repository,
      identifierGenerator: repository,
    })

    this.controller = new PostMembersController(usecase)
    this.presenter = new PostMembersPresenter()
  }
}
