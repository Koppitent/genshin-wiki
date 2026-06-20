"use client";

import { useState } from "react";

type Props = {
  mode: "create" | "edit";
  region: {
    id?: string;
    name: string;
    description: string;
    imageUrl: string;
  };
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
  const [uploading, setUploading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Upload failed");
      setUploading(false);
      return;
    }

    const data = await res.json();

    setForm((prev) => ({
      ...prev,
      imageUrl: data.imageUrl,
    }));
    setUploading(false);
  }

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

    const res = await fetch("/api/regions", {
      method: mode === "create" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      onSuccess();
    } else {
      alert("Fehler beim Speichern");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* NAME */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 rounded"
      />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Beschreibung"
        className="border p-2 rounded"
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
      />

      {uploading && (
        <p className="text-sm text-gray-400">Bild wird hochgeladen...</p>
      )}

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
        disabled={loading || uploading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {mode === "create" ? "Erstellen" : "Speichern"}
      </button>
    </form>
  );
}