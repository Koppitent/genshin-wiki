"use client";

import { elementIcons } from "@/lib/elements";
import { CharacterWithWeaponType } from "./CharacterClient";
import CharacterIcon from "./CharacterIcon";

type Props = {
  characters: CharacterWithWeaponType[];
};

export default function CharacterListIcons({ characters }: Props) {
  return (
    <div className="grid grid-cols-10 gap-4 p-4 bg-[#4C5454]">
      {characters.map((character) => (
        <CharacterIcon
					key={character.id}
          charachter={{
            name: character.name,
            element: character.element as keyof typeof elementIcons,
            imageUrl: character.imageUrl,
            rarity: character.rarity,
          }}
        />
      ))}
    </div>
  );
}
