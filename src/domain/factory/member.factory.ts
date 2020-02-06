import { MemberEntity } from '../entity'

interface MemberFactoryInput {
  id: number;
  code: string;
}

export class MemberFactory {
  static create (input: MemberFactoryInput): MemberEntity {
    return new MemberEntity(
      input.id,
      input.code,
    )
  }

  static createMock (): MemberEntity {
    return this.create({
      id: 1,
      code: 'test'
    })
  }
}
