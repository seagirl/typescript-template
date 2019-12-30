import { Member } from '../entity'

interface MemberFactoryInput {
  id: number;
  code: string;
}

export class MemberFactory {
  static create(input: MemberFactoryInput): Member {
    return new Member(
      input.id,
      input.code,
    )
  }

  static createMock(): Member {
    return this.create({
      id: 1,
      code: 'test'
    })
  }
}
