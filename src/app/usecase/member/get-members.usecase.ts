import { Usecase } from '../../../core'
import { MemberEntity } from '../../../domain/entity'
import { MemberRepository } from '../../repository/member.repository'

export interface GetMembersUseCaseInput {
  limit?: number;
  offset?: number;
}

export interface GetMembersUseCaseOutput {
  data: MemberEntity[];
}

export interface GetMembersUseCaseDependency {
  repository: MemberRepository;
}

export interface GetMembersUsecase extends Usecase {
  execute (input: GetMembersUseCaseInput): Promise<GetMembersUseCaseOutput>;
}

export class GetMembersInteractor implements GetMembersUsecase, GetMembersUseCaseDependency {
  repository: MemberRepository

  constructor (dependency: GetMembersUseCaseDependency) {
    this.repository = dependency.repository
  }

  async execute (input: GetMembersUseCaseInput): Promise<GetMembersUseCaseOutput> {
    const data = await this.repository.search(input)
    return {
      data: data
    }
  }
}
