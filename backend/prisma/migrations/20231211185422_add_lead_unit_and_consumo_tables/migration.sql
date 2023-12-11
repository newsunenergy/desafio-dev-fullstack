-- CreateTable
CREATE TABLE `Lead` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Lead_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` VARCHAR(191) NOT NULL,
    `codigoDaUnidadeConsumidora` VARCHAR(191) NOT NULL,
    `modeloFasico` VARCHAR(191) NOT NULL,
    `enquadramento` VARCHAR(191) NOT NULL,
    `leadId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consumo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consumoForaPontaEmKWH` INTEGER NOT NULL,
    `mesDoConsumo` DATETIME(3) NOT NULL,
    `unitId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Unit` ADD CONSTRAINT `Unit_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consumo` ADD CONSTRAINT `Consumo_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
