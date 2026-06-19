import CharacterClient from "../components/Character/CharacterClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getCharacters() {
  const res = await fetch(`${baseUrl}/api/characters`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function CharactersPage() {
  const characters = await getCharacters();

  return <CharacterClient characters={characters} />;
}