"use client";

import { weaponIcons } from "@/lib/weapons";
import Image from "next/image";
import { WeaponWithWeaponType } from "./WeaponClient";

type WeaponIconProps = {
	weapon: WeaponWithWeaponType;
};

export default function WeaponIcon({ weapon }: WeaponIconProps) {
	return (
		<div className="flex flex-col items-center justify-center cursor-pointer">
			<div className="relative w-[5rem] h-[5rem] hover:scale-105 transition-transform duration-200">
				<img
					src={weapon.imageUrl}
					alt={weapon.name}
					className={`w-full h-full object-cover rounded-md rarity-${weapon.rarity}`}
				/>

				<Image
					src={weaponIcons[weapon.weaponType.name.toLocaleLowerCase() as keyof typeof weaponIcons]}
					alt={weapon.weaponType.name}
					width={24}
					height={24}
					className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#424C4C]"
				/>
			</div>
			<p className="font-bold text-lg">{weapon.name}</p>
		</div>
	);
}
