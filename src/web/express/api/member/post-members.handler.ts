import { PostMembersInteractor, Response } from '../../../../app/usecase/member/post-members.usecase'
import { lowerCamelCase, snakeCase, Usecase } from '../../../../core'
import { Controller } from '../../../../core/web/express/controller'
import { Handler } from '../../../../core/web/express/handler'
import { Presenter } from '../../../../core/web/express/presenter'
import { mergeParameters, Request } from '../../../../core/web/express/request'
import { translateRecord } from '../../../../core/web/translator'
import { MemberRepository } from '../../../../db/repository/member.repository'
import { Transaction } from '../../../../db/transaction'

class PostMembersController implements Controller {
  constructor (public interactor: Usecase) {}

  handle (request: Request): Promise<Response> {
    const params = mergeParameters(request)
    return this.interactor.execute(translateRecord(lowerCamelCase, params))
  }
}

class PostMembersPresenter implements Presenter {
  present (response: Response): Record<string, unknown> {
    return {
      response: 'ok',
      ...translateRecord(snakeCase, response),
    }
  }
}

export class PostMembersHandler extends Handler {
  constructor (private transaction = new Transaction()) {
    super()

    const memberRepository = new MemberRepository(transaction.manager)

    const usecase = new PostMembersInteractor({
      transaction: transaction,
      memberRepository: memberRepository,
      memberIdentifierGenerator: memberRepository
    })

    this.controller = new PostMembersController(usecase)
    this.presenter = new PostMembersPresenter()
  }

  async finish (): Promise<void> {
    await this.transaction.close()
  }
}
