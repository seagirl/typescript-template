import { ClientError, MockTransaction } from '../../../core'
import { MemberFactory } from '../../../domain/factory/member.factory'
import { MockMemberRepository } from '../../../domain/repository/member.repository'
import { DeleteMemberInteractor } from './delete-member.usecase'

const testMember = MemberFactory.createMock()

const transaction = new MockTransaction()
const repository = new MockMemberRepository()
const interactor = new DeleteMemberInteractor({
  transaction: transaction,
  repository: repository
})

let transactionBeginSpy: jest.SpyInstance
let transactioCommitSpy: jest.SpyInstance
let transactioRollbackSpy: jest.SpyInstance
let transactionCloseSpy: jest.SpyInstance
let repositoryFindSpy: jest.SpyInstance
let repositoryDeleteSpy: jest.SpyInstance

describe('DeleteMemberInteractor', () => {
  beforeEach(() => {
    transactionBeginSpy = jest.spyOn(transaction, 'begin')
    transactioCommitSpy = jest.spyOn(transaction, 'commit')
    transactioRollbackSpy = jest.spyOn(transaction, 'rollback')
    transactionCloseSpy = jest.spyOn(transaction, 'close')
    repositoryFindSpy = jest.spyOn(repository, 'find')
    repositoryDeleteSpy = jest.spyOn(repository, 'delete')
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('execute', async () => {
    repositoryFindSpy.mockReturnValue(Promise.resolve(testMember))

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual({})

    expect(transactionBeginSpy).toHaveBeenCalledTimes(1)
    expect(transactioCommitSpy).toHaveBeenCalledTimes(1)
    expect(transactioRollbackSpy).toHaveBeenCalledTimes(0)
    expect(transactionCloseSpy).toHaveBeenCalledTimes(1)
    expect(repositoryFindSpy).toHaveBeenCalledTimes(1)
    expect(repositoryDeleteSpy).toHaveBeenCalledTimes(1)
  })

  it('find error', async () => {
    repositoryFindSpy.mockReturnValue(Promise.resolve(undefined))

    await expect(interactor.execute({ code: testMember.code })).rejects
      .toEqual(new ClientError('test is not found.'))

    expect(transactionBeginSpy).toHaveBeenCalledTimes(0)
    expect(transactioCommitSpy).toHaveBeenCalledTimes(0)
    expect(transactioRollbackSpy).toHaveBeenCalledTimes(0)
    expect(transactionCloseSpy).toHaveBeenCalledTimes(0)
    expect(repositoryFindSpy).toHaveBeenCalledTimes(1)
    expect(repositoryDeleteSpy).toHaveBeenCalledTimes(0)
  })

  it('delete error', async () => {
    repositoryFindSpy.mockReturnValue(Promise.resolve(testMember))
    repositoryDeleteSpy.mockRejectedValue(new Error('ERROR!!!'))

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual({})

    expect(transactionBeginSpy).toHaveBeenCalledTimes(1)
    expect(transactioCommitSpy).toHaveBeenCalledTimes(0)
    expect(transactioRollbackSpy).toHaveBeenCalledTimes(1)
    expect(transactionCloseSpy).toHaveBeenCalledTimes(1)
    expect(repositoryFindSpy).toHaveBeenCalledTimes(1)
    expect(repositoryDeleteSpy).toHaveBeenCalledTimes(1)
  })
})