import { useEffect, useState } from "react";
import { Check, PencilLine, Trash2 } from "lucide-react";
import { WeaponType } from "@/app/generated/prisma/client";
import { createWeaponType, deleteWeaponType, getWeaponTypes, updateWeaponType } from "@/lib/weapontypes/weapontypeServiceClient";

export default function WeaponBlock() {
  const [items, setItems] = useState<WeaponType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
		getWeaponTypes()
      .then((data) => {
				console.log("weapontypedata", data);
				setItems(data);
      });
  }, []);

  function handleSubmit(name: string) {
    if (!name.trim()) {
      alert("Name darf nicht leer sein");
      return;
    }

    create(name);
  }

  function create(name: string) {
		createWeaponType({name: name})
			.then((res) => res.json())
      .then((newItem) => setItems((prev) => [...prev, newItem]));
  }

  function remove(id: string) {
		if(!confirm("Bist du sicher, dass du diese Waffenart löschen möchtest?")) {
			return;
		}

		deleteWeaponType(id).then((res) => {
			if(res.success) {
				setItems((prev) => prev.filter((i) => i.id !== id));
			} else {
				alert(res.message);
			}
		});
  }

  async function saveEdit(id: string) {
    const res = await updateWeaponType({ id, name: editValue })

    const updated = await res.json();

    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));

    setEditingId(null);
  }

  function startEdit(item: WeaponType) {
    setEditingId(item.id);
    setEditValue(item.name);
  }

  return (
    <div className="flex flex-col border rounded w-[20vw] bg-[var(--foreground)] p-2 min-h-[40vh]">
      <h1 className="text-2xl font-bold mb-4">Waffenarten</h1>

      {/* CREATE */}
      <div className="mb-4 flex items-center gap-2">
        <input
          placeholder="Neuer Eintrag"
          className="flex-1 p-2 rounded bg-[#3d4747] focus:bg-[#5a6b6b] focus:outline-none"
          id="create-input"
        />
        <Check
          className="h-full w-[10%] cursor-pointer bg-[#3d4747] hover:bg-[#5a6b6b] rounded text-green-500"
          onClick={() => {
            const el = document.getElementById(
              "create-input",
            ) as HTMLInputElement;
            handleSubmit(el.value);
            el.value = "";
          }}
        />
      </div>

      {/* LIST */}
      {items.map((item) => {
        const isEditing = editingId === item.id;

        return (
          <div
            key={item.id}
            className="flex items-center border p-2 mb-2 gap-1"
          >
            <input
              className={`flex-1 p-1 focus:outline-none rounded ${
                isEditing ? "bg-gray-700" : "bg-transparent"
              }`}
              value={isEditing ? editValue : item.name}
              disabled={!isEditing}
              onChange={(e) => setEditValue(e.target.value)}
            />

            {!isEditing ? (
              <PencilLine
                className="cursor-pointer"
                onClick={() => startEdit(item)}
              />
            ) : (
              <Check
                className="cursor-pointer text-green-500"
                onClick={() => saveEdit(item.id)}
              />
            )}

            <Trash2
              className="cursor-pointer"
              onClick={() => remove(item.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
