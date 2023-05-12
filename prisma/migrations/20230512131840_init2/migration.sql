-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_email_fkey` FOREIGN KEY (`email`) REFERENCES `Utilisateur`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
