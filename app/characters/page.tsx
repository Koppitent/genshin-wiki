import { getCharactersService } from "@/lib/characters/charachterService";
import CharacterClient from "../components/character/CharacterClient";

export default async function CharactersPage() {
  const characters = await getCharactersService();
  return <CharacterClient characters={characters} />;
}