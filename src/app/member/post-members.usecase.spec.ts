import { ClientError, MockTransaction } from '../../core'
import { MemberFactory } from '../../domain/factory/member.factory'
import { MockMemberRepository } from './member.repository'
import { PostMembersInteractor } from './post-members.usecase'

const testMember = MemberFactory.createMock()

const transaction = new MockTransaction()
const repository = new MockMemberRepository()
const interactor = new PostMembersInteractor({
  transaction: transaction,
  repository: repository,
  identifierGenerator: repository,
})

let transactionBeginSpy: jest.SpyInstance
let transactioCommitSpy: jest.SpyInstance
let transactioRollbackSpy: jest.SpyInstance
let transactionCloseSpy: jest.SpyInstance
let repositoryNextIdentifierSpy: jest.SpyInstance
let repositoryFindSpy: jest.SpyInstance
let repositorySaveSpy: jest.SpyInstance

describe('PostMembersInteractor', () => {
  beforeEach(() => {
    transactionBeginSpy = jest.spyOn(transaction, 'begin')
    transactioCommitSpy = jest.spyOn(transaction, 'commit')
    transactioRollbackSpy = jest.spyOn(transaction, 'rollback')
    transactionCloseSpy = jest.spyOn(transaction, 'close')
    repositoryNextIdentifierSpy = jest.spyOn(repository, 'nextIdentifier')
    repositoryFindSpy = jest.spyOn(repository, 'find')
    repositorySaveSpy = jest.spyOn(repository, 'save')
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('execute', async () => {
    repositoryNextIdentifierSpy.mockReturnValue(Promise.resolve(1))
    repositoryFindSpy.mockReturnValue(undefined)

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual(testMember)

    expect(transactionBeginSpy).toHaveBeenCalledTimes(1)
    expect(transactioCommitSpy).toHaveBeenCalledTimes(1)
    expect(transactioRollbackSpy).toHaveBeenCalledTimes(0)
    expect(transactionCloseSpy).toHaveBeenCalledTimes(1)
    expect(repositoryNextIdentifierSpy).toHaveBeenCalledTimes(1)
    expect(repositoryFindSpy).toHaveBeenCalledTimes(1)
    expect(repositorySaveSpy).toHaveBeenCalledTimes(1)
  })

  it('dupricate error', async () => {
    repositoryNextIdentifierSpy.mockReturnValue(1)
    repositoryFindSpy.mockReturnValue(Promise.resolve(testMember))

    await expect(interactor.execute({ code: testMember.code })).rejects
      .toThrowError(ClientError)

    expect(transactionBeginSpy).toHaveBeenCalledTimes(0)
    expect(transactioCommitSpy).toHaveBeenCalledTimes(0)
    expect(transactioRollbackSpy).toHaveBeenCalledTimes(0)
    expect(transactionCloseSpy).toHaveBeenCalledTimes(0)
    expect(repositoryNextIdentifierSpy).toHaveBeenCalledTimes(0)
    expect(repositoryFindSpy).toHaveBeenCalledTimes(1)
    expect(repositorySaveSpy).toHaveBeenCalledTimes(0)
  })

  it('save error', async () => {
    repositoryNextIdentifierSpy.mockReturnValue(Promise.resolve(1))
    repositoryFindSpy.mockReturnValue(Promise.resolve(undefined))
    repositorySaveSpy.mockRejectedValue(new Error('ERROR!!!'))

    const result = await interactor.execute({ code: testMember.code })
    expect(result).toEqual(testMember)

    expect(transactionBeginSpy).toHaveBeenCalledTimes(1)
    expect(transactioCommitSpy).toHaveBeenCalledTimes(0)
    expect(transactioRollbackSpy).toHaveBeenCalledTimes(1)
    expect(transactionCloseSpy).toHaveBeenCalledTimes(1)
    expect(repositoryNextIdentifierSpy).toHaveBeenCalledTimes(1)
    expect(repositoryFindSpy).toHaveBeenCalledTimes(1)
    expect(repositorySaveSpy).toHaveBeenCalledTimes(1)
  })
})