/*
  Warnings:

  - You are about to drop the column `type` on the `Weapon` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weaponTypeId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Weapon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weaponTypeId` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "weaponTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "type",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "weaponTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WeaponType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WeaponType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_weaponTypeId_fkey" FOREIGN KEY ("weaponTypeId") REFERENCES "WeaponType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_weaponTypeId_fkey" FOREIGN KEY ("weaponTypeId") REFERENCES "WeaponType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
