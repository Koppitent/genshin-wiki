import { CharacterFull } from "@/lib/characters/charachterServiceClient";
import { elementIcons } from "@/lib/elements";
import Image from "next/image";

type CharacterIconProps = {
  character: CharacterFull;
};

export default function CharacterIcon({ character }: CharacterIconProps) {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <div className="relative w-[5rem] h-[5rem] hover:scale-105 transition-transform duration-200">
        <img
          src={character.imageUrl}
          alt={character.name}
          className={`w-full h-full object-cover rounded-md rarity-${character.rarity}`}
        />

        <Image
          src={elementIcons[character.element as keyof typeof elementIcons]}
          alt={character.element}
          width={24}
          height={24}
          className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#424C4C]"
        />
      </div>
      <p className="font-bold text-lg text-center mt-2">{character.name}</p>
    </div>
  );
}
