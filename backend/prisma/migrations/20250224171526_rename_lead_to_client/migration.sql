/*
  Warnings:

  - You are about to drop the column `leadId` on the `Unidade` table. All the data in the column will be lost.
  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `Unidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Unidade` DROP FOREIGN KEY `Unidade_leadId_fkey`;

-- DropIndex
DROP INDEX `Unidade_leadId_fkey` ON `Unidade`;

-- AlterTable
ALTER TABLE `Unidade` DROP COLUMN `leadId`,
    ADD COLUMN `clientId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Lead`;

-- CreateTable
CREATE TABLE `Client` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Unidade_clientId_fkey` ON `Unidade`(`clientId`);

-- AddForeignKey
ALTER TABLE `Unidade` ADD CONSTRAINT `Unidade_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
