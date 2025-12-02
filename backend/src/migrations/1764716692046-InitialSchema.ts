import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1764716692046 implements MigrationInterface {
  name = 'InitialSchema1764716692046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`consumptions\` (\`id\` varchar(36) NOT NULL, \`off_peak_consumption_kwh\` double NOT NULL, \`consumption_month\` datetime NOT NULL, \`unit_id\` varchar(191) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`unitId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`units\` (\`id\` varchar(36) NOT NULL, \`consumer_unit_code\` varchar(191) NOT NULL, \`phase_model\` varchar(191) NOT NULL, \`framework\` varchar(191) NOT NULL, \`lead_id\` varchar(191) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`leadId\` varchar(36) NULL, UNIQUE INDEX \`IDX_be9e1291b432f551026757fb07\` (\`consumer_unit_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`leads\` (\`id\` varchar(36) NOT NULL, \`full_name\` varchar(191) NOT NULL, \`email\` varchar(191) NOT NULL, \`phone\` varchar(191) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b3eea7add0e16594dba102716c\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`consumptions\` ADD CONSTRAINT \`FK_f1dc9f59582bcee554b24db5cac\` FOREIGN KEY (\`unitId\`) REFERENCES \`units\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`consumptions\` ADD CONSTRAINT \`FK_6f836f142f97741f16c2bffb2bf\` FOREIGN KEY (\`unit_id\`) REFERENCES \`units\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`units\` ADD CONSTRAINT \`FK_153d16f2a84eb4748c5f30383c9\` FOREIGN KEY (\`leadId\`) REFERENCES \`leads\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`units\` ADD CONSTRAINT \`FK_bd416eb354ba994924422e8b999\` FOREIGN KEY (\`lead_id\`) REFERENCES \`leads\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_bd416eb354ba994924422e8b999\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_153d16f2a84eb4748c5f30383c9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`consumptions\` DROP FOREIGN KEY \`FK_6f836f142f97741f16c2bffb2bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`consumptions\` DROP FOREIGN KEY \`FK_f1dc9f59582bcee554b24db5cac\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b3eea7add0e16594dba102716c\` ON \`leads\``,
    );
    await queryRunner.query(`DROP TABLE \`leads\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_be9e1291b432f551026757fb07\` ON \`units\``,
    );
    await queryRunner.query(`DROP TABLE \`units\``);
    await queryRunner.query(`DROP TABLE \`consumptions\``);
  }
}
