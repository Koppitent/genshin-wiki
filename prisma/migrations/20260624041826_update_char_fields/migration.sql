/*
  Warnings:

  - Added the required column `birthday` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;
