"use client";

import { useState } from "react";
import CharacterModal from "../components/CharacterModal";
import { Star } from "lucide-react";
import CharacterActions from "./CharacterActions";
import { Character, Prisma } from "../generated/prisma/client";

type Props = {
  characters: CharacterWithWeaponType[];
};

type UIState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; character: Character };

export type CharacterWithWeaponType = Prisma.CharacterGetPayload<{
  include: {
    weaponType: true;
  };
}>;

export default function CharacterClient({ characters }: Props) {
  const [uiState, setUiState] = useState<UIState>({ open: false });

	function formatRarity(rarity: number) {
    return `rarity-${rarity}`;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold mt-5 mb-5">
        Alle Charaktere aus Genshin Impact:
      </h1>

      {characters.length === 0 ? (
        <p className="text-gray-500">Keine Charaktere gefunden.</p>
      ) : (
        <table className="w-[60vw]">
          <thead>
            <tr className="text-left bg-[var(--foreground)] text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Element</th>
              <th className="px-4 py-2">Waffe</th>
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
                <td className="px-4 py-2 flex flex-col items-center gap-2">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className={`w-[5rem] h-[5rem] object-cover rounded-md border border-gray-600 hover:scale-105 transition-transform duration-200 ${formatRarity(character.rarity)}`}
                  />
                  <p className="font-bold text-lg">{character.name}</p>
                </td>
                <td className="px-4 py-2">
                  {characterElementMap[character.element.toLowerCase()] ??
                    character.element}
                </td>
                <td className="px-4 py-2">
                  {character.weaponType.name || "Nicht verfügbar"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: character.rarity }, (_, i) => (
                      <span key={i}>
                        <Star size={16} fill="#FFD700" color="#FFD700" />
                      </span>
                    ))}
                  </div>
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
      )}

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
