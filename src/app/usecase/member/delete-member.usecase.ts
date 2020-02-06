import { ClientError, Transaction, Usecase } from '../../../core'
import { MemberRepository } from '../../repository/member.repository'

export interface DeleteMemberUseCaseInput {
  code: string;
}

export type DeleteMemberUseCaseOutput = object

export interface DeleteMemberUseCaseDependency {
  transaction: Transaction;
  repository: MemberRepository;
}

export interface DeleteMemberUsecase extends Usecase {
  execute (input: DeleteMemberUseCaseInput): Promise<DeleteMemberUseCaseOutput>;
}

export class DeleteMemberInteractor implements DeleteMemberUsecase, DeleteMemberUseCaseDependency {
  repository: MemberRepository
  transaction: Transaction

  constructor (dependency: DeleteMemberUseCaseDependency) {
    this.repository = dependency.repository
    this.transaction = dependency.transaction
  }

  async execute (input: DeleteMemberUseCaseInput): Promise<DeleteMemberUseCaseOutput> {
    const member = await this.repository.find(input.code)
    if (!member) {
      throw new ClientError(`${input.code} is not found.`)
    }

    await this.transaction.begin()

    try {
      await this.repository.delete(member)
      await this.transaction.commit()
    } catch {
      await this.transaction.rollback()
    } finally {
      this.transaction.close()
    }

    return {}
  }
}
