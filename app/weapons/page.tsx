import { BookMarked, BowArrow, Star, Sword, UtilityPole } from "lucide-react";
import { Weapon } from "../generated/prisma/client";
import { JSX } from "react/jsx-runtime";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getWeapons(): Promise<Weapon[]> {
  const res = await fetch(`${baseUrl}/api/weapons`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function WeaponsPage() {
  const weapons = await getWeapons();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold mt-5 mb-5">
        Alle Waffen aus Genshin Impact:
      </h1>
      <table className="w-[60vw]">
        <thead>
          <tr className="text-left bg-[var(--foreground)] text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Typ</th>
            <th className="px-4 py-2">Seltenheit</th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((weapon) => (
            <tr
              key={weapon.id}
              className="bg-[#4C5454] hover:bg-[#424C4C] cursor-pointer"
            >
              <td className="px-4 py-2">{weapon.name}</td>
              <td className="px-4 py-2">
                {weaponIconMap[weapon.type.toLowerCase()] ?? weapon.type}
              </td>
              <td className="px-4 py-2 flex items-center gap-1">
                {Array.from({ length: weapon.rarity }, (_, i) => (
                  <span key={i}>
                    <Star size={16} fill="#FFD700" color="#FFD700" />
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const weaponIconMap: Record<string, JSX.Element> = {
  bow: <BowArrow size={18} />,
  sword: <Sword size={18} />,
  polearm: <UtilityPole size={18} />,
  catalyst: <BookMarked size={18} />,
  claymore: <Sword size={18} fill="#000000" />,
};
