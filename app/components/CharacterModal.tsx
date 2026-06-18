"use client";

import CharacterForm from "./CharacterForm";
import { Character } from "../generated/prisma/client";

type CharacterModalProps = {
  open: boolean;
  mode: "create" | "edit";
  character?: Character;
  onClose: () => void;
};

export default function CharacterModal({
  open,
  mode,
  character,
  onClose,
}: CharacterModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[var(--background)] border border-gray-600 p-6 rounded w-[400px]">
        <CharacterForm
          mode={mode}
          character={character}
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
