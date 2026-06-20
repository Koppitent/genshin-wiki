"use client";

import Image from "next/image";
import { weaponIcons } from "@/lib/weapons";
import { Star } from "lucide-react";
import { WeaponWithWeaponType } from "./WeaponClient";
import WeaponIcon from "./WeaponIcon";
import WeaponActions from "./WeaponActions";

type Props = {
  weapons: WeaponWithWeaponType[];
  onOpenEditModal: (weapon: WeaponWithWeaponType) => void;
};

export default function WeaponListTable({
  weapons,
  onOpenEditModal,
}: Props) {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="text-left bg-[var(--foreground)] text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Waffe</th>
						<th className="px-4 py-2">Base ATK</th>
            <th className="px-4 py-2">Seltenheit</th>
            <th className="px-4 py-2">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((weapon) => (
            <tr
              key={weapon.id}
              className="bg-[#4C5454] hover:bg-[#424C4C] cursor-pointer border-t-2 border-[#5A6363]"
            >
              <td className="px-4 py-2 flex flex-col items-center gap-2">
                <WeaponIcon
                  weapon={weapon}
                />
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      weaponIcons[
                        weapon.weaponType.name.toLowerCase() as keyof typeof weaponIcons
                      ]
                    }
                    alt={weapon.weaponType.name}
                    width={35}
                    height={35}
                    className="brightness-200"
                  />
                  {weapon.weaponType.name || "Nicht verfügbar"}
                </div>
              </td>
							<td className="px-4 py-2">
								{weapon.baseAttack || "Nicht verfügbar"}
							</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: weapon.rarity }, (_, i) => (
                    <span key={i}>
                      <Star size={20} fill="#FFD700" color="#FFD700" />
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-2">
                <WeaponActions
                  weapon={weapon}
                  onOpenEditModal={(weapon) => {
                    onOpenEditModal(weapon);
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