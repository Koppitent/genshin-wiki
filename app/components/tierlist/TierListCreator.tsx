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
import { useEffect, useState } from "react";
import Icon from "../Icon";

type Props = {
  mode: "create" | "edit";
  tierList?: TierListDto;
};

const TIERS_SHOWN = ["SS", "S", "A", "B", "C"] as const;
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
  const [characters, setCharacters] = useState<CharacterFull[]>([]);
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
  useEffect(() => {
    getCharacters()
      .then((data) => {
        console.debug("Loading characters: ", data);
        setCharacters(data);
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
          setUsingTierList(updated);
        })
        .catch((error) => {
          console.error("Error updating tier list:", error);
        });
    }
    setIsSubmitting(false);
    console.log("RUNNIGN AFTER");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[60vw]">
      {isSubmitting ? (
        <p className="text-gray-600">Submitting...</p>
      ) : (
        <>
          <form action="" className="w-full flex flex-col gap-4">
            <div className="flex flex-col mt-5">
              <h1 className="text-2xl font-bold">Tier List Creator</h1>
              <p className="text-gray-400">Erstelle deine eigene Tierlist</p>
            </div>

            <div className="flex flex-col w-full tierlist bg-black/40 rounded-lg p-2">
              {TIERS_SHOWN.map((tier) => (
                <div
                  key={tier}
                  className="flex flex-row items-center border-b last:border-b-0"
                >
                  <div className=" h-[5rem] w-[20%] border-r justify-center items-center flex">
                    <label
                      htmlFor={`tier-${tier}`}
                      className="font-semibold text-center"
                    >
                      {tier}
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full h-[5rem] w-[80%]"></div>
                </div>
              ))}
            </div>
            <button
              onClick={submitTierList}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
            {characters.length === 0 ? (
              <p className="text-gray-600">Loading characters...</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {characters.map((character) => (
                  <Icon
                    name={character.name}
                    imageUrl={character.imageUrl}
                    rarity={character.rarity}
                    showFullName={false}
                    size={6}
                  />
                ))}
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}
