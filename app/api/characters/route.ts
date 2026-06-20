import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

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
      region: body.regionId
        ? { connect: { id: body.regionId } }
        : { disconnect: true },
      rarity: Number(body.rarity),
      baseAttack: Number(body.baseAttack),
			releaseVersion: body.releaseVersion,
    },
  });

  return Response.json(character);
}

export async function PUT(request: Request) {
  const body = await request.json();

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

  return Response.json(character);
}

export async function GET() {
  const characters = (
    await prisma.character.findMany({
			include: {
				weaponType: true,
				region: true,
			},
      orderBy: [{
				rarity: "desc",
      },
			{
				name: "asc",
			}],
    })
  );
  return Response.json(characters);
}
