import { Usecase } from '../../../core'
import { MemberEntity } from '../../../domain/entity/member.entity'
import { MemberRepository } from '../../../domain/repository/member.repository'
import { translate } from './translator'

export interface Props {
  memberRepository: MemberRepository;
}

export interface Request {
  limit?: number;
  offset?: number;
}

export type Response = Record<string, unknown>

export class GetMembersInteractor implements Usecase {
  constructor (readonly props: Props) {}

  async execute (input: Request): Promise<Response> {
    const data = await this.props.memberRepository.search(input)

    const members = data.map((entity: MemberEntity) => {
      return translate(entity)
    })

    return {
      members: members
    }
  }
}
