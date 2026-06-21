import { getWeaponsService } from "@/lib/weapons/weaponService";
import { WeaponClient } from "../components/weapons/WeaponClient";
import { WeaponFull } from "@/lib/weapons/weaponServiceClient";

export default async function WeaponsPage() {
  const weapons = await getWeaponsService();
  return (
    <WeaponClient weapons={weapons as WeaponFull[]} />
  );
}