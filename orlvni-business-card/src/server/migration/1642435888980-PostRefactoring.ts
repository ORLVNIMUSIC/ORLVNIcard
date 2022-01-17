import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1642435888980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "EXEC sp_rename 'dbo.USERS.USER_EMAIL', 'USER_NICKNAME', 'COLUMN';",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "EXEC sp_rename 'dbo.USERS.USER_NICKNAME', 'USER_EMAIL', 'COLUMN';",
    );
  }
}
