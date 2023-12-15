/*
  Warnings:

  - You are about to alter the column `consumoForaPontaEmKWH` on the `consumo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `consumo` MODIFY `consumoForaPontaEmKWH` INTEGER NOT NULL;
