import { MemberEntity } from '.'

describe('Member', () => {
  it('new', () => {
    expect(() => { new MemberEntity(1, 'yoshizu') }).not.toThrow()
  })
})