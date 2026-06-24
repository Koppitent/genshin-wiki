import prisma from "@/lib/prisma";
import { requireAdmin, requireAuth } from "@/lib/auth/authService";
import { BadRequestError, ForbiddenError } from "../api/errors";
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

  if (tierListData.visibility === "OFFICIAL") {
    await requireAdmin(session);

    const existingOfficial = await prisma.tierList.findFirst({
      where: {
        visibility: "OFFICIAL",
      },
    });

    if (existingOfficial) {
      throw new BadRequestError("An official tier list already exists");
    }
  }

  const userTierListCount = await prisma.tierList.count({
    where: {
      profileId: session.user.profileId,
    },
  });

  const MAX_USER_TIERLISTS = 5;

  if (userTierListCount >= MAX_USER_TIERLISTS) {
    throw new BadRequestError("Tier list limit reached");
  }

  return prisma.tierList.create({
    include: {
      entries: true,
    },
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

  if (tierListData.visibility === "OFFICIAL") {
    await requireAdmin(session);
  }

	console.log("OFFICIAL TIER LIST");
	
  const tierList = await prisma.tierList.findFirst({
    where: {
      id: tierListData.id,
      profileId: session.user.profileId,
    },
  });

  if (!tierList) {
    throw new Error("Not allowed or not found");
  }

	const entriesUpdate = tierListData.entries
    ? {
        deleteMany: {},
        create: tierListData.entries.map((e) => ({
          characterId: e.characterId,
          tier: e.tier,
          position: e.position,
        })),
      }
    : undefined;

  const result = await prisma.tierList.update({
    where: { id: tierList.id },
    data: {
      title: tierListData.title,
      ...(entriesUpdate && { entries: entriesUpdate }),
    },
		include: {
			entries: true,
		},
  });

	return result;
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

export async function getTierListOfficialService() {
  return prisma.tierList.findFirst({
    where: {
      visibility: "OFFICIAL",
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
