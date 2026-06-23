import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/authService";
import { ForbiddenError } from "../api/errors";
import { CreateTierListInput, UpdateTierListInput } from "./tierlist.schema";

export async function deleteTierlistService(tierListId: string) {
  const session = await requireAuth();

  const result = await prisma.tierList.deleteMany({
    where: {
      id: tierListId,
      profileId: session.user.profileId,
    },
  });

  if (result.count === 0) {
    throw new ForbiddenError("Forbidden or not found");
  }

  return { success: true };
}

export async function createTierListService(tierListData: CreateTierListInput) {
  const session = await requireAuth();

  return prisma.tierList.create({
    data: {
      title: tierListData.title,
      visibility: tierListData.visibility,
      profileId: session.user.profileId,
      entries: {
        create: tierListData.entries.map((entry) => ({
          characterId: entry.characterId,
          tier: entry.tier,
          position: entry.position,
        })),
      },
    },
  });
}

export async function updateTierListService(tierListData: UpdateTierListInput) {
  const session = await requireAuth();

  return prisma.tierList.update({
    where: {
      id: tierListData.id,
      profileId: session.user.profileId,
    },
    data: {
      title: tierListData.title,
      visibility: tierListData.visibility,
      entries: {
        create: tierListData.entries?.map((entry) => ({
          characterId: entry.characterId,
          tier: entry.tier,
          position: entry.position,
        })),
      },
    },
  });
}

export async function getTierListsByProfileIdService() {
	const session = await requireAuth();
	return prisma.tierList.findMany({
		where: {
			profileId: session.user.profileId,
		},
		include: {
			entries: true,
		},
	});
}

export async function getTierListService(tierListId: string) {
	const session = await requireAuth();
  return prisma.tierList.findFirst({
    where: {
      id: tierListId,
      profileId: session.user.profileId,
    },
    include: {
      entries: true,
    },
  });
}
