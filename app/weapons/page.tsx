import { Weapon } from "../generated/prisma/client";
import { WeaponClient, WeaponWithWeaponType } from "../components/weapons/WeaponClient";

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
    <WeaponClient weapons={weapons as WeaponWithWeaponType[]} />
  );
}