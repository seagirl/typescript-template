import { ClientError, Usecase } from '../../../core'
import { MemberEntity } from '../../../domain/entity'
import { MemberRepository } from '../../repository/member.repository'

export interface GetMemberUseCaseInput {
  code: string;
}

export type GetMemberUseCaseOutput = MemberEntity

export interface GetMemberUseCaseDependency {
  repository: MemberRepository;
}

export interface GetMemberUsecase extends Usecase {
  execute (input: GetMemberUseCaseInput): Promise<GetMemberUseCaseOutput>;
}

export class GetMemberInteractor implements GetMemberUsecase, GetMemberUseCaseDependency {
  repository: MemberRepository

  constructor (dependency: GetMemberUseCaseDependency) {
    this.repository = dependency.repository
  }

  async execute (input: GetMemberUseCaseInput): Promise<GetMemberUseCaseOutput> {
    const member = await this.repository.find(input.code)
    if (!member) {
      throw new ClientError(`${input.code} is not found.`)
    }
    return member
  }
}
