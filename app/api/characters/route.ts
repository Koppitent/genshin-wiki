import { createCharacterService, getCharactersService, updateCharacterService } from "@/lib/characters/charachterService";

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(await createCharacterService(body));
}

export async function PUT(request: Request) {
  const body = await request.json();
	return Response.json(await updateCharacterService(body));
}

export async function GET() {
  return Response.json(await getCharactersService());
}
