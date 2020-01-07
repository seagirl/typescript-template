import { MemberFactory } from '../../domain/factory/member.factory'
import { GetMembersInteractor } from './get-members.usecase'
import { MockMemberRepository } from './member.repository'

const testMember = MemberFactory.createMock()

const repository = new MockMemberRepository()
const interactor = new GetMembersInteractor({
  repository: repository
})

let repositorySearchSpy: jest.SpyInstance

describe('GetMembersInteractor', () => {
  beforeEach(() => {
    repositorySearchSpy = jest.spyOn(repository, 'search')
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('execute', async () => {
    repositorySearchSpy.mockReturnValue(Promise.resolve([testMember]))

    const result = await interactor.execute({})
    expect(result).toEqual({ data: [testMember] })

    expect(repositorySearchSpy).toHaveBeenCalledTimes(1)
  })
})