import { Prisma } from "@/app/generated/prisma/client";

export type WeaponFull = Prisma.WeaponGetPayload<{
  include: {
    weaponType: true;
  };
}>;

export async function getWeapon(id: string) {
  const res = await fetch(`/api/weapons/${id}`, {
    method: "GET",
  });
  return res.json();
}

export async function getWeapons() {
  const res = await fetch("/api/weapons", {
    method: "GET",
  });
  return res.json();
}

export async function deleteWeapon(id: string) {
  const res = await fetch(`/api/weapons/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    return { success: false, message: "Fehler beim Löschen der Waffe." };
  } else {
    return { success: true, message: "Waffe erfolgreich gelöscht." };
  }
}

export async function createWeapon(weapon: WeaponFull) {
	return fetch("/api/weapons", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(weapon),
	});
}

export async function updateWeapon(weapon: WeaponFull) {
	return fetch("/api/weapons", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(weapon),
	});
}