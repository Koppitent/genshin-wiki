"use client";

import { useRouter } from "next/navigation";
import { ArtifactSetFull } from "./ArtifactSetsClient";
import { SyntheticEvent, useState } from "react";
import ImageUpload from "../ImageUpload";
import TextAreaInput from "../TextAreaInput";
import { createArtifactSet, updateArtifactSet } from "@/lib/artifactsets/artifactsetServiceClient";

type Props = {
	mode: "create" | "edit";
	artifactSetProp?: ArtifactSetFull;
	onSuccess?: () => void;
	onClose?: () => void;
};

export default function ArtifactsForm({ mode, artifactSetProp, onSuccess, onClose }: Props) {
	const router = useRouter();
	const emptyArtifactSet: ArtifactSetFull = {
		id: "",
		name: "",
		rarity: 5,
		setBonusDescription2: "",
		setBonusDescription4: "",
		imageUrl: "",
		artifacts: [],
	};
	const [artifactSet, setArtifactSet] = useState<ArtifactSetFull>(
    artifactSetProp || emptyArtifactSet,
  );

	async function create() {
		const res = await createArtifactSet(artifactSet);

		if (!res.ok) {
			throw new Error("Failed to create artifact set");
		}

		return res.json();
	}

	async function update() {
		const res = await updateArtifactSet(artifactSet);

		if (!res.ok) {
			throw new Error("Failed to update artifact set");
		}

		return res.json();
	}

	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if(artifactSet.name.trim() === "" || artifactSet.rarity === 0) {
			alert("Name und Seltenheit sind erforderlich!");
			return;
		}

		if(artifactSet.rarity < 3 || artifactSet.rarity > 5) {
			alert("Seltenheit muss zwischen 3 und 5 liegen!");
			return;
		}

		if (mode === "create") {
			await create();
		} else {
			await update();
		}

		onSuccess?.();
		onClose?.();
		router.refresh();
		console.log("created successfully");	
	}

	return (
    <div>
      <h2 className="text-xl mb-4">Artifact Set erstellen</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Name"
          className="border p-2"
          value={artifactSet.name}
          onChange={(e) =>
            setArtifactSet({ ...artifactSet, name: e.target.value })
          }
        />

				<TextAreaInput 
					inputString={artifactSet.setBonusDescription2}
					placeholder="Beschreibung für 2 Teile"
					onChange={(newValue) =>
						setArtifactSet({ ...artifactSet, setBonusDescription2: newValue })
					}
				/>

				<TextAreaInput 
					inputString={artifactSet.setBonusDescription4}
					placeholder="Beschreibung für 4 Teile"
					onChange={(newValue) =>
						setArtifactSet({ ...artifactSet, setBonusDescription4: newValue })
					}
				/>

        <ImageUpload
          imageUrl={artifactSet.imageUrl}
          title="Artifact Image"
          onImageUrlChange={(url) =>
            setArtifactSet({ ...artifactSet, imageUrl: url })
          }
        />

        <select
          className="border p-2"
          value={artifactSet.rarity}
          onChange={(e) =>
            setArtifactSet({
              ...artifactSet,
              rarity: parseInt(e.target.value) || 5,
            })
          }
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600"
        >
          Speichern
        </button>
      </form>
    </div>
  );
}