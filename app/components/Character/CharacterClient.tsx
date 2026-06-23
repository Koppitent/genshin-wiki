"use client";

import { useState } from "react";
import {
  ChevronDown,
  LayoutGrid,
  LayoutList,
  ShieldCogCorner,
  Star,
} from "lucide-react";
import Modal from "../Modal";
import CharacterForm from "./CharacterForm";
import { CharacterFull } from "@/lib/characters/charachterServiceClient";
import IconList from "../IconList";
import TableList from "../TableList";
import Image from "next/image";
import { elementIcons } from "@/lib/elements";
import { weaponIcons } from "@/lib/weapons";
import CharacterActions from "./CharacterActions";
import Icon from "../Icon";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { hasRole } from "@/lib/auth/authHelper";

type Props = {
  characters: CharacterFull[];
};

type TableState = "table" | "iconlist";

type Filters = {
  searchName: string;
  weaponTypeName: string;
  rarity?: number;
  element?: string;
  showAktionen: boolean;
};

type UIState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; character: CharacterFull };

export default function CharacterClient({ characters }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [tableState, setTableState] = useState<TableState>("iconlist");
  const [uiState, setUiState] = useState<UIState>({ open: false });
  const [filters, setFilters] = useState<Filters>({
    searchName: "",
    weaponTypeName: "",
    rarity: undefined,
    element: undefined,
    showAktionen: false,
  });

  const filteredCharacters = characters.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(filters.searchName.toLowerCase());

    const matchesWeapon =
      !filters.weaponTypeName ||
      c.weaponType?.name.toLowerCase() === filters.weaponTypeName.toLowerCase();

    const matchesRarity = !filters.rarity || c.rarity === filters.rarity;

    const matchesElement = !filters.element || c.element === filters.element;

    return matchesSearch && matchesWeapon && matchesRarity && matchesElement;
  });

  const toggleTableState = () => {
    setTableState((prev) => (prev === "table" ? "iconlist" : "table"));
  };

  return (
    <div className="w-[60%] mx-auto">
      <h1 className="text-4xl font-bold mt-5 mb-5">
        Alle Charaktere aus Genshin Impact:
      </h1>

      <div className="flex flex-col">
        <div className="flex justify-between bg-[var(--foreground)] h-[4rem] border-t-2 border-[#5A6363]  rounded-t">
          <div className="flex items-center gap-[0.5rem] ml-[1rem]">
            <input
              type="text"
              placeholder="Charaktere suchen..."
              className="bg-[var(--background)] focus:bg-[#3d4747] border-none rounded text-white px-4 py-2 focus:outline-none"
              value={filters.searchName}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchName: e.target.value }))
              }
            />

            <div className="relative">
              <select
                name=""
                id=""
                value={filters.element}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, element: e.target.value }))
                }
                className="appearance-none bg-[#3d4747] border-none rounded text-white px-4 py-2 pr-10 focus:outline-none cursor-pointer"
              >
                <option value="">Alle Elemente</option>
                <option value="pyro">Pyro</option>
                <option value="hydro">Hydro</option>
                <option value="anemo">Anemo</option>
                <option value="electro">Electro</option>
                <option value="dendro">Dendro</option>
                <option value="cryo">Cryo</option>
                <option value="geo">Geo</option>
              </select>

              {/* custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-300">
                <ChevronDown size={18} />
              </div>
            </div>

            <div className="relative">
              <select
                name=""
                id=""
                value={filters.rarity}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    rarity: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  }))
                }
                className="appearance-none bg-[#3d4747] border-none rounded text-white px-4 py-2 pr-10 focus:outline-none cursor-pointer"
              >
                <option value="">Alle Seltenheiten</option>
                <option value="5">5 Sterne</option>
                <option value="4">4 Sterne</option>
              </select>

              {/* custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-300">
                <ChevronDown size={18} />
              </div>
            </div>

            <div className="relative">
              <select
                name=""
                id=""
                value={filters.weaponTypeName}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    weaponTypeName: e.target.value,
                  }))
                }
                className="appearance-none bg-[#3d4747] border-none rounded text-white px-4 py-2 pr-10 focus:outline-none cursor-pointer"
              >
                <option value="">Alle Waffentypen</option>
                <option value="sword">Schwert</option>
                <option value="catalyst">Katalysator</option>
                <option value="polearm">Stangenwaffe</option>
                <option value="bow">Bogen</option>
                <option value="claymore">Claymore</option>
              </select>

              {/* custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-300">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[0.5rem] mr-[1rem]">
            <button
              onClick={() => {
                setUiState({ open: true, mode: "create" });
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
            >
              Charakter erstellen
            </button>
            {hasRole(session, "admin") && (
              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    showAktionen: !prev.showAktionen,
                  }))
                }
                className="hover:bg-gray-600 p-[0.5rem] rounded-2xl cursor-pointer"
              >
                <ShieldCogCorner size={20} />
              </button>
            )}
            <button
              onClick={toggleTableState}
              className="hover:bg-gray-600 p-[0.5rem] rounded-2xl cursor-pointer"
            >
              {tableState === "table" ? (
                <LayoutGrid size={20} />
              ) : (
                <LayoutList size={20} />
              )}
            </button>
          </div>
        </div>

        {filteredCharacters.length === 0 ? (
          <p className="text-gray-500 text-lg flex justify-center min-h-[10rem] items-center bg-[#4C5454] border-t-2 border-[#5A6363]">
            Keine Charaktere gefunden.
          </p>
        ) : (
          <>
            {tableState === "table" ? (
              <TableList
                items={filteredCharacters}
                columns={[
                  {
                    name: "Name",
                    render: (character) => (
                      <div className="flex flex-col items-center gap-2">
                        <Icon
                          name={character.name}
                          imageUrl={character.imageUrl}
                          rarity={character.rarity}
                          element={character.element}
                          showFullName={true}
                          size={6}
                        />
                      </div>
                    ),
                    sizePercent: 20,
                  },
                  {
                    name: "Element",
                    render: (character) => (
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            elementIcons[
                              character.element as keyof typeof elementIcons
                            ]
                          }
                          alt={character.element}
                          width={35}
                          height={35}
                        />
                        {character.element.toUpperCase().substring(0, 1) +
                          character.element.substring(1) || "Nicht verfügbar"}
                      </div>
                    ),
                    sizePercent: 20,
                  },
                  {
                    name: "Waffe",
                    render: (character) => (
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            weaponIcons[
                              character.weaponType.name.toLowerCase() as keyof typeof weaponIcons
                            ]
                          }
                          alt={character.weaponType.name}
                          width={35}
                          height={35}
                          className="brightness-200"
                        />
                        {character.weaponType.name || "Nicht verfügbar"}
                      </div>
                    ),
                    sizePercent: 20,
                  },
                  {
                    name: "Seltenheit",

                    render: (character) => (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: character.rarity }, (_, i) => (
                          <span key={i}>
                            <Star size={20} fill="#FFD700" color="#FFD700" />
                          </span>
                        ))}
                      </div>
                    ),
                    sizePercent: 20,
                  },
                  {
                    name: "Aktionen",
                    render: (character) => (
                      <CharacterActions
                        character={character}
                        onOpenEditModal={(character) => {
                          setUiState({ open: true, mode: "edit", character });
                        }}
                      />
                    ),
                    disabled: !filters.showAktionen,
                  },
                ]}
              />
            ) : (
              <IconList
                items={filteredCharacters}
                render={(character) => (
                  <Icon
                    name={character.name}
                    imageUrl={character.imageUrl}
                    rarity={character.rarity}
                    element={character.element}
                    showFullName={true}
                    size={6}
                  />
                )}
                onItemClick={(character) => {
                  router.push(`/characters/${character.id}`);
                }}
              />
            )}
          </>
        )}
      </div>

      <Modal
        open={uiState.open}
        onClose={() => setUiState({ open: false })}
        children={
          <CharacterForm
            mode={uiState.open ? uiState.mode : "create"}
            character={"character" in uiState ? uiState.character : undefined}
            onClose={() => setUiState({ open: false })}
            onSuccess={() => setUiState({ open: false })}
          />
        }
      />
    </div>
  );
}
