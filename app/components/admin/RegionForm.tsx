"use client";

import { useState } from "react";
import ImageUpload from "../ImageUpload";
import TextAreaInput from "../TextAreaInput";
import { createRegion, updateRegion } from "@/lib/regions/regionServiceClient";
import { Region } from "@/app/generated/prisma/client";

type Props = {
  mode: "create" | "edit";
  region: Region;
  onClose: () => void;
  onSuccess: () => void;
};

export default function RegionForm({
  mode,
  region,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState(region);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		if(form.name.trim() === "") {
			alert("Name darf nicht leer sein!");
			return;
		}

		if (form.imageUrl === undefined || form.imageUrl.trim() === "") {
      alert("Bild ist erforderlich!");
      return;
    }

    setLoading(true);


		const res = (mode === "edit") ? await updateRegion(form) : await createRegion(form);

    setLoading(false);

    if (res.ok) {
      onSuccess();
    } else {
      alert("Fehler beim Speichern der Region!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* NAME */}
      <input
        name="name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
        className="border p-2 rounded"
      />

      {/* DESCRIPTION */}
			<TextAreaInput 
			inputString={form.description}
			onChange={(newDescription) => setForm((prev) => ({ ...prev, description: newDescription }))}
			/>

      {/* IMAGE UPLOAD */}
			<ImageUpload 
			imageUrl={form.imageUrl}
			onImageUrlChange={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
			/>

      {/* PREVIEW */}
      {form.imageUrl && (
        <img
          src={form.imageUrl}
          alt="preview"
          className="w-full h-40 object-cover rounded border"
        />
      )}

      {/* ACTIONS */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {mode === "create" ? "Erstellen" : "Speichern"}
      </button>
    </form>
  );
}