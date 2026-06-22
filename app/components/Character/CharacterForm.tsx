"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Region } from "@/app/generated/prisma/client";
import {
  CharacterFull,
  createCharacter,
  updateCharacter,
} from "@/lib/characters/charachterServiceClient";
import { getRegions } from "@/lib/regions/regionServiceClient";
import { getWeaponTypes } from "@/lib/weapontypes/weapontypeServiceClient";
import ImageUpload from "../ImageUpload";

type Props = {
  mode: "create" | "edit";
  character?: CharacterFull;
  onSuccess?: () => void;
  onClose?: () => void;
};

const emptyCharacter: CharacterFull = {
  name: "",
  description: "",
  element: "pyro",
  imageUrl: "",
  rarity: 5,
  weaponTypeId: "",
  baseAttack: 0,
  regionId: "",
  region: null,
  weaponType: {
    id: "",
    name: "",
  },
  releaseVersion: 4.0,
  id: "",
};

export default function CharacterForm({
  mode,
  character: characterProp,
  onSuccess,
  onClose,
}: Props) {
  const router = useRouter();
  const [weaponTypes, setWeaponTypes] = useState<
    { id: string; name: string }[]
  >([]);
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    loadWeaponTypes();
    loadRegion();
  }, []);

  async function loadWeaponTypes() {
    getWeaponTypes()
      .then((data) => {
        setWeaponTypes(data);
      })
      .catch((err) => {
        console.error("Failed to load weapon types", err);
      });
  }

  async function loadRegion() {
    getRegions()
      .then((data) => {
        setRegions(data);
      })
      .catch((err) => {
        console.error("Failed to load regions", err);
      });
  }

  async function create() {
    console.log("Cerating char", character);

    const res = await createCharacter(character);

    if (res.status === 403 || res.status === 401) {
      alert("Du hast keine Berechtigung, einen Charakter zu erstellen.");
      return;
    }

    if (!res.ok) {
      console.error("Failed to create character", await res.text());
    }

    return res.json();
  }

  async function update() {
    const res = await updateCharacter(character);

    if (!res.ok) {
      console.error("Failed to update character", await res.text());
    }

    return res.json();
  }

  const [character, setCharacter] = useState<CharacterFull>(
    characterProp || emptyCharacter,
  );

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (
      character.name.trim() === "" ||
      character.element.trim() === "" ||
      character.weaponTypeId.trim() === ""
    ) {
      alert("Name, Element und Waffenart sind erforderlich!");
      return;
    }

    if (character.rarity < 4 || character.rarity > 5) {
      alert("Seltenheit muss zwischen 4 und 5 liegen!");
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
      <h2 className="text-xl mb-4">Character erstellen</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Name"
          className="border p-2"
          value={character.name}
          onChange={(e) => setCharacter({ ...character, name: e.target.value })}
        />

        <input
          placeholder="Description"
          className="border p-2"
          value={character.description}
          onChange={(e) =>
            setCharacter({ ...character, description: e.target.value })
          }
        />

        <select
          className="border p-2"
          value={character.element}
          onChange={(e) =>
            setCharacter({ ...character, element: e.target.value })
          }
        >
          <option value="">-- Element auswählen --</option>
          <option value="pyro">Pyro</option>
          <option value="hydro">Hydro</option>
          <option value="anemo">Anemo</option>
          <option value="electro">Electro</option>
          <option value="dendro">Dendro</option>
          <option value="cryo">Cryo</option>
          <option value="geo">Geo</option>
        </select>

        <select
          className="border p-2"
          value={character.weaponTypeId ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
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

        <select
          className="border p-2"
          value={character.regionId ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              regionId: e.target.value || "",
            })
          }
        >
          <option value="">-- Region auswählen --</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>

        <ImageUpload
          imageUrl={character.imageUrl}
          onImageUrlChange={(url) =>
            setCharacter({ ...character, imageUrl: url })
          }
        />

        <select
          className="border p-2"
          value={character.rarity}
          onChange={(e) =>
            setCharacter({
              ...character,
              rarity: parseInt(e.target.value) || 5,
            })
          }
        >
          <option value="5">5</option>
          <option value="4">4</option>
        </select>

        <label htmlFor="releaseVersion" className="text-sm -mb-3">
          Version:{" "}
          {character.releaseVersion ? character.releaseVersion.toFixed(1) : ""}
        </label>
        <input
          placeholder="Release Version"
          className="border mb-2"
          type="range"
          min="1.0"
          max="7.0"
          step="0.1"
          value={character.releaseVersion}
          onChange={(e) =>
            setCharacter({
              ...character,
              releaseVersion: parseFloat(e.target.value) || 1.0,
            })
          }
        />

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
