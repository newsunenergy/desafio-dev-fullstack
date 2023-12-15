/*
  Warnings:

  - Added the required column `consumoEmReais` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Unit` ADD COLUMN `consumoEmReais` INTEGER NOT NULL;
