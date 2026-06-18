import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const weaponsData: Prisma.WeaponCreateInput[] = [
  {
    name: "SuperWeapon",
		description: "A super powerful weapon.",
    type: "Sword",
    rarity: 5,
    baseAttack: 100,
  },
	{
		name: "BasicBow",
		description: "A basic bow for beginners.",
		type: "Bow",
		rarity: 4,
		baseAttack: 20,
	}
];

const charactersData: Prisma.CharacterCreateInput[] = [
  {
    name: "SuperCharacter",
    description: "A super powerful character.",
    element: "Pyro",
    rarity: 5,
    baseAttack: 100,
  },
  {
    name: "BasicCharacter",
    description: "A basic character for beginners.",
    element: "Hydro",
    rarity: 4,
    baseAttack: 20,
  },
];

export async function main() {
  
}

main();