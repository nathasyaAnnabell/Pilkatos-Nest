-- CreateTable
CREATE TABLE `User` (
    `NIS` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profilePic` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `refresh_token` TEXT NULL,

    PRIMARY KEY (`NIS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidate` (
    `id` VARCHAR(191) NOT NULL,
    `banner` VARCHAR(191) NULL,
    `tahun` VARCHAR(191) NOT NULL,
    `visi` VARCHAR(191) NOT NULL,
    `misi` VARCHAR(191) NOT NULL,
    `program` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `ketuaId` VARCHAR(191) NOT NULL,
    `wakilId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ketua` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Ketua_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wakil` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Wakil_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_ketuaId_fkey` FOREIGN KEY (`ketuaId`) REFERENCES `Ketua`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_wakilId_fkey` FOREIGN KEY (`wakilId`) REFERENCES `Wakil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ketua` ADD CONSTRAINT `Ketua_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`NIS`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wakil` ADD CONSTRAINT `Wakil_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`NIS`) ON DELETE RESTRICT ON UPDATE CASCADE;
