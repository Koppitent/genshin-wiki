"use client";

import { Trash2, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { WeaponWithWeaponType } from "./WeaponClient";

type Props = {
  weapon: WeaponWithWeaponType;
  onOpenEditModal: (weapon: WeaponWithWeaponType) => void;
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
    const res = await fetch(`/api/weapons/${weapon.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Löschen fehlgeschlagen");
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
