import { ISession } from 'connect-typeorm'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('express_sessions')
export class Session implements ISession {
  @PrimaryColumn('varchar', { length: 255 })
  public id = ''

  @Column('text')
  public json = ''

  @Index()
  @Column('bigint', { name: 'expired_at' })
  public expiredAt = Date.now()

  @Column('timestamp', { name: 'created_at' })
  public createdAt = Date.now()
}