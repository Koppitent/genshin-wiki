import { PrismaClient } from "../../app/generated/prisma/client";
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
  readFileSync("./seed-data/character_data.json", "utf-8"),
);

function safeBirthday(mmdd?: string): Date {
  if (!mmdd) {
    return new Date(Date.UTC(2000, 0, 1));
  }

  const [month, day] = mmdd.split("/").map(Number);

  if (
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return new Date(Date.UTC(2000, 0, 1));
  }

  return new Date(Date.UTC(2000, month - 1, day));
}

export async function main() {
  for (const c of raw) {
    await prisma.character.upsert({
      where: {
        name: c.data.name,
      },
      update: {
        releaseVersion: parseFloat(c.data.version),
      },
      create: {
        name: c.data.name,
        element: (c.data.elementText as string).toLowerCase(),
        regionId: regionMap[c.data.region],
        weaponTypeId: weaponMap[c.data.weaponText],
        releaseVersion: parseFloat(c.data.version),
        rarity: c.data.rarity,
        imageUrl:
          "https://i.pinimg.com/736x/6c/c7/44/6cc7444ea5e7628b57486c5e5d7d8040.jpg",
        description: c.data.description,
        gender: c.data.gender || "Unknown",
        releaseDate: new Date(),
        birthday: safeBirthday(c.data.birthdaymmdd),
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
