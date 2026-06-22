import { withErrorHandler } from "@/lib/api/errorHandler";
import {
  getArtifactSetsService,
  createArtifactSetService,
  updateArtifactSetService,
  deleteArtifactSetService,
} from "@/lib/artifactsets/artifactsetService";

// GET
export const GET = withErrorHandler(async function GET(req: Request) {
  return Response.json(await getArtifactSetsService());
});

// POST
export const POST = withErrorHandler(async function POST(req: Request) {
  const body = await req.json();
  return Response.json(await createArtifactSetService(body));
});

// PUT
export const PUT = withErrorHandler(async function PUT(req: Request) {
  const body = await req.json();
  return Response.json(await updateArtifactSetService(body));
});

// DELETE
export const DELETE = withErrorHandler(async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }
  return Response.json(await deleteArtifactSetService(id));
});