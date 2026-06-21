import { Region } from "@/app/generated/prisma/client";

export async function getRegion(id: string) {
	const res = await fetch(`/api/regions/${id}`, {
		method: "GET",
	});
	return res.json();
}

export async function getRegions() {
	const res = await fetch("/api/regions", {
		method: "GET",
	});
	return res.json();
}

export async function deleteRegion(id: string) {
	const res = await fetch(`/api/regions/${id}`, {
		method: "DELETE",
	});
	if (!res.ok) {
		return { success: false, message: "Fehler beim Löschen der Region." };
	} else {
		return { success: true, message: "Region erfolgreich gelöscht." };
	}
}

export async function createRegion(region: Omit<Region, "id">) {
	return fetch("/api/regions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(region),
	});
}

export async function updateRegion(region: Region) {
	return fetch("/api/regions", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(region),
	});
}
