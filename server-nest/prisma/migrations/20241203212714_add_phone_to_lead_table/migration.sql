/*
  Warnings:

  - Added the required column `telefone` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
INSERT INTO "new_Lead" ("email", "id", "nomeCompleto") SELECT "email", "id", "nomeCompleto" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
