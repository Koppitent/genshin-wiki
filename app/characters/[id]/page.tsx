import CharacterDetailClient from "@/app/components/character/CharacterDetailClient";
import { getCharacterService } from "@/lib/characters/charachterService";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CharactersDetailPage({ params }: Props) {
	const { id } = await params;
	const character = await getCharacterService(id);
  return <CharacterDetailClient character={character} />;
}
