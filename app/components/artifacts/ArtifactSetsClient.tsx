"use client";

import {
  ChevronDown,
  LayoutGrid,
  LayoutList,
  PencilLine,
  ShieldCogCorner,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Modal from "../Modal";
import ArtifactsForm from "./ArtifactsForm";
import IconList from "../IconList";
import TableList from "../TableList";
import {
  ArtifactSetFull,
  deleteArtifactSet,
} from "@/lib/artifactsets/artifactsetServiceClient";
import Icon from "../Icon";

type Props = {
  artifactSets: ArtifactSetFull[];
};

type TableState = "table" | "iconlist";

type Filters = {
  searchName: string;
  rarity?: number;
  showAktionen: boolean;
};

type UIState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; character: ArtifactSetFull };

export default function ArtifactSetsClientPage({ artifactSets }: Props) {
  const [tableState, setTableState] = useState<TableState>("table");
  const [uiState, setUiState] = useState<UIState>({ open: false });
  const [filters, setFilters] = useState<Filters>({
    searchName: "",
    rarity: undefined,
    showAktionen: false,
  });

  const filteredArtifactSets = artifactSets.filter((set) => {
    const matchesName = set.name
      .toLowerCase()
      .includes(filters.searchName.toLowerCase());
    const matchesRarity = filters.rarity ? set.rarity === filters.rarity : true;
    return matchesName && matchesRarity;
  });

  const toggleTableState = () => {
    setTableState((prev) => (prev === "table" ? "iconlist" : "table"));
  };

  async function handleDelete(id: string) {
    if (!confirm("Bist du sicher, dass du dieses Artefakt löschen möchtest?")) {
      return;
    }

    const res = await deleteArtifactSet(id);
    if (res.success) {
      artifactSets = artifactSets.filter((set) => set.id !== id);
    } else {
      alert("Fehler beim Löschen: " + res.message);
    }
  }

  return (
    <div className="w-[60%] mx-auto">
      <h1 className="text-4xl font-bold mt-5 mb-5">
        Alle Artefakte aus Genshin Impact:
      </h1>

      <div className="flex flex-col">
        <div className="flex justify-between bg-[var(--foreground)] h-[4rem] border-t-2 border-[#5A6363]  rounded-t">
          <div className="flex items-center gap-[0.5rem] ml-[1rem]">
            <input
              type="text"
              placeholder="Artefakte suchen..."
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
                <option value="3">3 Sterne</option>
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
              Artefakt erstellen
            </button>
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

        {filteredArtifactSets.length === 0 ? (
          <p className="text-gray-500 text-lg flex justify-center min-h-[10rem] items-center bg-[#4C5454] border-t-2 border-[#5A6363]">
            Keine Artefakte gefunden.
          </p>
        ) : (
          <>
            {tableState === "table" ? (
              <TableList
                items={filteredArtifactSets}
                columns={[
                  {
                    name: "Name",
                    render: (artifactSet) => (
                      <div className="flex flex-col items-center gap-2">
                        <Icon
                          name={artifactSet.name}
                          imageUrl={artifactSet.imageUrl}
                          rarity={artifactSet.rarity}
                          showFullName={true}
                        />
                      </div>
                    ),
                    sizePercent: 20,
                  },
                  {
                    name: "Set Bonus 2",
                    render: (artifactSet) => (
                      <p>{artifactSet.setBonusDescription2}</p>
                    ),
                    sizePercent: 30,
                  },
                  {
                    name: "Set Bonus 4",
                    render: (artifactSet) => (
                      <p className="mt-1 mb-1">
                        {artifactSet.setBonusDescription4}
                      </p>
                    ),
                    sizePercent: 30,
                  },
                  {
                    name: "Aktionen",
                    render: (artifactSet) => (
                      <div className="flex gap-2 justify-center items-center">
                        <button
                          onClick={() => handleDelete(artifactSet.id)}
                          className="text-white p-[1rem] rounded-2xl cursor-pointer hover:bg-gray-600"
                        >
                          <Trash2 size={20} />
                        </button>
                        <button
                          onClick={() =>
                            setUiState({
                              open: true,
                              mode: "edit",
                              character: artifactSet,
                            })
                          }
                          className="text-white p-[1rem] rounded-2xl cursor-pointer hover:bg-gray-600"
                        >
                          <PencilLine size={20} />
                        </button>
                      </div>
                    ),
                    disabled: !filters.showAktionen,
                  },
                ]}
              />
            ) : (
              <IconList
                items={filteredArtifactSets}
                render={(artifactSet) => (
                  <Icon
                    name={artifactSet.name}
                    imageUrl={artifactSet.imageUrl}
										rarity={artifactSet.rarity}
                  />
                )}
              />
            )}
          </>
        )}
      </div>

      <Modal
        open={uiState.open}
        onClose={() => setUiState({ open: false })}
        children={
          <ArtifactsForm
            mode={uiState.open ? uiState.mode : "create"}
            artifactSetProp={
              uiState.open && uiState.mode === "edit"
                ? uiState.character
                : undefined
            }
            onSuccess={() => {
              setUiState({ open: false });
            }}
            onClose={() => {
              setUiState({ open: false });
            }}
          />
        }
      />
    </div>
  );
}
