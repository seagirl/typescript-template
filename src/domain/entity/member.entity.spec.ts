import { MemberEntity } from './member.entity'

describe('Member', () => {
  it('new', () => {
    expect(() => { new MemberEntity(1, 'yoshizu') }).not.toThrow()
  })
})