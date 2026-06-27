"use client";

import { useEffect, useState } from "react";

type Props = {
  imageUrl: string;
  title?: string;
  bucket?: string;
  onImageUrlChange?: (url: string) => void;
};

export default function ImageUpload({
  imageUrl,
  title,
  bucket = "characters",
  onImageUrlChange,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  async function loadImages() {
    const res = await fetch(`/api/upload?bucket=${bucket}`);
    const data = await res.json();
		if(!data.images) {
			setImages([]);
			return;
		}
    setImages(data.images);
  }

  useEffect(() => {
    loadImages();
  }, [bucket]);

  async function handleImageUpload(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/upload?bucket=${bucket}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Upload failed");
      setUploading(false);
      return;
    }

    const data = await res.json();

    onImageUrlChange?.(data.imageUrl);

    await loadImages();

    setUploading(false);
  }

  // 🔎 filter images by search
  const filteredImages = images.filter((img) =>
    img.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-2 border p-2">
      {title && <label className="text-sm">{title}</label>}

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
      />

      {/* Open library */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm underline"
      >
        Choose from library
      </button>

      {/* Library */}
      {open && (
        <div className="mt-2 border rounded p-2">
          {/* Search */}
          <input
            type="text"
            placeholder="Search image..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-2 p-1 border rounded text-sm"
          />

          {/* Scrollable grid */}
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {filteredImages.map((img) => (
              <img
                key={img}
                src={img}
                className="w-20 h-20 object-cover border rounded cursor-pointer hover:opacity-70"
                onClick={() => {
                  onImageUrlChange?.(img);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-md border"
        />
      )}

      {uploading && <p>Uploading...</p>}
    </div>
  );
}
