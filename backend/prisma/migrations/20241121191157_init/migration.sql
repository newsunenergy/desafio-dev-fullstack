-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(191) NOT NULL,
    `nomeCompleto` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Lead_email_key`(`email`),
    INDEX `idx_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unidade` (
    `id` VARCHAR(191) NOT NULL,
    `codigoDaUnidadeConsumidora` VARCHAR(191) NOT NULL,
    `modeloFasico` VARCHAR(191) NOT NULL,
    `enquadramento` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Unidade_codigoDaUnidadeConsumidora_key`(`codigoDaUnidadeConsumidora`),
    INDEX `idx_codigo_unique`(`codigoDaUnidadeConsumidora`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consumo` (
    `id` VARCHAR(191) NOT NULL,
    `consumoForaPontaEmKWH` DOUBLE NOT NULL,
    `mesDoConsumo` VARCHAR(191) NOT NULL,
    `unidadeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Unidade` ADD CONSTRAINT `Unidade_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consumo` ADD CONSTRAINT `Consumo_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
