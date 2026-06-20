import prisma from "@/lib/prisma";

export async function GET() {
  const regions = await prisma.region.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return Response.json(regions);
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

  const region = await prisma.region.create({
    data: {
      name: body.name,
			imageUrl: body.imageUrl,
			description: body.description,
    },
  });

  return Response.json(region);
}

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body.name || !body.imageUrl) {
    return Response.json(
      {
        error: "Name and image URL are required",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.id) {
    throw new Error("Missing region id for update");
  }

  const region = await prisma.region.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      description: body.description,
      imageUrl: body.imageUrl,
    },
  });

  return Response.json(region);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (!body.id) {
    throw new Error("Missing region id for update");
  }

  await prisma.region.delete({
    where: {
      id: body.id,
    },
  });

  return Response.json({
    success: true,
  });
}
