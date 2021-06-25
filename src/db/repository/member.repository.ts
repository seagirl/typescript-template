import { EntityManager, getManager } from 'typeorm'
import { MemberEntity } from '../../domain/entity/member.entity'
import { MemberFactory } from '../../domain/factory/member.factory'
import { MemberRepository as IMemberRepository, SearchInput } from '../../domain/repository/member.repository'

export class MemberRepository implements IMemberRepository {
  private tableName = 'member'

  private manager: EntityManager

  constructor (manager: EntityManager = getManager()) {
    this.manager = manager
  }

  async nextIdentifier (): Promise<number> {
    const row = await this.manager.createQueryBuilder()
      .select([
        'nextval(\'member_id_seq\'::regclass)::int as id'
      ])
      .from('member_id_seq', 'member_id_seq')
      .limit(1)
      .getRawOne()
    return row.id
  }

  async search (input: SearchInput = {}): Promise<MemberEntity[]> {
    const query = this.manager.createQueryBuilder()
      .select([
        'member.id as id',
        'member.code as code',
      ])
      .from(this.tableName, this.tableName)
      .orderBy('member.id')
      .limit(input.limit)
      .offset(input.offset)

    const rows = await query.getRawMany()

    return rows.map((row: any) => {
      return MemberFactory.create({
        id: row.id,
        code: row.code,
      })
    })
  }

  async find (code: string): Promise<MemberEntity | undefined> {
    const row = await this.manager.createQueryBuilder()
      .select([
        'member.id as id',
        'member.code as code',
      ])
      .from(this.tableName, this.tableName)
      .where('member.code = :code', { code: code })
      .orderBy('member.id')
      .getRawOne()

    if (!row) {
      return
    }

    return MemberFactory.create({
      id: row.id,
      code: row.code,
    })
  }

  async save (member: MemberEntity): Promise<void> {
    const repository = this.manager.getRepository(this.tableName)
    const row = await repository.findOne({ where: { code: member.code } })

    if (!row) {
      const values = {
        id: member.id,
        code: member.code
      }

      await this.manager.createQueryBuilder()
        .insert()
        .into(this.tableName, Object.keys(values))
        .values(values)
        .execute()
    } else {
      await this.manager.createQueryBuilder()
        .update(this.tableName)
        .set({
          code: member.code
        })
        .where('id = :id', { id: row.id })
        .execute()
    }
  }

  async delete (member: MemberEntity): Promise<void> {
    await this.manager.createQueryBuilder()
      .delete()
      .from(this.tableName)
      .where({ code: member.code })
      .execute()
  }
}
