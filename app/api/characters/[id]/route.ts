import { handleException } from "@/lib/api/errorHandler";
import { deleteCharacterService, getCharacterService } from "@/lib/characters/charachterService";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
	try {
		return Response.json(await deleteCharacterService(id));
	} catch (e) {
		return await handleException(e);
	}
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return Response.json(await getCharacterService(id));
}
