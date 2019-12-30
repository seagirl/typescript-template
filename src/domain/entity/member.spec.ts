import { Member } from '.'

describe('Member', () => {
  it('new', () => {
    expect(() => { new Member(1, 'yoshizu') }).not.toThrow()
  })
})