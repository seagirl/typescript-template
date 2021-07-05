import { ClientError, IdentifierGenerator, ServerError, Transaction } from '../../../core'
import { MemberFactory } from '../../../domain/factory/member.factory'
import { MemberRepository } from '../../../domain/repository/member.repository'
import { translate } from './translator'

export interface Props {
  transaction: Transaction;
  memberRepository: MemberRepository;
  memberIdentifierGenerator: IdentifierGenerator<number>;
}

export interface Request {
  code: string;
}

export type Response = Record<string, unknown>

export class PostMembersInteractor {
  constructor (readonly props: Props) {}

  async execute (input: Request): Promise<Response> {
    let member = await this.props.memberRepository.find(input.code)
    if (member) {
      throw new ClientError(`${input.code} is found.`)
    }

    await this.props.transaction.begin()

    try {
      const id = await this.props.memberIdentifierGenerator.nextIdentifier()
      member = MemberFactory.create({ id: id, code: input.code })

      await this.props.memberRepository.save(member)
      await this.props.transaction.commit()
      await this.props.transaction.close()
    } catch (error) {
      await this.props.transaction.rollback()
      await this.props.transaction.close()
      throw error
    }

    if (!member) {
      throw new ServerError(`Something wrong to create ${input.code}.`)
    }

    return {
      member: translate(member)
    }
  }
}
