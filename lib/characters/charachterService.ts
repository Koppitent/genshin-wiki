import prisma from "@/lib/prisma";

export async function createCharacterService(body: any) {
  const character = await prisma.character.create({
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
      baseAttack: Number(body.baseAttack),
      releaseVersion: body.releaseVersion,
    },
  });

  return character;
}

export async function updateCharacterService(body: any) {
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
      baseAttack: Number(body.baseAttack),
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
  await prisma.character.delete({
    where: {
      id,
    },
  });
  return Response.json({
    success: true,
  });
}
