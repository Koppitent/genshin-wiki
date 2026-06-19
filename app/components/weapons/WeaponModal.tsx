"use client";

import { WeaponWithWeaponType } from "./WeaponClient";
import WeaponForm from "./WeaponForm";

type Props = {
	open: boolean;
	mode: "create" | "edit";
	weapon?: WeaponWithWeaponType;
	onClose: () => void;
};

export default function WeaponModal({
	open,
	mode,
	weapon,
	onClose,
}: Props) {
	if (!open) return null;

	return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[var(--background)] border border-gray-600 p-6 rounded w-[400px]">
        <WeaponForm
          mode={mode}
          weapon={{
            id: weapon?.id ?? undefined,
            name: weapon?.name ?? "",
            description: weapon?.description ?? "",
            rarity: weapon?.rarity ?? 5,
            imageUrl: weapon?.imageUrl ?? "",
            weaponTypeId: weapon?.weaponTypeId ?? null,
            baseAttack: weapon?.baseAttack ?? 0,
          }}
          onClose={() => onClose()}
          onSuccess={() => onClose()}
        />
        <button onClick={onClose} className="mt-3 text-red-500 cursor-pointer">
          Schließen
        </button>
      </div>
    </div>
  );
}
