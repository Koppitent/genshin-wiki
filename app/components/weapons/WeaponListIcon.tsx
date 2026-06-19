"use client";

import { WeaponWithWeaponType } from "./WeaponClient";
import WeaponIcon from "./WeaponIcon";

type Props = {
	weapons: WeaponWithWeaponType[];
};

export default function WeaponListIcons({ weapons }: Props) {
	return (
    <div className="grid grid-cols-10 gap-4 p-4 bg-[#4C5454]">
      {weapons.map((weapon) => (
        <WeaponIcon
          key={weapon.id}
          weapon={weapon}
        />
      ))}
    </div>
  );
}
