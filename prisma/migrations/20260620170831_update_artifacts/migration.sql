/*
  Warnings:

  - Added the required column `rarity` to the `ArtifactSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArtifactSet" ADD COLUMN     "rarity" INTEGER NOT NULL;
