/*
  Warnings:

  - Added the required column `codigoDaUnidadeConsumidora` to the `Unidade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Unidade` ADD COLUMN `codigoDaUnidadeConsumidora` VARCHAR(191) NOT NULL;
