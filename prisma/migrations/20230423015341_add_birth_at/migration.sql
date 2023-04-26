-- CreateTable
CREATE TABLE `users` (
    `id_usr` INTEGER NOT NULL AUTO_INCREMENT,
    `name_usr` VARCHAR(200) NOT NULL,
    `email_usr` VARCHAR(200) NOT NULL,
    `password_usr` VARCHAR(200) NOT NULL,
    `birthAt_usr` DATE NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id_usr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
