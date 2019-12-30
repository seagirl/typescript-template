import { Member } from '../../../domain/entity'
import { MemberViewModel } from '../../view-model'

export const translate = (input: Member): MemberViewModel => {
  return {
    name: input.code,
  }
}