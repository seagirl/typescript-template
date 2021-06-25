import { ClientError } from '../../../core'
import { calledTimes, mockReturnValues } from '../../../core/test/mock'
import { MemberFactory } from '../../../domain/factory/member.factory'
import { mockMemberRepository } from '../../../domain/repository/member.repository'
import { GetMemberInteractor } from './get-member.usecase'

const testMember = MemberFactory.createMock()

const dependency = {
  memberRepository: mockMemberRepository
}

const interactor = new GetMemberInteractor(dependency)

interface Scenario {
  memberRepositoryFindSpy: jest.SpyInstance;
}

let scenario: Scenario

describe('GetMemberInteractor', () => {
  beforeEach(() => {
    scenario = {
      memberRepositoryFindSpy: jest.spyOn(mockMemberRepository, 'find')
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('execute', async () => {
    mockReturnValues(scenario, {
      memberRepositoryFindSpy: Promise.resolve(testMember)
    })

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual(testMember)

    expect(calledTimes(scenario))
      .toEqual({
        repositoryFindSpy: 1,
      })
  })

  it('find error', async () => {
    mockReturnValues(scenario, {
      memberRepositoryFindSpy: Promise.resolve(undefined)
    })

    await expect(interactor.execute({ code: testMember.code })).rejects
      .toEqual(new ClientError('test is not found.'))

      expect(calledTimes(scenario))
      .toEqual({
        repositoryFindSpy: 1,
      })
  })
})