/*
  Warnings:

  - Changed the type of `consumptionMonth` on the `Consumption` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Consumption` DROP COLUMN `consumptionMonth`,
    ADD COLUMN `consumptionMonth` DATETIME(3) NOT NULL;
