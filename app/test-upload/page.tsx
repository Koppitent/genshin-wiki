"use client";

import { useState } from "react";

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button
        onClick={upload}
        className="ml-2 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Upload
      </button>
    </div>
  );
}
