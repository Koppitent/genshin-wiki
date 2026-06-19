"use client";

import { Trash2, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { Character } from "../generated/prisma/client";

type Props = {
  character: Character,
	onOpenEditModal: (character: Character) => void,
};

export default function CharacterActions({ character, onOpenEditModal }: Props) {
  const router = useRouter();

  async function handleDelete() {
		if(!confirm(`Möchtest du ${character.name} wirklich löschen?`)) {
			return;
		}
    const res = await fetch(
      `/api/characters/${character.id}`,
      {
        method: "DELETE",
      },
    );

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
        onClick={() => onOpenEditModal(character)}
      >
        <PencilLine size={20} />
      </button>
    </>
  );
}