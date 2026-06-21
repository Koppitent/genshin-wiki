import { Region } from "@/app/generated/prisma/client";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import RegionForm from "./RegionForm";
import { PencilLine, Trash2 } from "lucide-react";
import { deleteRegion, getRegions } from "@/lib/regions/regionServiceClient";

type modalState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; region: Region };

export default function RegionBlock() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [modalState, setModalState] = useState<modalState>({ open: false });

  async function handleDelete(id: string) {
    if (!confirm("Möchten Sie diese Region wirklich löschen?")) {
      return;
    }

    const res = await deleteRegion(id);

    if (res.success) {
      setRegions((prev) => prev.filter((r) => r.id !== id));
    }
  }

  function editRegion(region: Region) {
    setModalState({
      open: true,
      mode: "edit",
      region,
    });
  }

  async function loadRegions() {
    getRegions().then((data) => {
      setRegions(data);
    });
  }

  useEffect(() => {
    loadRegions();
  }, []);

  return (
    <div className="flex flex-col border rounded w-[20vw] bg-[var(--foreground)] p-2 min-h-[40vh]">
      <div className="mb-4 flex justify-between items-center gap-2">
        <h1 className="text-2xl font-bold mb-4">Regionen</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setModalState({ open: true, mode: "create" })}
        >
          Region hinzufügen
        </button>
      </div>

      {regions.map((region) => (
        <div
          key={region.id}
          className="flex items-center border p-2 mb-2 gap-1"
        >
          <span className="flex-1">{region.name}</span>

          <PencilLine
            className="cursor-pointer hover:text-blue-400"
            onClick={() => editRegion(region)}
          />

          <Trash2
            className="cursor-pointer hover:text-red-500"
            onClick={() => handleDelete(region.id)}
          />
        </div>
      ))}

      <Modal
        open={modalState.open}
        title={
          modalState.open && modalState.mode === "edit"
            ? "Region bearbeiten"
            : "Region erstellen"
        }
        onClose={() => setModalState({ open: false })}
      >
        {modalState.open && (
          <RegionForm
            mode={modalState.mode}
            region={
              modalState.mode === "edit"
                ? modalState.region
                : {
                    id: "",
                    name: "",
                    description: "",
                    imageUrl: "",
                  }
            }
            onClose={() => setModalState({ open: false })}
            onSuccess={() => {
              setModalState({ open: false });
              loadRegions();
            }}
          />
        )}
      </Modal>
    </div>
  );
}
