import { Prisma } from "@/app/generated/prisma/client";

export type CharacterFull = Prisma.CharacterGetPayload<{
	include: {
		region: true;
		weaponType: true;
	};
}>;

export async function getCharacter(id: string) {
	const res = await fetch(`/api/characters/${id}`, {
		method: "GET",
	});
	return res.json();
}

export async function getCharacters(): Promise<CharacterFull[]> {
	const res = await fetch("/api/characters", {
		method: "GET",
	});
	return res.json();
}

export async function deleteCharacter(id: string) {
	const res = await fetch(`/api/characters/${id}`, {
		method: "DELETE",
	});
	if (!res.ok) {
		return { success: false, message: "Fehler beim Löschen des Charakters." };
	} else {
		return { success: true, message: "Charakter erfolgreich gelöscht." };
	}
}

export async function createCharacter(character: CharacterFull) {
	return fetch("/api/characters", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(character),
	});
}

export async function updateCharacter(character: CharacterFull) {
	return fetch("/api/characters", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(character),
	});
}