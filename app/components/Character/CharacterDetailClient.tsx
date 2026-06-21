"use client";

import { CharacterFull } from "@/lib/characters/charachterServiceClient";
import Icon from "../Icon";
import Badge from "../Badge";
import { elementIcons } from "@/lib/elements";
import { weaponIcons } from "@/lib/weapons";

type Props = {
  character: CharacterFull | null;
};

export default function CharacterDetailClient({ character }: Props) {
  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-3 w-[80%] mx-auto">
        <div className="flex flex-row items-center gap-4 w-full mt-[3rem] h-[9rem]">
          <div className="h-full rounded-lg overflow-hidden aspect-square items-center flex justify-center">
            <Icon
              imageUrl={character.imageUrl}
              rarity={character.rarity}
              size={7}
            />
          </div>
          <div className="text-3xl font-bold w-full rounded-lg p-4 h-full justify-center flex flex-col gap-2">
            <p>{character.name}'s Charakterseite</p>
            <div className="flex flex-row gap-5 text-lg">
              <Badge
                text={character.element}
                imageUrl={
                  elementIcons[character.element as keyof typeof elementIcons]
                }
              />
              <Badge
                text={character.weaponType.name}
                imageUrl={
                  weaponIcons[character.weaponType.name.toLowerCase() as keyof typeof weaponIcons]
                }
								brightness={150}
              />
              <Badge
                text={character.region?.name ?? "Keine Region"}
                imageUrl={
                  character.region?.imageUrl
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center border rounded-lg p-4 gap-4 w-full h-[40rem]">
          <h1>Hier stehen daten</h1>
        </div>
      </div>
    </>
  );
}
