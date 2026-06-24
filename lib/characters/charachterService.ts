import prisma from "@/lib/prisma";
import { requireAdmin, requireRole } from "../auth/authService";

export async function createCharacterService(body: any) {
	await requireAdmin();
  return await prisma.character.create({
    data: {
      name: body.name,
      description: body.description,
      element: body.element,
      imageUrl: body.imageUrl,
      weaponType: {
        connect: {
          id: body.weaponTypeId,
        },
      },
      region: body.regionId ? { connect: { id: body.regionId } } : undefined,
      rarity: Number(body.rarity),
      releaseVersion: body.releaseVersion,
      releaseDate: body.releaseDate,
      birthday: body.birthday,
			gender: body.gender,
    },
  });
}

export async function updateCharacterService(body: any) {
	await requireAdmin();
  if (!body.id) {
    throw new Error("Missing character id for update");
  }

  const character = await prisma.character.update({
    where: { id: body.id },
    data: {
      name: body.name,
      description: body.description,
      element: body.element,
      rarity: Number(body.rarity),
      releaseDate: body.releaseDate,
      birthday: body.birthday,
      gender: body.gender,
      imageUrl: body.imageUrl,
      weaponType: {
        connect: {
          id: body.weaponTypeId,
        },
      },
      region: body.regionId
        ? { connect: { id: body.regionId } }
        : { disconnect: true },
      releaseVersion: body.releaseVersion,
    },
  });

  return character;
}

export async function getCharactersService() {
  const characters = await prisma.character.findMany({
    include: {
      weaponType: true,
      region: true,
    },
    orderBy: [
      {
        rarity: "desc",
      },
      {
        name: "asc",
      },
    ],
  });
  return characters;
}

export async function getCharacterService(id: string) {
  const character = await prisma.character.findUnique({
    where: { id },
    include: {
      weaponType: true,
      region: true,
    },
  });
  return character;
}

export async function deleteCharacterService(id: string) {
	await requireRole("asdasdsad")
  await prisma.character.delete({
    where: {
      id,
    },
  });
  return {
    success: true,
  };
}
