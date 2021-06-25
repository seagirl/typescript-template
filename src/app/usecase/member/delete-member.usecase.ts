import { ClientError, Transaction, Usecase } from '../../../core'
import { MemberRepository } from '../../../domain/repository/member.repository'

export interface Props {
  transaction: Transaction;
  memberRepository: MemberRepository;
}

export interface Request {
  code: string;
}

export type Response = Record<string, unknown>

export class DeleteMemberInteractor implements Usecase {
  constructor (readonly props: Props) {}

  async execute (input: Request): Promise<Response> {
    const member = await this.props.memberRepository.find(input.code)
    if (!member) {
      throw new ClientError(`${input.code} is not found.`)
    }

    await this.props.transaction.begin()

    try {
      await this.props.memberRepository.delete(member)
      await this.props.transaction.commit()
    } catch {
      await this.props.transaction.rollback()
    } finally {
      await this.props.transaction.close()
    }

    return {}
  }
}
