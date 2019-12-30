import { MemberFactory } from './member.factory'

const testCode = 'test'

describe('Member Factory', () => {
  it('create', () => {
    const result = MemberFactory.create({ id: 1, code: testCode })

    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        code: testCode,
      })
    )
  })
})
