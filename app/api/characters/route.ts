import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const character = await prisma.character.create({
    data: {
      name: body.name,
			description: body.description,
			element: body.element,
			rarity: Number(body.rarity),
			baseAttack: Number(body.baseAttack),
    },
  });

  return Response.json(character);
}

export async function GET() {
  const characters = (
    await prisma.character.findMany({
      orderBy: {
        name: "asc",
      },
    })
  );
  return Response.json(characters);
}
