"use client";

import { SyntheticEvent, useState } from "react";
import { CharacterCreateInput } from "../generated/prisma/models";
import { useRouter } from "next/navigation";

type Props = {
  mode: "create" | "edit";
  character?: CharacterCreateInput;
  onSuccess?: () => void;
  onClose?: () => void;
};

const emptyCharacter: CharacterCreateInput = {
  name: "",
  description: "",
  element: "",
  rarity: 5,
  baseAttack: 0,
};

export default function CharacterForm({ mode, character: characterProp, onSuccess, onClose }: Props) {
	const router = useRouter();

  async function createCharacter(character: CharacterCreateInput) {
    const res = await fetch("http://localhost:3000/api/characters", {
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

	async function updateCharacter(character: CharacterCreateInput) {
    const res = await fetch("http://localhost:3000/api/characters", {
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
	
  const [character, setCharacter] = useState<CharacterCreateInput>(
    characterProp ?? emptyCharacter,
  );

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

		if(character.name.trim() === "" || character.element.trim() === "") {
			alert("Name und Element sind erforderlich!");
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
          value={character.rarity}
          onChange={(e) =>
            setCharacter({ ...character, rarity: parseInt(e.target.value) || 5 })
          }
        >
          <option value="5">5</option>
          <option value="4">4</option>
        </select>

        <button type="submit" className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600">
          Speichern
        </button>
      </form>
    </div>
  );
}
