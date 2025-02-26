/*
  Warnings:

  - The values [MONOFASICO,BIFASICO,TRIFASICO] on the enum `Unidade_modeloFasico` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Unidade` MODIFY `modeloFasico` ENUM('monofasico', 'bifasico', 'trifasico') NOT NULL;
