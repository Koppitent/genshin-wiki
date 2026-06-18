"use client";

import { useEffect, useState } from "react";
import { WeaponType } from "../generated/prisma/client";
import { Check, PencilLine, Trash2 } from "lucide-react";

export default function ParameterPage() {
  const [weaponTypes, setWeaponTypes] = useState<WeaponType[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  useEffect(() => {
    // Fetch weapon types from the API
    fetch("/api/weaponType")
      .then((response) => response.json())
      .then((data) => setWeaponTypes(data));
  }, []);

	function deleteWeaponType(id: string) {
		fetch("/api/weaponType", {
			method: "DELETE",
			body: JSON.stringify({ id }),
		})
			.then((response) => {
				// Remove the deleted weapon type from the state
				if(response.ok) {
					setWeaponTypes((prev) => prev.filter((w) => w.id !== id));
				}else {
					console.error("Failed to delete weapon type");
				}
			})
			.catch((error) => {
				console.error("Error deleting weapon type:", error);
			});
	}

	function createWeaponType(name: string) {
		fetch("/api/weaponType", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		})
			.then((response) => response.json())
			.then((newWeaponType) => {	
				setWeaponTypes([...weaponTypes, newWeaponType]);
			})
			.catch((error) => {
				console.error("Error creating weapon type:", error);
			});	
	}

	async function saveEdit(id: string) {
    const res = await fetch("/api/weaponType/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
				{ 
					id: id,
					name: editValue 
				}
			),
    });

    const updated = await res.json();

    setWeaponTypes((prev) => prev.map((w) => (w.id === id ? updated : w)));

    setEditingId(null);
  }

	function startEdit(weapon: WeaponType) {
    setEditingId(weapon.id);
    setEditValue(weapon.name);
  }

	function cancelEdit() {
    setEditingId(null);
    setEditValue("");
  }

  return (
    <>
      <div className="flex flex-col border rounded w-[20vw] bg-[var(--foreground)] p-2 min-h-[40vh] m-5">
        <h1 className="text-2xl font-bold mb-4">Waffenarten</h1>
        <ul>
          <li className="mb-4 border-b pb-4">
            <div className="flex items-center bg-[var(--foreground)] text-[var(--text-color)] border border-gray-300 focus-within:ring-2 focus-within:ring-gray-500 rounded">
              <input
                type="text"
                name="create-weapon-type-name"
                placeholder="Neue Waffenart"
                className="flex-1 bg-transparent p-2 focus:outline-none"
              />
              <div className="border-l text-gray-500 p-2 hover:text-gray-500 hover:bg-gray-200">
                <Check
                  className="cursor-pointer transition"
                  onClick={() =>
                    createWeaponType(
                      (
                        document.querySelector(
                          'input[name="create-weapon-type-name"]',
                        ) as HTMLInputElement
                      ).value,
                    )
                  }
                />
              </div>
            </div>
          </li>
          {weaponTypes.map((weapon) => {
            const isEditing = editingId === weapon.id;

            return (
              <li key={weapon.id} className="mb-2">
                <div className="flex items-center border rounded p-1">
                  <input
                    className="flex-1 bg-transparent p-2 focus:outline-none"
                    value={isEditing ? editValue : weapon.name}
                    disabled={!isEditing}
                    onChange={(e) => setEditValue(e.target.value)}
                  />

                  {!isEditing ? (
                    <PencilLine
                      className="cursor-pointer mr-3 hover:text-gray-500"
                      onClick={() => startEdit(weapon)}
                    />
                  ) : (
                    <Check
                      className="cursor-pointer mr-3 text-green-500"
                      onClick={() => saveEdit(weapon.id)}
                    />
                  )}

                  <Trash2
                    className="cursor-pointer mr-3 hover:text-gray-500"
                    onClick={() => deleteWeaponType(weapon.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
