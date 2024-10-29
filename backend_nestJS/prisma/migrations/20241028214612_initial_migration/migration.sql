-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(36) NOT NULL,
    `nomeCompleto` VARCHAR(1024) NOT NULL,
    `email` VARCHAR(1024) NOT NULL,
    `telefone` VARCHAR(1024) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Lead_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` VARCHAR(36) NOT NULL,
    `leadId` VARCHAR(36) NULL,
    `codigoDaUnidadeConsumidora` VARCHAR(1024) NOT NULL,
    `modeloFasico` ENUM('monofasico', 'bifasico', 'trifasico') NOT NULL,
    `enquadramento` ENUM('AX', 'B1', 'B2', 'B3') NOT NULL,
    `consumoEmReais` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Unit_codigoDaUnidadeConsumidora_key`(`codigoDaUnidadeConsumidora`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consumo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consumoForaPontaEmKWH` DOUBLE NOT NULL,
    `mesDoConsumo` DATETIME(3) NOT NULL,
    `unitId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Unit` ADD CONSTRAINT `Unit_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consumo` ADD CONSTRAINT `Consumo_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
