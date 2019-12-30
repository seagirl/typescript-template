import { ClientError } from '../../core'
import { MemberFactory } from '../../domain/factory/member.factory'
import { MockMemberRepository } from './member.repository'
import { GetMemberInteractor } from './get-member.usecase'

const testMember = MemberFactory.createMock()

const repository = new MockMemberRepository()
const interactor = new GetMemberInteractor({
  repository: repository
})

let repositoryFindSpy: jest.SpyInstance

describe('GetMemberInteractor', () => {
  beforeEach(() => {
    repositoryFindSpy = jest.spyOn(repository, 'find')
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('execute', async () => {
    repositoryFindSpy.mockReturnValue(Promise.resolve(testMember))

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual(testMember)

    expect(repositoryFindSpy).toHaveBeenCalledTimes(1)
  })

  it('find error', async () => {
    repositoryFindSpy.mockReturnValue(Promise.resolve(undefined))

    await expect(interactor.execute({ code: testMember.code })).rejects
      .toEqual(new ClientError('test is not found.'))

    expect(repositoryFindSpy).toHaveBeenCalledTimes(1)
  })
})