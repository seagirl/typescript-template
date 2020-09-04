export interface Query { [key: string]: undefined | string | string[] | Query | Query[] }

export interface Request {
  body?: { [key: string]: unknown };
  query: Query;
  params: { [key: string]: string | string[] | undefined };
}
