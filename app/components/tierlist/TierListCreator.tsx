"use client";

import {
  CharacterFull,
  getCharacters,
} from "@/lib/characters/charachterServiceClient";
import {
  CreateTierListInput,
  TierListDto,
  UpdateTierListInput,
} from "@/lib/tierlists/tierlist.schema";
import {
  createTierList,
  updateTierList,
} from "@/lib/tierlists/tierlistServiceClient";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Icon from "../Icon";
import DraggableCharacter from "./DraggableCharacter";

type Props = {
  mode: "create" | "edit";
  tierList?: TierListDto;
};

const TIERS_SHOWN = [
	{ tier: "SS",
		color: "bg-red-500"
	 },
	{ tier: "S",
		color: "bg-orange-500"
	 },
	{ tier: "A",
		color: "bg-yellow-500"
	 },
	{ tier: "B",
		color: "bg-green-500"
	 },
	{ tier: "C",
		color: "bg-blue-500"
	 }
] as const;

type ValidTier = "SS" | "S" | "A" | "B" | "C" | "D" | "E" | "F";

type TierListForm = {
  id?: string;
  title: string;
  visibility: "PUBLIC" | "PRIVATE" | "UNLISTED";
  entries: {
    characterId: string;
    tier: ValidTier;
    position: number;
  }[];
};

export default function TierListCreator({ mode, tierList }: Props) {
  const emptyTierList: TierListForm = {
    title: "",
    visibility: "PRIVATE",
    entries: [],
  };
  const [usingTierList, setUsingTierList] = useState<TierListForm>(
    tierList
      ? {
          id: tierList.id,
          title: tierList.title,
          visibility: tierList.visibility,
          entries: tierList.entries,
        }
      : emptyTierList,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [allcharacters, setAllcharacters] = useState<CharacterFull[]>([]);
	const characterPool = allcharacters.filter(
    (c) => !usingTierList.entries.some((e) => e.characterId === c.id),
  );
  useEffect(() => {
    getCharacters()
      .then((data) => {
        console.debug("Loading characters: ", data);
        setAllcharacters(data);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }, []);

  function toCreateTierListInput(form: TierListForm): CreateTierListInput {
    return {
      title: form.title,
      visibility: form.visibility,
      entries: form.entries.map((e) => ({
        characterId: e.characterId,
        tier: e.tier,
        position: e.position,
      })),
    };
  }

  function toUpdateTierListInput(form: TierListForm): UpdateTierListInput {
    if (!form.id) throw new Error("Missing id");

    return {
      id: form.id,
      title: form.title,
      visibility: form.visibility,
      entries: form.entries.map((e) => ({
        characterId: e.characterId,
        tier: e.tier,
        position: e.position,
      })),
    };
  }

  async function submitTierList() {
    setIsSubmitting(true);
    if (mode == "create") {
      const tierListInput = toCreateTierListInput(usingTierList);
      createTierList(tierListInput)
        .then((created) => {
          console.debug("Created tier list: ", created);
          //TODO update characterPool
          setUsingTierList(created);
          console.log("RUNNING BEFOPRE");
        })
        .catch((error) => {
          console.log("RUNNING BEFOPRE");
          console.error("Error creating tier list:", error);
        });
    } else {
      const tierListInput = toUpdateTierListInput(usingTierList);
      updateTierList(tierListInput)
        .then((updated) => {
          console.debug("Updated tier list: ", updated);
          //TODO update characterPool
          setUsingTierList(updated);
        })
        .catch((error) => {
          console.error("Error updating tier list:", error);
        });
    }
    setIsSubmitting(false);
    console.log("RUNNIGN AFTER");
  }

  const { setNodeRef: setPoolRef } = useDroppable({
    id: "pool",
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const characterId = active.id as string;
    const targetTier = over.id as string;

    setUsingTierList((prev) => {
      const filtered = prev.entries.filter(
        (e) => e.characterId !== characterId,
      );

      // dragged to pool → remove from tiers
      if (targetTier === "pool") {
        return {
          ...prev,
          entries: filtered,
        };
      }

      // dragged into tier → add
      return {
        ...prev,
        entries: [
          ...filtered,
          {
            characterId,
            tier: targetTier as ValidTier,
            position: 0,
          },
        ],
      };
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[60vw]">
      {isSubmitting ? (
        <p className="text-gray-600">Submitting...</p>
      ) : (
        <>
          <DndContext onDragEnd={handleDragEnd}>
            <form action="" className="w-[90vw] flex flex-col gap-4">
              <div className="flex flex-col mt-5">
                <h1 className="text-2xl font-bold">Tier List Creator</h1>
                <p className="text-gray-400">Erstelle deine eigene Tierlist</p>
              </div>

              <div className="flex flex-col w-full bg-black/40 rounded-lg border border-gray-600 tierlist-container overflow-hidden">
                {TIERS_SHOWN.map((tier) => (
                  <TierRow key={tier.tier} tier={tier.tier} color={tier.color}>
                    {usingTierList.entries
                      .filter((e) => e.tier === tier.tier)
                      .map((e) => {
                        const character = allcharacters.find(
                          (c) => c.id === e.characterId,
                        );

                        if (!character) return null;

                        return (
                          <div key={character.id} className="m-2">
                            <DraggableCharacter
                              key={character.id}
                              character={character}
                            />
                          </div>
                        );
                      })}
                  </TierRow>
                ))}
              </div>
              <button
                onClick={submitTierList}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
              {characterPool.length === 0 ? (
                <p className="text-gray-600">Loading characters...</p>
              ) : (
                <div ref={setPoolRef} className="flex flex-wrap gap-3 h-[20vh]">
                  <div className="flex flex-wrap gap-3">
                    {characterPool.map((character) => (
                      <DraggableCharacter
                        character={character}
                        key={character.id}
                      />
                    ))}
                  </div>
                </div>
              )}
            </form>
          </DndContext>
        </>
      )}
    </div>
  );
}

function TierRow({
  tier,
  color,
  children,
}: {
  tier: string;
  color: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: tier,
  });

  return (
    <div className="grid grid-cols-[20%_80%] items-center border-b border-gray-600 last:border-b-0">
      <div
        className={`h-full border-r border-gray-600 flex items-center justify-center ${color}`}
      >
        <label className="font-bold">{tier}</label>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-wrap min-h-[4rem] h-full
          ${isOver ? "bg-blue-500/20" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
