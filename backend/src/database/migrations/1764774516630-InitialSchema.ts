import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1764774516630 implements MigrationInterface {
  name = 'InitialSchema1764774516630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`units\` (\`id\` varchar(36) NOT NULL, \`codigoDaUnidadeConsumidora\` varchar(255) NOT NULL, \`historicoDeConsumoEmKWH\` json NOT NULL, \`amount\` decimal(12,2) NOT NULL, \`barcode\` varchar(255) NOT NULL, \`chargingModel\` varchar(255) NOT NULL, \`phaseModel\` varchar(255) NOT NULL, \`energyCompanyId\` varchar(255) NOT NULL, \`leadId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_153d16f2a84eb4748c5f30383c\` (\`leadId\`), UNIQUE INDEX \`IDX_fa1cdb32b4f99f21051d533317\` (\`codigoDaUnidadeConsumidora\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`leads\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`units\` ADD CONSTRAINT \`FK_153d16f2a84eb4748c5f30383c9\` FOREIGN KEY (\`leadId\`) REFERENCES \`leads\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_153d16f2a84eb4748c5f30383c9\``,
    );
    await queryRunner.query(`DROP TABLE \`leads\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fa1cdb32b4f99f21051d533317\` ON \`units\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_153d16f2a84eb4748c5f30383c\` ON \`units\``,
    );
    await queryRunner.query(`DROP TABLE \`units\``);
  }
}
