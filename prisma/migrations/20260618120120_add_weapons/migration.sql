-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "baseAttack" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);
