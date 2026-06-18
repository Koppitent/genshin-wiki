import prisma from "@/lib/prisma";

export async function GET() {
  const weaponTypes = await prisma.weaponType.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return Response.json(weaponTypes);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name) {
    return Response.json(
      {
        error: "Name is required",
      },
      {
        status: 400,
      },
    );
  }

  const weaponType = await prisma.weaponType.create({
    data: {
      name: body.name,
    },
  });

  return Response.json(weaponType);
}

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body.name) {
    return Response.json(
      {
        error: "Name is required",
      },
      {
        status: 400,
      },
    );
  }

	if (!body.id) {
    throw new Error("Missing character id for update");
  }

  const weaponType = await prisma.weaponType.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
    },
  });

  return Response.json(weaponType);
}

export async function DELETE(req: Request) {
	const body = await req.json();

	if (!body.id) {
    throw new Error("Missing character id for update");
  }

	await prisma.weaponType.delete({
		where: {
			id: body.id,
		},
	});

	return Response.json({
    success: true,
  });
}