/*
  Warnings:

  - Added the required column `consumoEmReais` to the `Unidade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Unidade` ADD COLUMN `consumoEmReais` DOUBLE NOT NULL;
