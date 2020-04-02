import { EntityManager, getManager } from 'typeorm'
import { MemberRepository as IMemberRepository, SearchInput } from '../../app/repository/member.repository'
import { MemberEntity } from '../../domain/entity'
import { MemberFactory } from '../../domain/factory/member.factory'
import { Member } from '../entity'

export class MemberRepository implements IMemberRepository {
  private manager: EntityManager = getManager()

  async nextIdentifier (): Promise<number> {
    const row = await getManager().createQueryBuilder()
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
      .from(Member, 'member')
      .orderBy('member.id')
      .limit(input.limit)
      .offset(input.offset)

    const rows = await query.getRawMany()

    return rows.map(row => {
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
      .from(Member, 'member')
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
    const repository = this.manager.getRepository(Member)
    const row = await repository.findOne({ where: { code: member.code } })

    if (!row) {
      const values = {
        id: member.id,
        code: member.code
      }

      await this.manager.createQueryBuilder()
        .insert()
        .into(Member, Object.keys(values))
        .values(values)
        .execute()
    } else {
      await this.manager.createQueryBuilder()
        .update(Member)
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
      .from(Member)
      .where({ code: member.code })
      .execute()
  }
}
