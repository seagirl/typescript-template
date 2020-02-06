import { MemberEntity } from '../../domain/entity'
import { MemberViewModel } from '../view-model'

export const translate = (input: MemberEntity): MemberViewModel => {
  return {
    name: input.code,
  }
}