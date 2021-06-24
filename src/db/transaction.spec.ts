import { DB } from '.'
// import { TokenEntity } from '../domain/entity/token.entity'
// import { TokenRepository } from './repository/token.repository'
import { Transaction } from './transaction'

const numSave = 11
const array = [...Array(numSave).keys()]

const testUserId = 0
const db = new DB()

describe('Transaction', () => {
  beforeAll(async () => {
    await db.init()

    // const tokenRepository = new TokenRepository()
    // await tokenRepository.deleteByUserId(testUserId)
  })

  afterAll(async () => {
    await db.close()

    // const tokenRepository = new TokenRepository()
    // await tokenRepository.deleteByUserId(testUserId)
  })

  // it('rollback', async () => {
  //   let transaction = new Transaction()
  //   await transaction.begin()

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   for (const i of array) {
  //     const tokenRepository = new TokenRepository(transaction.manager)
  //     await tokenRepository.save(new TokenEntity(`test token ${i}`, testUserId, testUserId))
  //   }

  //   await transaction.rollback()
  //   await transaction.close()

  //   transaction = new Transaction()
  //   await transaction.begin()

  //   const tokenRepository = new TokenRepository(transaction.manager)
  //   const count = await tokenRepository.countByUserId(testUserId)

  //   await transaction.commit()
  //   await transaction.close()

  //   expect(count).toBe(0)
  // })

  // it('commit', async () => {
  //   let transaction = new Transaction()
  //   await transaction.begin()

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   for (const i of array) {
  //     const tokenRepository = new TokenRepository(transaction.manager)
  //     await tokenRepository.save(new TokenEntity(`test token ${i}`, testUserId, testUserId))
  //   }

  //   await transaction.commit()
  //   await transaction.close()

  //   transaction = new Transaction()
  //   await transaction.begin()

  //   const tokenRepository = new TokenRepository(transaction.manager)
  //   const count = await tokenRepository.countByUserId(testUserId)

  //   await transaction.commit()
  //   await transaction.close()

  //   expect(count).toBe(numSave)
  // })

  it('create transactions more than 10', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const i of array) {
      const transaction = new Transaction()
      await transaction.begin()
      await transaction.close()
    }
  })

  // タイムアウトしてしまうので確認したい時だけコメントアウト外す
  // it('deadlock', async () => {
  //   for (const i of array) {
  //     console.log(`${i}`)
  //     const transaction = new Transaction()
  //     await transaction.begin()
  //   }
  // })
})