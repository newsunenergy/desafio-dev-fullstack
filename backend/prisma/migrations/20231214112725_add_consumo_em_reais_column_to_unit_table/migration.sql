/*
  Warnings:

  - A unique constraint covering the columns `[codigoDaUnidadeConsumidora]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `consumoEmReais` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Unit` ADD COLUMN `consumoEmReais` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Unit_codigoDaUnidadeConsumidora_key` ON `Unit`(`codigoDaUnidadeConsumidora`);
