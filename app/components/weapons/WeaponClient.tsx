"use client";

import { Prisma } from "@/app/generated/prisma/client";
import { LayoutGrid, LayoutList, ChevronDown, Star } from "lucide-react";
import { useState } from "react";
import IconList from "../IconList";
import WeaponIcon from "./WeaponIcon";
import TableList from "../TableList";
import Image from "next/image";
import { weaponIcons } from "@/lib/weapons";
import WeaponActions from "./WeaponActions";
import Modal from "../Modal";
import WeaponForm from "./WeaponForm";
import { WeaponFull } from "@/lib/weapons/weaponServiceClient";

type Props = {
  weapons: WeaponFull[];
};

type TableState = "table" | "iconlist";

type Filters = {
  searchName: string;
  weaponTypeName: string;
  rarity?: number;
};

type UIState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; weapon: WeaponFull };

export function WeaponClient({ weapons }: Props) {
  const [tableState, setTableState] = useState<TableState>("iconlist");
  const [uiState, setUiState] = useState<UIState>({ open: false });
  const [filters, setFilters] = useState<Filters>({
    searchName: "",
    weaponTypeName: "",
    rarity: undefined,
  });

  const filteredWeapons = weapons.filter((w) => {
    const matchesSearch = w.name
      .toLowerCase()
      .includes(filters.searchName.toLowerCase());

    const matchesWeapon =
      !filters.weaponTypeName ||
      w.weaponType?.name.toLowerCase() === filters.weaponTypeName.toLowerCase();

    const matchesRarity = !filters.rarity || w.rarity === filters.rarity;

    return matchesSearch && matchesWeapon && matchesRarity;
  });

  const toggleTableState = () => {
    setTableState((prev) => (prev === "table" ? "iconlist" : "table"));
  };

  return (
    <div className="w-[60%] mx-auto">
      <h1 className="text-4xl font-bold mt-5 mb-5">
        Alle Waffen aus Genshin Impact:
      </h1>

      <div className="flex flex-col">
        <div className="flex justify-between bg-[var(--foreground)] h-[4rem] border-t-2 border-[#5A6363]  rounded-t">
          <div className="flex items-center gap-[0.5rem] ml-[1rem]">
            <input
              type="text"
              placeholder="Waffen suchen..."
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
              Waffe erstellen
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

        {filteredWeapons.length === 0 ? (
          <p className="text-gray-500 text-lg flex justify-center min-h-[10rem] items-center bg-[#4C5454] border-t-2 border-[#5A6363]">
            Keine Waffen gefunden.
          </p>
        ) : (
          <>
            {tableState === "table" ? (
              <TableList
                items={filteredWeapons}
                columns={[
                  {
                    name: "Name",
                    render: (weapon) => (
                      <div className="flex flex-col items-center gap-2">
                        <WeaponIcon weapon={weapon} />
                      </div>
                    ),
                    sizePercent: 20,
                  },
                  {
                    name: "Waffe",
                    render: (weapon) => (
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            weaponIcons[
                              weapon.weaponType.name.toLowerCase() as keyof typeof weaponIcons
                            ]
                          }
                          alt={weapon.weaponType.name}
                          width={35}
                          height={35}
                          className="brightness-200"
                        />
                        {weapon.weaponType.name || "Nicht verfügbar"}
                      </div>
                    ),
                    sizePercent: 20,
                  },
                  {
                    name: "Base ATK",
                    render: (weapon) => (
                      <>{weapon.baseAttack || "Nicht verfügbar"}</>
                    ),
                    sizePercent: 20,
                  },
                  {
                    name: "Seltenheit",
                    render: (weapon) => (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: weapon.rarity }, (_, i) => (
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
                    render: (weapon) => (
                      <WeaponActions
                        weapon={weapon}
                        onOpenEditModal={(weapon) => {
                          setUiState({ open: true, mode: "edit", weapon });
                        }}
                      />
                    ),
                    sizePercent: 20,
                  },
                ]}
              />
            ) : (
              <IconList
                items={filteredWeapons}
                render={(weapon) => <WeaponIcon weapon={weapon} />}
              />
            )}
          </>
        )}
      </div>

      <Modal
        open={uiState.open}
        onClose={() => setUiState({ open: false })}
        children={
          <WeaponForm
            mode={uiState.open ? uiState.mode : "create"}
            weaponProp={"weapon" in uiState ? uiState.weapon : undefined}
            onClose={() => setUiState({ open: false })}
            onSuccess={() => setUiState({ open: false })}
          />
        }
      />
    </div>
  );
}
