import prisma from "@/lib/prisma";

const SECRET_SEED = process.env.DAILY_SECRET!;

export async function getDailyCharacter() {
  const characters = await prisma.character.findMany();

  if (!characters.length) {
    throw new Error("No characters found");
  }

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Europe/Berlin",
  });

  let input = today + SECRET_SEED;

  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }

  return characters[hash % characters.length];
}