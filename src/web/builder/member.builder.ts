import { Builder } from '../../core'
import { Member } from '../../domain/entity'
import { GetMembersInteractor } from '../../app/member/get-members.usecase'
import { GetMemberInteractor } from '../../app/member/get-member.usecase'
import { PostMembersInteractor } from '../../app/member/post-members.usecase'
import { DeleteMemberInteractor } from '../../app/member/delete-member.usecase'
import { GetMembersController, GetMembersPresenter } from '../adapter/member/get-members'
import { GetMemberController, GetMemberPresenter } from '../adapter/member/get-member'
import { PostMembersController, PostMembersPresenter } from '../adapter/member/post-members'
import { DeleteMemberController, DeleteMemberPresenter } from '../adapter/member/delete-member'
import { Transaction } from '../../db/transaction'
import { MemberRepository } from '../../db/repository'

export class GetMembersBuilder extends Builder<Member> {
  constructor () {
    super()

    const repository = new MemberRepository()
    const usecase = new GetMembersInteractor({ repository: repository })

    this.controller = new GetMembersController(usecase)
    this.presenter = new GetMembersPresenter()
  }
}

export class GetMemberBuilder extends Builder<Member> {
  constructor () {
    super()

    const repository = new MemberRepository()
    const usecase = new GetMemberInteractor({ repository: repository })

    this.controller = new GetMemberController(usecase)
    this.presenter = new GetMemberPresenter()
  }
}

export class PostMembersBuilder extends Builder<Member> {
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

export class DeleteMemberBuilder extends Builder<Member> {
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
