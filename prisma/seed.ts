import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { readFileSync } from "fs";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const weaponTypes = [
  { id: "cmqjtl5z50001d8fw8fq0x65o", name: "Bow" },
  { id: "cmqk3n7gg0003k4fwhyrohejk", name: "Catalyst" },
  { id: "cmqk3mzj70002k4fw94ufdc7a", name: "Claymore" },
  { id: "cmqjtl5z70002d8fwtew46tf3", name: "Polearm" },
  { id: "cmqjtl5xy0000d8fwtf2owtdh", name: "Sword" },
];

const regions = [
  { id: "cmqlmwktn00079cfww2360800", name: "Fontaine" },
  { id: "cmqllswrv00029cfwzy096dzu", name: "Inazuma" },
  { id: "cmqllqbt500019cfw6wos5d1b", name: "Liyue" },
  { id: "cmqlll1pu00009cfwob5e24vy", name: "Mondstadt" },
  { id: "cmqlly69r00049cfwjeasb7ph", name: "Natlan" },
  { id: "cmqllydiu00059cfw52ms396x", name: "Nod Krai" },
  { id: "cmqllvee100039cfwo2n4bcoo", name: "Sumeru" },
];

const weaponMap = Object.fromEntries(weaponTypes.map((w) => [w.name, w.id]));
const regionMap = Object.fromEntries(regions.map((r) => [r.name, r.id]));

const raw: any[] = JSON.parse(
  readFileSync("./seed-data/characters.json", "utf-8"),
);

function safeDate(input?: string) {
  if (!input) return new Date("2000-01-01");

  if (input.startsWith("0000")) {
    return new Date("2000" + input.slice(4));
  }

  const d = new Date(input);

  if (isNaN(d.getTime())) {
    return new Date("2000-01-01");
  }

  return d;
}

export async function main() {
  for (const c of raw) {
    await prisma.character.create({
      data: {
        name: c.name,
        element: (c.vision as string).toLowerCase(),
        regionId: regionMap[c.nation],
        weaponTypeId: weaponMap[c.weapon],
        releaseVersion: c.releaseVersion,
        rarity: c.rarity,
        imageUrl: "https://sunderarmor.com/GENSHIN/Characters/1/Citlali.png",
        description: c.description,
        gender: c.gender || "Unknown",
        releaseDate: safeDate(c.release),
        birthday: safeDate(c.birthday),
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seeding complete");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
