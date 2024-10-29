/*
  Warnings:

  - You are about to alter the column `modeloFasico` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `enquadramento` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Unit` MODIFY `modeloFasico` VARCHAR(191) NOT NULL,
    MODIFY `enquadramento` VARCHAR(191) NOT NULL;
