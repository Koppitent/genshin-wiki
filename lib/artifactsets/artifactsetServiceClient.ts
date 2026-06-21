import { Prisma } from "@/app/generated/prisma/client";

export type ArtifactSetFull = Prisma.ArtifactSetGetPayload<{
  include: {
    artifacts: true;
  };
}>;

export async function getArtifactSet(id: string) {
  const res = await fetch(`/api/artifactsets/${id}`, {
    method: "GET",
  });
  return res.json();
}

export async function getArtifactSets() {
  const res = await fetch("/api/artifactsets", {
    method: "GET",
  });
  return res.json();
}

export async function deleteArtifactSet(id: string) {
	const res = await fetch(`/api/artifactsets/${id}`, {
		method: "DELETE",
	});
	if(!res.ok) {
		return { success: false, message: "Fehler beim Löschen des Artefaktsets." };
	}else {
		return { success: true, message: "Artefaktset erfolgreich gelöscht." };
	}
}

export async function createArtifactSet(artifactSet: ArtifactSetFull) {
	return fetch("/api/artifactsets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(artifactSet),
	});
}

export async function updateArtifactSet(artifactSet: ArtifactSetFull) {
  return fetch("/api/artifactsets", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artifactSet),
  });
}
