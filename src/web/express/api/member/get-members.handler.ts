import { GetMembersInteractor, Response } from '../../../../app/usecase/member/get-members.usecase'
import { lowerCamelCase, snakeCase, Usecase } from '../../../../core'
import { Controller } from '../../../../core/web/express/controller'
import { Handler } from '../../../../core/web/express/handler'
import { Presenter } from '../../../../core/web/express/presenter'
import { mergeParameters, Request } from '../../../../core/web/express/request'
import { translateRecord } from '../../../../core/web/translator'
import { MemberRepository } from '../../../../db/repository/member.repository'

export class GetMembersHandler extends Handler {
  constructor () {
    super()

    const memberRepository = new MemberRepository()
    const usecase = new GetMembersInteractor({ memberRepository: memberRepository })

    this.controller = new GetMembersController(usecase)
    this.presenter = new GetMembersPresenter()
  }
}

class GetMembersController implements Controller {
  constructor (public interactor: Usecase) {}

  async handle (request: Request): Promise<Response> {
    const params = mergeParameters(request)
    const input = translateRecord(lowerCamelCase, params)
    return await this.interactor.execute(input)
  }
}

class GetMembersPresenter implements Presenter {
  present (response: Response): Record<string, unknown> {
    return {
      response: 'ok',
      ...translateRecord(snakeCase, response),
    }
  }
}