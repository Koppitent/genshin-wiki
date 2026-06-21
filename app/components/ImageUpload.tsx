"use client";

import { useState } from "react";

type Props = {
	imageUrl: string;
	title?: string;
	onImageUrlChange?: (url: string) => void;
};

export default function ImageUpload({ imageUrl, title, onImageUrlChange }: Props) {
	const [uploading, setUploading] = useState(false);

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

    onImageUrlChange?.(data.imageUrl);
    setUploading(false);
  }
	
	return (
    <div className="flex flex-col gap-2 border p-2">
      {title && <label className="text-sm">{title}</label>}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
      />

      {uploading && <p>Uploading...</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-md border"
        />
      )}
    </div>
  );
}