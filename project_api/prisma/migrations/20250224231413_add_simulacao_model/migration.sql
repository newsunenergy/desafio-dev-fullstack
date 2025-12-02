-- CreateTable
CREATE TABLE `Simulacao` (
    `id` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SimulacaoUnidade` (
    `simulacaoId` VARCHAR(191) NOT NULL,
    `unidadeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`simulacaoId`, `unidadeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Simulacao` ADD CONSTRAINT `Simulacao_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SimulacaoUnidade` ADD CONSTRAINT `SimulacaoUnidade_simulacaoId_fkey` FOREIGN KEY (`simulacaoId`) REFERENCES `Simulacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SimulacaoUnidade` ADD CONSTRAINT `SimulacaoUnidade_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
