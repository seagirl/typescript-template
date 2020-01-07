import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('member', { schema: 'public' })
@Index('member_code_key', ['code'], { unique: true })
export class Member {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id!: number;

  @Column('text', {
    nullable: false,
    unique: true,
    name: 'code'
  })
  code!: string;
}
