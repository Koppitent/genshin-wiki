"use client";

import Image from "next/image";
import CharacterActions from "./CharacterActions";
import { elementIcons } from "@/lib/elements";
import CharacterIcon from "./CharacterIcon";
import { CharacterWithWeaponType } from "./CharacterClient";
import { weaponIcons } from "@/lib/weapons";
import { Star } from "lucide-react";
import { useState } from "react";
import { Character } from "../../generated/prisma/client";

type Props = {
	characters: CharacterWithWeaponType[];
	onOpenEditModal: (character: Character) => void,
};

export default function CharacterListTable({ characters, onOpenEditModal }: Props) {

  return (
    <div>
      <table className="w-full">
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
              className="bg-[#4C5454] hover:bg-[#424C4C] cursor-pointer border-t-2 border-[#5A6363]"
            >
              <td className="px-4 py-2 flex flex-col items-center gap-2">
                <CharacterIcon
                  charachter={{
                    name: character.name,
                    element: character.element as keyof typeof elementIcons,
                    imageUrl: character.imageUrl,
                    rarity: character.rarity,
                  }}
                />
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      elementIcons[
                        character.element as keyof typeof elementIcons
                      ]
                    }
                    alt={character.element}
                    width={35}
                    height={35}
                  />
                    {character.element.toUpperCase().substring(0, 1) + character.element.substring(1) || "Nicht verfügbar"}
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      weaponIcons[
                        character.weaponType.name.toLowerCase() as keyof typeof weaponIcons
                      ]
                    }
                    alt={character.weaponType.name}
                    width={35}
                    height={35}
                    className="brightness-200"
                  />
                  {character.weaponType.name || "Nicht verfügbar"}
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: character.rarity }, (_, i) => (
                    <span key={i}>
                      <Star size={20} fill="#FFD700" color="#FFD700" />
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-2">
                <CharacterActions
                  character={character}
                  onOpenEditModal={(character) => {
										onOpenEditModal(character);
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
