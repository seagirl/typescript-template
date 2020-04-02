import { IdentifierGenerator } from '../../core'
import { MemberEntity } from '../../domain/entity'

export interface SearchInput {
  limit?: number;
  offset?: number;
}

export interface MemberRepository extends IdentifierGenerator<number> {
  search(input?: SearchInput): Promise<MemberEntity[]>;
  find(code: string): Promise<MemberEntity | undefined>;
  save(member: MemberEntity): Promise<void>;
  delete(member: MemberEntity): Promise<void>;
}

export class MockMemberRepository implements MemberRepository {
  nextIdentifier (): Promise<number> { return Promise.resolve(0) }
  search (): Promise<MemberEntity[]> { return Promise.resolve([]) }
  find (): Promise<MemberEntity | undefined> { return Promise.resolve(undefined) }
  save (): Promise<void> { return Promise.resolve() }
  delete (): Promise<void> { return Promise.resolve() }
}