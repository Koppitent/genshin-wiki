"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
	mode: "create" | "edit";
	weapon?: WeaponFormType;
	onSuccess?: () => void;
	onClose?: () => void;
};

type WeaponFormType = {
	id?: string;
	name: string;
	description: string;
	rarity: number;
	imageUrl: string;
	weaponTypeId: string | null;
	baseAttack: number;
};

export default function WeaponForm({ mode, weapon: weaponProp, onSuccess, onClose }: Props) {
	const router = useRouter();
	const [weaponTypes, setWeaponTypes] = useState<
		{ id: string; name: string }[]
	>([]);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		loadWeaponTypes();
	}, []);

	async function loadWeaponTypes() {
		const res = await fetch("/api/weaponType");

		if (!res.ok) {
			throw new Error("Failed to load weapon types");
		}

		const data = await res.json();
		setWeaponTypes(data);
	}

	async function createWeapon(weapon: WeaponFormType) {
		console.log("Creating weapon", weapon);
		
		const res = await fetch("/api/weapons", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(weapon),
		});

		if (!res.ok) {
			throw new Error("Failed to create weapon");
		}

		return res.json();
	}

	async function updateWeapon(weapon: WeaponFormType) {
		const res = await fetch("/api/weapons", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(weapon),
		});

		if (!res.ok) {
			throw new Error("Failed to update weapon");
		}

		return res.json();
	}
	
	const [weapon, setWeapon] = useState<WeaponFormType>(
		weaponProp!,
	);

	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if(weapon.name.trim() === "" || weapon.weaponTypeId === null) {
			alert("Name und Waffenart sind erforderlich!");
			return;
		}

		if(weapon.rarity < 3 || weapon.rarity > 5) {
			alert("Seltenheit muss zwischen 3 und 5 liegen!");
			return;
		}

		if (mode === "create") {
			await createWeapon(weapon);
		} else {
			await updateWeapon(weapon);
		}

		onSuccess?.();
		onClose?.();
		router.refresh();
		console.log("created successfully");	
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

		setWeapon((prev) => ({
			...prev,
			imageUrl: data.imageUrl,
		}));
		setUploading(false);
	}

	return (
		<div>
			<h2 className="text-xl mb-4">Weapon erstellen</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<input
					placeholder="Name"
					className="border p-2"
					value={weapon.name}
					onChange={(e) => setWeapon({ ...weapon, name: e.target.value })}
				/>

				<input
					placeholder="Description"
					className="border p-2"
					value={weapon.description}
					onChange={(e) =>
						setWeapon({ ...weapon, description: e.target.value })
					}
				/>

				<select
					className="border p-2"
					value={weapon.weaponTypeId ?? ""}
					onChange={(e) =>
						setWeapon({
							...weapon,
							weaponTypeId: e.target.value || null,
						})
					}
				>
					<option value="">-- Waffenart auswählen --</option>
					{weaponTypes.map((weaponType) => (
						<option key={weaponType.id} value={weaponType.id}>
							{weaponType.name}
						</option>
					))}
				</select>

				<div className="flex flex-col gap-2 border p-2">
					<label className="text-sm">Weapon Image</label>

					<input
						type="file"
						accept="image/*"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) handleImageUpload(file);
						}}
					/>

					{uploading && <p>Uploading...</p>}

					{weapon.imageUrl && (
						<img
							src={weapon.imageUrl}
							alt="Preview"
							className="w-24 h-24 object-cover rounded-md border"
						/>
					)}
				</div>

				<select
					className="border p-2"
					value={weapon.rarity}
					onChange={(e) =>
						setWeapon({
							...weapon,
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
