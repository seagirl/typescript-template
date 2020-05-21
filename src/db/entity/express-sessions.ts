import { Column, Entity, Index } from 'typeorm'

@Index('express_sessions_index1', ['expiredAt'], {})
@Index('express_sessions_pkey', ['id'], { unique: true })
@Entity('express_sessions', { schema: 'public' })
export class ExpressSessions {
  @Column('character varying', { primary: true, name: 'id', length: 255 })
  id!: string

  @Column('text', { name: 'json', nullable: true })
  json!: string | null

  @Column('bigint', { name: 'expired_at' })
  expiredAt!: string

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()'
  })
  createdAt!: Date
}
