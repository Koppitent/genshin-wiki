import { deleteArtifactSetService } from "@/lib/artifactsets/artifactsetService";

// DELETE
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const result = await deleteArtifactSetService(id);
  return Response.json(result);
}