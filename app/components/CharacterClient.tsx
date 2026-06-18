"use client";

import { useState } from "react";
import CharacterModal from "../components/CharacterModal";
import { Star } from "lucide-react";
import CharacterActions from "./CharacterActions";
import { Character } from "../generated/prisma/client";

type Props = {
  characters: Character[];
};

type UIState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; character: Character };

export default function CharacterClient({ characters }: Props) {
  const [uiState, setUiState] = useState<UIState>({ open: false });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold mt-5 mb-5">
        Alle Charaktere aus Genshin Impact:
      </h1>

      <button
        onClick={() => {
          setUiState({ open: true, mode: "create" });
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
      >
        Charakter erstellen
      </button>

      <CharacterModal
        open={uiState.open}
        mode={uiState.open ? uiState.mode : "create"}
        character={"character" in uiState ? uiState.character : undefined}
        onClose={() => setUiState({ open: false })}
      />

      <table className="w-[60vw]">
        <thead>
          <tr className="text-left bg-[var(--foreground)] text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Element</th>
            <th className="px-4 py-2">Seltenheit</th>
            <th className="px-4 py-2">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr
              key={character.id}
              className="bg-[#4C5454] hover:bg-[#424C4C] cursor-pointer"
            >
              <td className="px-4 py-2">{character.name}</td>
              <td className="px-4 py-2">
                {characterElementMap[character.element.toLowerCase()] ??
                  character.element}
              </td>
              <td className="px-4 py-2 flex items-center gap-1">
                {Array.from({ length: character.rarity }, (_, i) => (
                  <span key={i}>
                    <Star size={16} fill="#FFD700" color="#FFD700" />
                  </span>
                ))}
              </td>
              <td className="px-4 py-2">
                <CharacterActions
                  character={character}
                  onOpenEditModal={(character) => {
                    setUiState({ open: true, mode: "edit", character });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const characterElementMap: Record<string, string> = {
  pyro: "Pyro",
  hydro: "Hydro",
  anemo: "Anemo",
  electro: "Electro",
	dendro: "Dendro",
	cryo: "Cryo",
	geo: "Geo",
};
