"use client";

import { useDraggable } from "@dnd-kit/core";
import Icon from "../Icon";
import { CharacterFull } from "@/lib/characters/charachterServiceClient";

type Props = {
  character: CharacterFull;
};

export default function DraggableCharacter({ character }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: character.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Icon
        name={character.name}
        imageUrl={character.imageUrl}
        rarity={character.rarity}
        showFullName={false}
        size={6}
      />
    </div>
  );
}