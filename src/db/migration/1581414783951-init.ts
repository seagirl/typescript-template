import {MigrationInterface, QueryRunner} from 'typeorm'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class init1581414783951 implements MigrationInterface {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS express_sessions (
            id VARCHAR(255) NOT NULL PRIMARY KEY,
            json TEXT,
            expired_at BIGINT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT now()
        );
        CREATE INDEX express_sessions_index1 ON express_sessions(expired_at);
    `, undefined)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS express_sessions;
    `, undefined)
  }

}
