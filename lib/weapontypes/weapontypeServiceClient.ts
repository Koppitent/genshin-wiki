import { WeaponType } from "@/app/generated/prisma/client";

export async function getWeaponType(id: string) {
  const res = await fetch(`/api/weaponType/${id}`, {
    method: "GET",
  });
  return res.json();
}

export async function getWeaponTypes() {
  const res = await fetch("/api/weaponType", {
    method: "GET",
  });
  return res.json();
}

export async function deleteWeaponType(id: string) {
  const res = await fetch(`/api/weaponType/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    return { success: false, message: "Fehler beim Löschen der Waffenart." };
  } else {
    return { success: true, message: "Waffenart erfolgreich gelöscht." };
  }
}

export async function createWeaponType(weaponType: Omit<WeaponType, "id">) {
  return fetch("/api/weaponType", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(weaponType),
  });
}

export async function updateWeaponType(weaponType: WeaponType) {
  return fetch("/api/weaponType", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(weaponType),
  });
}
