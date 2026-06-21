import prisma from "@/lib/prisma";

export async function GET() {
  const artifacts = await prisma.artifact.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return Response.json(artifacts);
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

  const artifact = await prisma.artifact.create({
    data: {
      name: body.name,
			rarity: body.rarity,
			artifactSet: {
				connect: {
					id: body.artifactSetId,
				},
			},
			description: body.description,
			imageUrl: body.imageUrl,
    },
  });

  return Response.json(artifact);
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

  const artifact = await prisma.artifact.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      rarity: body.rarity,
      artifactSet: {
        connect: {
          id: body.artifactSetId,
        },
      },
      description: body.description,
      imageUrl: body.imageUrl,
    },
  });

  return Response.json(artifact);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }
  const result = await prisma.artifact.delete({
		where: {
			id,
		},
	});
  return Response.json(result);
}
