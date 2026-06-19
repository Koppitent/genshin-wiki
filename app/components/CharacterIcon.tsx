import { elementIcons } from "@/lib/elements";
import Image from "next/image";

type CharacterIconProps = {
  charachter: CharachterInfo;
};

export type CharachterInfo = {
  name: string;
  element: keyof typeof elementIcons;
  imageUrl: string;
  rarity: number;
};

export default function CharacterIcon({ charachter }: CharacterIconProps) {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <div className="relative w-[5rem] h-[5rem] hover:scale-105 transition-transform duration-200">
        <img
          src={charachter.imageUrl}
          alt={charachter.name}
          className={`w-full h-full object-cover rounded-md rarity-${charachter.rarity}`}
        />

        <Image
          src={elementIcons[charachter.element]}
          alt={charachter.element}
          width={24}
          height={24}
          className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#424C4C]"
        />
      </div>
      <p className="font-bold text-lg">{charachter.name}</p>
    </div>
  );
}
