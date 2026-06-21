import { elementIcons } from "@/lib/elements";
import Image from "next/image";

type Props = {
  name?: string;
  imageUrl: string;
  rarity?: number;
  showFullName?: boolean;
  element?: string;
	size?: number;
};

export default function Icon({
  name,
  imageUrl,
  showFullName,
  element,
  rarity,
	size,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <div className={`relative w-[${size ?? 5}rem] h-[${size ?? 5}rem] hover:scale-105 transition-transform duration-200`}>
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-full object-cover rounded-md rarity-${rarity ?? 0}`}
        />
        {element && (
          <Image
            src={elementIcons[element as keyof typeof elementIcons]}
            alt={element ?? "none"}
            width={24}
            height={24}
            className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#424C4C]"
          />
        )}
      </div>
      {name && (
        <p className="font-bold text-lg text-center mt-2">
          {showFullName
            ? name
            : name.length > 10
              ? name.slice(0, 7) + "..."
              : name}
        </p>
      )}
    </div>
  );
}
