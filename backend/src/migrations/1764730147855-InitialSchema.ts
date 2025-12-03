import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1764730147855 implements MigrationInterface {
  name = 'InitialSchema1764730147855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`leads\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`amount\` decimal(12,2) NULL, \`barcode\` varchar(255) NULL, \`chargingModel\` varchar(255) NULL, \`phaseModel\` varchar(255) NULL, \`unitKey\` varchar(255) NULL, \`energyCompanyId\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`leads\``);
  }
}
