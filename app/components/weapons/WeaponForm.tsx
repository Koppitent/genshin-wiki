"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createWeapon, updateWeapon, WeaponFull } from "@/lib/weapons/weaponServiceClient";
import ImageUpload from "../ImageUpload";
import TextAreaInput from "../TextAreaInput";
import { getWeaponTypes } from "@/lib/weapontypes/weapontypeServiceClient";

type Props = {
  mode: "create" | "edit";
  weaponProp?: WeaponFull;
  onSuccess?: () => void;
  onClose?: () => void;
};

const weaponEmpty: WeaponFull = {
  id: "",
  name: "",
  description: "",
  imageUrl: "",
  rarity: 5,
  weaponTypeId: "",
  weaponType: {
    id: "",
    name: "",
  },
  baseAttack: 0,
  releaseVersion: 1.0,
};

export default function WeaponForm({
  mode,
  weaponProp,
  onSuccess,
  onClose,
}: Props) {
  const router = useRouter();
  const [weapon, setWeapon] = useState<WeaponFull>(weaponProp || weaponEmpty);
  const [weaponTypes, setWeaponTypes] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    loadWeaponTypes();
  }, []);

  async function loadWeaponTypes() {
    const res = await getWeaponTypes();

    if (!res.ok) {
      throw new Error("Failed to load weapon types");
    }

    const data = await res.json();
    setWeaponTypes(data);
  }

  async function create() {
    console.log("Creating weapon", weapon);

    const res = await createWeapon(weapon);

    if (!res.ok) {
      throw new Error("Failed to create weapon");
    }

    return res.json();
  }

  async function update() {
    const res = await updateWeapon(weapon);

    if (!res.ok) {
      throw new Error("Failed to update weapon");
    }

    return res.json();
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (weapon.name.trim() === "" || weapon.weaponTypeId.trim() === "") {
      alert("Name und Waffenart sind erforderlich!");
      return;
    }

    if (weapon.rarity < 3 || weapon.rarity > 5) {
      alert("Seltenheit muss zwischen 3 und 5 liegen!");
      return;
    }

    if (mode === "create") {
      await create();
    } else {
      await update();
    }

    onSuccess?.();
    onClose?.();
    router.refresh();
    console.log("created successfully");
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Weapon erstellen</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Name"
          className="border p-2"
          value={weapon.name}
          onChange={(e) => setWeapon({ ...weapon, name: e.target.value })}
        />

        <TextAreaInput
          inputString={weapon.description}
          onChange={(value) => setWeapon({ ...weapon, description: value })}
					placeholder="Description"
        />

        <select
          className="border p-2"
          value={weapon.weaponTypeId ?? ""}
          onChange={(e) =>
            setWeapon({
              ...weapon,
              weaponTypeId: e.target.value || "",
            })
          }
        >
          <option value="">-- Waffenart auswählen --</option>
          {weaponTypes.map((weaponType) => (
            <option key={weaponType.id} value={weaponType.id}>
              {weaponType.name}
            </option>
          ))}
        </select>

        <ImageUpload
          imageUrl={weapon.imageUrl}
          onImageUrlChange={(imageUrl: string) => {
            setWeapon({ ...weapon, imageUrl });
          }}
        />

        <select
          className="border p-2"
          value={weapon.rarity}
          onChange={(e) =>
            setWeapon({
              ...weapon,
              rarity: parseInt(e.target.value) || 5,
            })
          }
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600"
        >
          Speichern
        </button>
      </form>
    </div>
  );
}
