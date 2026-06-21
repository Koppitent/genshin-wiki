import {
  getArtifactSetsService,
  createArtifactSetService,
  updateArtifactSetService,
  deleteArtifactSetService,
} from "@/lib/artifactsets/artifactsetService";

// GET
export async function GET() {
  const artifactSets = await getArtifactSetsService();
  return Response.json(artifactSets);
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createArtifactSetService(body);
    return Response.json(result);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Unknown error" },
      { status: 400 },
    );
  }
}

// PUT
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const result = await updateArtifactSetService(body);
    return Response.json(result);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Unknown error" },
      { status: 400 },
    );
  }
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();
	if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }
	const result = await deleteArtifactSetService(id);
	return Response.json(result);
};
