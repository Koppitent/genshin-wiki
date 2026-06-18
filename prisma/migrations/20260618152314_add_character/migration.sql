-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "element" TEXT NOT NULL,
    "baseAttack" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
