import { DeleteMemberInteractor, Response } from '../../../../app/usecase/member/delete-member.usecase'
import { lowerCamelCase, snakeCase, Usecase } from '../../../../core'
import { Controller } from '../../../../core/web/express/controller'
import { Handler } from '../../../../core/web/express/handler'
import { Presenter } from '../../../../core/web/express/presenter'
import { mergeParameters, Request } from '../../../../core/web/express/request'
import { translateRecord } from '../../../../core/web/translator'
import { MemberRepository } from '../../../../db/repository/member.repository'
import { Transaction } from '../../../../db/transaction'

export class DeleteMemberHandler extends Handler {
  constructor () {
    super()

    const transaction = new Transaction()
    const memberRepository = new MemberRepository(transaction.manager)

    const usecase = new DeleteMemberInteractor({
      transaction: transaction,
      memberRepository: memberRepository,
    })

    this.controller = new DeleteMemberController(usecase)
    this.presenter = new DeleteMemberPresenter()
  }
}

class DeleteMemberController implements Controller {
  constructor (public interactor: Usecase) {}

  handle (request: Request): Promise<Response> {
    const params = mergeParameters(request)
    return this.interactor.execute(translateRecord(lowerCamelCase, params))
  }
}

class DeleteMemberPresenter implements Presenter {
  present (response: Response): Record<string, unknown> {
    return {
      response: 'ok',
      ...translateRecord(snakeCase, response),
    }
  }
}