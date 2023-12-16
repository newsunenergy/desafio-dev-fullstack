/*
  Warnings:

  - You are about to alter the column `codigoDaUnidadeConsumidora` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `Unit` MODIFY `codigoDaUnidadeConsumidora` VARCHAR(50) NOT NULL;
