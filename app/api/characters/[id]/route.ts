import { deleteCharacterService } from "@/lib/characters/charachterService";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return deleteCharacterService(id);
}
