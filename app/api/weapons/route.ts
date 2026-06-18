import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const weapon = await prisma.weapon.create({
    data: {
      name: body.name,
			description: body.description,
      type: body.type,
      rarity: Number(body.rarity),
      baseAttack: Number(body.baseAttack),
    },
  });

  return Response.json(weapon);
}

export async function GET() {
	const weapons = (
    await prisma.weapon.findMany({
      orderBy: {
        name: "asc",
      },
    })
  );
	return Response.json(weapons);
}