import { EntityManager, getManager, QueryRunner } from 'typeorm'
import { Transaction as ITransaction } from '../core'

export class Transaction implements ITransaction {
  private manager: EntityManager
  private queryRunner: QueryRunner

  constructor () {
    this.manager = getManager()
    this.queryRunner = this.manager.queryRunner || this.manager.connection.createQueryRunner()
  }

  async begin (): Promise<void> {
    await this.queryRunner.startTransaction()
  }

  async commit (): Promise<void> {
    await this.queryRunner.commitTransaction()
  }

  async rollback (): Promise<void> {
    await this.queryRunner.rollbackTransaction()
  }

  async close (): Promise<void> {
    await this.queryRunner.release()
  }
}
