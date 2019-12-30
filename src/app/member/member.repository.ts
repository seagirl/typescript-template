import { IdentifierGenerator } from '../../core'
import { Member } from '../../domain/entity'

export interface SearchInput {
  limit?: number;
  offset?: number;
}

export interface MemberRepository extends IdentifierGenerator {
  search(input?: SearchInput): Promise<Member[]>;
  find(code: string): Promise<Member | undefined>;
  save(member: Member): Promise<void>;
  delete(member: Member): Promise<void>;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export class MockMemberRepository implements MemberRepository {
  nextIdentifier(): Promise<number> { return Promise.resolve(0) }
  search(input: SearchInput = {}): Promise<Member[]> { return Promise.resolve([]) }
  find(code: string): Promise<Member | undefined> { return Promise.resolve(undefined) }
  save(member: Member): Promise<void> { return Promise.resolve() }
  delete(member: Member): Promise<void> { return Promise.resolve() }
}