-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "releaseVersion" DOUBLE PRECISION NOT NULL DEFAULT 1.0;

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "releaseVersion" DOUBLE PRECISION NOT NULL DEFAULT 1.0;
