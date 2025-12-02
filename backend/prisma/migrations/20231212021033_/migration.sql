/*
  Warnings:

  - Added the required column `valor` to the `unidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "consumo" DROP CONSTRAINT "consumo_unidadeId_fkey";

-- DropForeignKey
ALTER TABLE "unidade" DROP CONSTRAINT "unidade_leadId_fkey";

-- AlterTable
ALTER TABLE "unidade" ADD COLUMN     "valor" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "unidade" ADD CONSTRAINT "unidade_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumo" ADD CONSTRAINT "consumo_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
