import { MemberFactory } from '../../domain/factory/member.factory'
import { DB } from '../../db'
import { MemberRepository } from '.'

const db = new DB()
const testCode = 'test'

describe('Member Repository', () => {
  beforeAll(async () => {
    await db.init()
  })

  afterAll(async () => {
    await db.close()
  })

  it('create', async () => {
    const repository = new MemberRepository()

    const id = await repository.nextIdentifier()
    const member = MemberFactory.create({ id: id, code: testCode })

    await repository.save(member)
    const result = await repository.find(member.code)

    expect(result).toEqual(
      expect.objectContaining({
        id: member.id,
        code: member.code,
      })
    )
  })

  it('search', async () => {
    const repository = new MemberRepository()
    const result = await repository.search()

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          code: expect.any(String),
        })
      ])
    )
  })

  it('search with params', async () => {
    const repository = new MemberRepository()
    const result = await repository.search({
      limit: 100,
      offset: 0
    })

    if (result.length == 0)
      return

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          code: expect.any(String),
        })
      ])
    )
  })

  it('find', async () => {
    const repository = new MemberRepository()
    const result = await repository.find(testCode)

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        code: testCode,
      })
    )
  })

  it('update', async () => {
    const repository = new MemberRepository()

    const member = await repository.find(testCode)
    expect(member).toBeDefined()
    if (!member) {
      return
    }

    await repository.save(member)

    const result = await repository.find(member.code)

    expect(result).toEqual(
      expect.objectContaining({
        id: member.id,
        code: member.code,
      })
    )
  })

  it('delete', async () => {
    const repository = new MemberRepository()

    let member = await repository.find(testCode)
    expect(member).not.toBe(undefined)
    if (!member) {
      return
    }

    await repository.delete(member)

    member = await repository.find(testCode)
    expect(member).toBe(undefined)
  })
})
