import { calledTimes, mockReturnValues } from '../../../core/test/mock'
import { MemberFactory } from '../../../domain/factory/member.factory'
import { mockMemberRepository } from '../../../domain/repository/member.repository'
import { GetMembersInteractor } from './get-members.usecase'

const testMember = MemberFactory.createMock()

const dependency = {
  memberRepository: mockMemberRepository
}

const interactor = new GetMembersInteractor(dependency)

interface Scenario {
  memberRepositorySearchSpy: jest.SpyInstance;
}

let scenario: Scenario

describe('GetMembersInteractor', () => {
  beforeEach(() => {
    scenario = {
      memberRepositorySearchSpy: jest.spyOn(mockMemberRepository, 'search')
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('execute', async () => {
    mockReturnValues(scenario, {
      memberRepositorySearchSpy: Promise.resolve([testMember])
    })

    const result = await interactor.execute({})
    expect(result).toEqual({ data: [testMember] })

    expect(calledTimes(scenario))
      .toEqual({
        memberRepositorySearchSpy: 1,
      })
  })
})