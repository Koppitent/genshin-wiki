import { getCharactersService } from "@/lib/characters/charachterService";
import CharacterClient from "../components/character/CharacterClient";

export default async function CharactersPage() {
	// const session = await auth();
	// if (!hasRole(session, "user")) {
  //   return (
  //     <div className="flex flex-col items-center justify-center gap-4 h-[80vh]">
  //       <h1 className="text-6xl font-bold">Zugriff verweigert</h1>
  //       <h2 className="text-2xl">
  //         Du benötigst die Rolle "user", um diese Seite zu sehen.
  //       </h2>
  //     </div>
  //   );
  // }

	const characters = await getCharactersService();
  return <CharacterClient characters={characters} />;
}