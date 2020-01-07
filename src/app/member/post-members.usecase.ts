import { ClientError, IdentifierGenerator, ServerError, Transaction, Usecase } from '../../core'
import { Member } from '../../domain/entity'
import { MemberFactory } from '../../domain/factory/member.factory'
import { MemberRepository } from './member.repository'

export interface PostMembersUseCaseInput {
  code: string;
}

export type PostMembersUseCaseOutput = Member

export interface PostMembersUseCaseDependency {
  transaction: Transaction;
  repository: MemberRepository;
  identifierGenerator: IdentifierGenerator;
}

export interface PostMembersUsecase extends Usecase {
  execute (input: PostMembersUseCaseInput): Promise<PostMembersUseCaseOutput>;
}

export class PostMembersInteractor implements PostMembersUsecase, PostMembersUseCaseDependency {
  repository: MemberRepository
  transaction: Transaction
  identifierGenerator: IdentifierGenerator

  constructor (dependency: PostMembersUseCaseDependency) {
    this.repository = dependency.repository
    this.transaction = dependency.transaction
    this.identifierGenerator = dependency.identifierGenerator
  }

  async execute (input: PostMembersUseCaseInput): Promise<PostMembersUseCaseOutput> {
    let member = await this.repository.find(input.code)
    if (member) {
      throw new ClientError(`${input.code} is found.`)
    }

    await this.transaction.begin()

    try {
      const id = await this.identifierGenerator.nextIdentifier()
      member = MemberFactory.create({ id: id, code: input.code })

      await this.repository.save(member)
      await this.transaction.commit()
    } catch {
      await this.transaction.rollback()
    } finally {
      this.transaction.close()
    }

    if (!member) {
      throw new ServerError(`Something wrong to create ${input.code}.`)
    }

    return member
  }
}
