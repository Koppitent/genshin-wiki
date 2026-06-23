/*
  Warnings:

  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TierListVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED', 'OFFICIAL');

-- DropForeignKey
ALTER TABLE "_RoleToUser" DROP CONSTRAINT "_RoleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToUser" DROP CONSTRAINT "_RoleToUser_B_fkey";

-- DropTable
DROP TABLE "_RoleToUser";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TierList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "visibility" "TierListVisibility" NOT NULL DEFAULT 'PRIVATE',
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TierList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TierListEntry" (
    "id" TEXT NOT NULL,
    "tierListId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "TierListEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToUserProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoleToUserProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE INDEX "TierListEntry_tierListId_tier_idx" ON "TierListEntry"("tierListId", "tier");

-- CreateIndex
CREATE UNIQUE INDEX "TierListEntry_tierListId_characterId_key" ON "TierListEntry"("tierListId", "characterId");

-- CreateIndex
CREATE INDEX "_RoleToUserProfile_B_index" ON "_RoleToUserProfile"("B");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TierList" ADD CONSTRAINT "TierList_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TierListEntry" ADD CONSTRAINT "TierListEntry_tierListId_fkey" FOREIGN KEY ("tierListId") REFERENCES "TierList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TierListEntry" ADD CONSTRAINT "TierListEntry_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUserProfile" ADD CONSTRAINT "_RoleToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUserProfile" ADD CONSTRAINT "_RoleToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
