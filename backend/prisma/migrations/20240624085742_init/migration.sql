/*
  Warnings:

  - Made the column `profilePicture` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banner` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Comment_postId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_videoId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Playlist_creatorId_fkey` ON `playlist`;

-- DropIndex
DROP INDEX `PlaylistVideo_playlistId_fkey` ON `playlistvideo`;

-- DropIndex
DROP INDEX `PlaylistVideo_videoId_fkey` ON `playlistvideo`;

-- DropIndex
DROP INDEX `Post_creatorId_fkey` ON `post`;

-- DropIndex
DROP INDEX `Video_creatorId_fkey` ON `video`;

-- AlterTable
ALTER TABLE `user` MODIFY `profilePicture` VARCHAR(191) NOT NULL DEFAULT 'users/0/profilePicture.jpg',
    MODIFY `banner` VARCHAR(191) NOT NULL DEFAULT 'users/0/banner.jpg';

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playlist` ADD CONSTRAINT `Playlist_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistVideo` ADD CONSTRAINT `PlaylistVideo_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistVideo` ADD CONSTRAINT `PlaylistVideo_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LikedVideos` ADD CONSTRAINT `_LikedVideos_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LikedVideos` ADD CONSTRAINT `_LikedVideos_B_fkey` FOREIGN KEY (`B`) REFERENCES `Video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
