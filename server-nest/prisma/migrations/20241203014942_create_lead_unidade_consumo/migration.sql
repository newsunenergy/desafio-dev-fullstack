-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigoDaUnidadeConsumidora" TEXT NOT NULL,
    "modeloFasico" TEXT NOT NULL,
    "enquadramento" TEXT NOT NULL,
    "leadId" TEXT,
    CONSTRAINT "Unidade_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Consumo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "consumoForaPontaEmKWH" REAL NOT NULL,
    "mesDoConsumo" DATETIME NOT NULL,
    "unidadeId" TEXT,
    CONSTRAINT "Consumo_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Unidade_codigoDaUnidadeConsumidora_key" ON "Unidade"("codigoDaUnidadeConsumidora");
