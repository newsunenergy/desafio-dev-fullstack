/*
  Warnings:

  - You are about to drop the column `unidadeId` on the `consumo` table. All the data in the column will be lost.
  - The primary key for the `unidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `unidade` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `consumo` DROP FOREIGN KEY `Consumo_unidadeId_fkey`;

-- DropForeignKey
ALTER TABLE `lead` DROP FOREIGN KEY `Lead_email_fkey`;

-- DropForeignKey
ALTER TABLE `unidade` DROP FOREIGN KEY `Unidade_leadId_fkey`;

-- AlterTable
ALTER TABLE `consumo` DROP COLUMN `unidadeId`,
    ADD COLUMN `unidadeCodigo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `lead` MODIFY `telefone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `unidade` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `leadId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `user`;

-- AddForeignKey
ALTER TABLE `Unidade` ADD CONSTRAINT `Unidade_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consumo` ADD CONSTRAINT `Consumo_unidadeCodigo_fkey` FOREIGN KEY (`unidadeCodigo`) REFERENCES `Unidade`(`codigoDaUnidadeConsumidora`) ON DELETE SET NULL ON UPDATE CASCADE;
