/*
  Warnings:

  - The primary key for the `lead` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `lead` table. All the data in the column will be lost.
  - The required column `id` was added to the `Lead` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `unidade` DROP FOREIGN KEY `Unidade_leadId_fkey`;

-- AlterTable
ALTER TABLE `lead` DROP PRIMARY KEY,
    DROP COLUMN `_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Unidade` ADD CONSTRAINT `Unidade_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
