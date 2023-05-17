-- DropIndex
DROP INDEX `Categorie_nom_key` ON `categorie`;

-- CreateTable
CREATE TABLE `ArticleCategorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articleId` INTEGER NOT NULL,
    `categorieId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArticleCategorie` ADD CONSTRAINT `ArticleCategorie_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleCategorie` ADD CONSTRAINT `ArticleCategorie_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
