import { MemberEntity } from '../../../domain/entity/member.entity'

export const translate = (input: MemberEntity): Record<string, unknown> => {
  return {
    name: input.code,
  }
}