import CharacterClient from "../components/CharacterClient";

async function getCharacters() {
  const res = await fetch("http://localhost:3000/api/characters", {
    cache: "no-store",
  });

  return res.json();
}

export default async function CharactersPage() {
  const characters = await getCharacters();

  return <CharacterClient characters={characters} />;
}