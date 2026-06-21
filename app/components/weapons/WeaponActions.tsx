"use client";

import { deleteWeapon, WeaponFull } from "@/lib/weapons/weaponServiceClient";
import { Trash2, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  weapon: WeaponFull;
  onOpenEditModal: (weapon: WeaponFull) => void;
};

export default function WeaponActions({
  weapon,
  onOpenEditModal,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Möchtest du ${weapon.name} wirklich löschen?`)) {
      return;
    }
    
		const res = await deleteWeapon(weapon.id);

    if (!res.success) {
      alert(res.message);
      return;
    }
    router.refresh();
  }

  return (
    <>
      <button
        className="text-white p-[1rem] rounded-2xl cursor-pointer hover:bg-gray-600"
        onClick={handleDelete}
      >
        <Trash2 size={20} />
      </button>

      <button
        className="text-white p-[1rem] rounded-2xl cursor-pointer hover:bg-gray-600"
        onClick={() => onOpenEditModal(weapon)}
      >
        <PencilLine size={20} />
      </button>
    </>
  );
}
