"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { CharacterCreateInput } from "../generated/prisma/models";
import { useRouter } from "next/navigation";

type Props = {
  mode: "create" | "edit";
  character?: CharacterFormType;
  onSuccess?: () => void;
  onClose?: () => void;
};

type CharacterFormType = {
	id?: string;
  name: string;
  description: string;
  element: string;
  imageUrl: string;
  weaponTypeId: string | null;
  rarity: number;
  baseAttack: number;
};

export default function CharacterForm({ mode, character: characterProp, onSuccess, onClose }: Props) {
	const router = useRouter();
	const [weaponTypes, setWeaponTypes] = useState<
    { id: string; name: string }[]
  >([]);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
    loadWeaponTypes();
  }, []);

	async function loadWeaponTypes() {
		const res = await fetch("/api/weaponType");

		if (!res.ok) {
			throw new Error("Failed to load weapon types");
		}

		const data = await res.json();
		setWeaponTypes(data);
	}

  async function createCharacter(character: CharacterFormType) {
		console.log("Cerating char", character);
		
    const res = await fetch("/api/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });

    if (!res.ok) {
      throw new Error("Failed to create character");
    }

    return res.json();
  }

	async function updateCharacter(character: CharacterFormType) {
    const res = await fetch("/api/characters", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });

    if (!res.ok) {
      throw new Error("Failed to create character");
    }

    return res.json();
  }
	
  const [character, setCharacter] = useState<CharacterFormType>(
    characterProp!,
  );

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

		if(character.name.trim() === "" || character.element.trim() === "" || character.weaponTypeId === null) {
			alert("Name, Element und Waffenart sind erforderlich!");
			return;
		}

		if(character.rarity < 4 || character.rarity > 5) {
			alert("Seltenheit muss zwischen 4 und 5 liegen!");
			return;
		}

    if (mode === "create") {
      await createCharacter(character);
    } else {
      await updateCharacter(character);
    }

    onSuccess?.();
    onClose?.();
    router.refresh();
		console.log("created successfully");	
  }

	async function handleImageUpload(file: File) {
		setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Upload failed");
			setUploading(false);
      return;
    }

    const data = await res.json();

    setCharacter((prev) => ({
      ...prev,
      imageUrl: data.imageUrl,
    }));
		setUploading(false);
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
              weaponTypeId: e.target.value || null,
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

        <div className="flex flex-col gap-2 border p-2">
          <label className="text-sm">Character Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />

          {uploading && <p>Uploading...</p>}

          {character.imageUrl && (
            <img
              src={character.imageUrl}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md border"
            />
          )}
        </div>

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
