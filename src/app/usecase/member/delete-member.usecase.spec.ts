import { ClientError, mockTransaction } from '../../../core'
import { calledTimes, mockRejectedValues, mockReturnValues } from '../../../core/test/mock'
import { MemberFactory } from '../../../domain/factory/member.factory'
import { mockMemberRepository } from '../../../domain/repository/member.repository'
import { DeleteMemberInteractor } from './delete-member.usecase'

const testMember = MemberFactory.createMock()

const dependency = {
  transaction: mockTransaction,
  memberRepository: mockMemberRepository
}

const interactor = new DeleteMemberInteractor(dependency)

interface Scenario {
  transactionBeginSpy: jest.SpyInstance;
  transactioCommitSpy: jest.SpyInstance;
  transactioRollbackSpy: jest.SpyInstance;
  transactionCloseSpy: jest.SpyInstance;
  memberRepositoryFindSpy: jest.SpyInstance;
  memberRepositoryDeleteSpy: jest.SpyInstance;
}

let scenario: Scenario

describe('DeleteMemberInteractor', () => {
  beforeEach(() => {
    scenario = {
      transactionBeginSpy: jest.spyOn(mockTransaction, 'begin'),
      transactioCommitSpy: jest.spyOn(mockTransaction, 'commit'),
      transactioRollbackSpy: jest.spyOn(mockTransaction, 'rollback'),
      transactionCloseSpy: jest.spyOn(mockTransaction, 'close'),
      memberRepositoryFindSpy: jest.spyOn(mockMemberRepository, 'find'),
      memberRepositoryDeleteSpy: jest.spyOn(mockMemberRepository, 'delete'),
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
    expect(result).toEqual({})

    expect(calledTimes(scenario))
      .toEqual({
        transactionBeginSpy: 1,
        transactioCommitSpy: 1,
        transactioRollbackSpy: 0,
        transactionCloseSpy: 1,
        memberRepositoryFindSpy: 1,
        memberRepositoryDeleteSpy: 1,
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
        transactionBeginSpy: 0,
        transactioCommitSpy: 0,
        transactioRollbackSpy: 0,
        transactionCloseSpy: 0,
        memberRepositoryFindSpy: 1,
        memberRepositoryDeleteSpy: 0,
      })
  })

  it('delete error', async () => {
    mockReturnValues(scenario, {
      memberRepositoryFindSpy: Promise.resolve(testMember)
    })

    mockRejectedValues(scenario, {
      memberRepositoryDeleteSpy: Promise.resolve(new Error('ERROR!!!'))
    })

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual({})

    expect(calledTimes(scenario))
      .toEqual({
        transactionBeginSpy: 1,
        transactioCommitSpy: 0,
        transactioRollbackSpy: 1,
        transactionCloseSpy: 1,
        memberRepositoryFindSpy: 1,
        memberRepositoryDeleteSpy: 1,
      })
  })
})