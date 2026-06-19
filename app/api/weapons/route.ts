import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const weapon = await prisma.weapon.create({
    data: {
      name: body.name,
			description: body.description,
			weaponType: {
				connect: {
					id: body.weaponTypeId,
				},
			},
			imageUrl: body.imageUrl,
      rarity: Number(body.rarity),
      baseAttack: Number(body.baseAttack),
    },
  });

  return Response.json(weapon);
}

export async function PUT(request: Request) {
  const body = await request.json();

  const weapon = await prisma.weapon.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      description: body.description,
      weaponType: {
        connect: {
          id: body.weaponTypeId,
        },
      },
      imageUrl: body.imageUrl,
      rarity: Number(body.rarity),
      baseAttack: Number(body.baseAttack),
    },
  });

  return Response.json(weapon);
}


export async function DELETE(req: Request) {
  const body = await req.json();

  if (!body.id) {
    throw new Error("Missing character id for update");
  }

  await prisma.weapon.delete({
    where: {
      id: body.id,
    },
  });

  return Response.json({
    success: true,
  });
}

export async function GET() {
	const weapons = (
    await prisma.weapon.findMany({
			include: {
				weaponType: true,
			},
      orderBy: {
        name: "asc",
      },
    })
  );
	return Response.json(weapons);
}