-- CreateEnum
CREATE TYPE "ModeloFasico" AS ENUM ('monofasico', 'bifasico', 'trifasico');

-- CreateEnum
CREATE TYPE "Enquadramento" AS ENUM ('AX', 'B1', 'B2', 'B3');

-- CreateTable
CREATE TABLE "lead" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade" (
    "id" TEXT NOT NULL,
    "codigoDaUnidadeConsumidora" TEXT NOT NULL,
    "modeloFasico" "ModeloFasico" NOT NULL,
    "enquadramento" "Enquadramento" NOT NULL,
    "leadId" TEXT NOT NULL,

    CONSTRAINT "unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consumo" (
    "id" TEXT NOT NULL,
    "consumoForaPontaEmKWH" INTEGER NOT NULL,
    "mesDoConsumo" TIMESTAMP(3) NOT NULL,
    "unidadeId" TEXT NOT NULL,

    CONSTRAINT "consumo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lead_email_key" ON "lead"("email");

-- AddForeignKey
ALTER TABLE "unidade" ADD CONSTRAINT "unidade_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumo" ADD CONSTRAINT "consumo_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
