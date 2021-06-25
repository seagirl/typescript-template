import { ClientError, mockTransaction } from '../../../core'
import { calledTimes, mockRejectedValues, mockReturnValues } from '../../../core/test/mock'
import { MemberFactory } from '../../../domain/factory/member.factory'
import { mockMemberRepository } from '../../../domain/repository/member.repository'
import { PostMembersInteractor } from './post-members.usecase'

const testMember = MemberFactory.createMock()

const dependency = {
  transaction: mockTransaction,
  memberRepository: mockMemberRepository,
  memberIdentifierGenerator: mockMemberRepository,
}

const interactor = new PostMembersInteractor(dependency)

interface Scenario {
  transactionBeginSpy: jest.SpyInstance;
  transactioCommitSpy: jest.SpyInstance;
  transactioRollbackSpy: jest.SpyInstance;
  transactionCloseSpy: jest.SpyInstance;
  memberRepositoryNextIdentifierSpy: jest.SpyInstance;
  memberRepositoryFindSpy: jest.SpyInstance;
  memberRepositorySaveSpy: jest.SpyInstance;
}

let scenario: Scenario

describe('PostMembersInteractor', () => {
  beforeEach(() => {
    scenario = {
      transactionBeginSpy: jest.spyOn(mockTransaction, 'begin'),
      transactioCommitSpy: jest.spyOn(mockTransaction, 'commit'),
      transactioRollbackSpy: jest.spyOn(mockTransaction, 'rollback'),
      transactionCloseSpy: jest.spyOn(mockTransaction, 'close'),
      memberRepositoryNextIdentifierSpy: jest.spyOn(mockMemberRepository, 'nextIdentifier'),
      memberRepositoryFindSpy: jest.spyOn(mockMemberRepository, 'find'),
      memberRepositorySaveSpy: jest.spyOn(mockMemberRepository, 'save'),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('execute', async () => {
    mockReturnValues(scenario, {
      memberRepositoryNextIdentifierSpy: Promise.resolve(1),
      memberRepositoryFindSpy: Promise.resolve(undefined)
    })

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual(testMember)

    expect(calledTimes(scenario))
      .toEqual({
        transactionBeginSpy: 1,
        transactioCommitSpy: 1,
        transactioRollbackSpy: 0,
        transactionCloseSpy: 1,
        repositoryNextIdentifierSpy: 1,
        memberRepositoryFindSpy: 1,
        memberRepositorySaveSpy: 1,
      })
  })

  it('dupricate error', async () => {
    mockReturnValues(scenario, {
      memberRepositoryNextIdentifierSpy: Promise.resolve(1),
      memberRepositoryFindSpy: Promise.resolve(testMember)
    })

    await expect(interactor.execute({ code: testMember.code })).rejects
      .toThrowError(ClientError)

    expect(calledTimes(scenario))
      .toEqual({
        transactionBeginSpy: 0,
        transactioCommitSpy: 0,
        transactioRollbackSpy: 0,
        transactionCloseSpy: 0,
        repositoryNextIdentifierSpy: 0,
        memberRepositoryFindSpy: 1,
        memberRepositorySaveSpy: 0,
      })
  })

  it('save error', async () => {
    mockReturnValues(scenario, {
      memberRepositoryNextIdentifierSpy: Promise.resolve(1),
      memberRepositoryFindSpy: Promise.resolve(undefined)
    })

    mockRejectedValues(scenario, {
      memberRepositorySaveSpy: new Error('ERROR!!!')
    })

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual(testMember)

    expect(calledTimes(scenario))
      .toEqual({
        transactionBeginSpy: 1,
        transactioCommitSpy: 0,
        transactioRollbackSpy: 1,
        transactionCloseSpy: 1,
        repositoryNextIdentifierSpy: 1,
        memberRepositoryFindSpy: 1,
        memberRepositorySaveSpy: 1,
      })
  })
})