import { withErrorHandler } from "@/lib/api/errorHandler";
import { createCharacterService, getCharactersService, updateCharacterService } from "@/lib/characters/charachterService";

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json();
	return Response.json(await createCharacterService(body));
});

export const PUT = withErrorHandler(async (request: Request) => {
  const body = await request.json();
	return Response.json(await updateCharacterService(body));
});

export async function GET() {
  return Response.json(await getCharactersService());
}
