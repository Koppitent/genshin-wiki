import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const weaponsTypeData: Prisma.WeaponTypeCreateInput[] = [
  {
    name: "Sword",
  },
  {
    name: "Bow",
  },
  {
    name: "Polearm",
  },
];

export async function main() {
  for (const weaponType of weaponsTypeData) {
    await prisma.weaponType.create({
      data: weaponType,
    });
  }
}

main();