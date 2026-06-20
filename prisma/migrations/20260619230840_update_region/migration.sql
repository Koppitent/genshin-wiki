/*
  Warnings:

  - Added the required column `description` to the `Region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Region` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
