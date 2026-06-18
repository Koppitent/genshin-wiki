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
        className="text-white p-2 rounded-2xl cursor-pointer hover:bg-gray-600"
        onClick={handleDelete}
      >
        <Trash2 size={16} />
      </button>

      <button
        className="text-white p-2 rounded-2xl cursor-pointer hover:bg-gray-600"
        onClick={() => onOpenEditModal(character)}
      >
        <PencilLine size={16} />
      </button>
    </>
  );
}