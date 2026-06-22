import prisma from "@/lib/prisma";
import { requireAdmin } from "../auth/authService";

export function getRegionsService() {
  return prisma.region.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export function getRegionService(id: string) {
  return prisma.region.findUnique({
    where: {
      id,
    },
  });
}

export async function createRegionService(body: any) {
	await requireAdmin();
	return prisma.region.create({
    data: {
      name: body.name,
			imageUrl: body.imageUrl,
			description: body.description,
    },
  });
}

export async function updateRegionService(body: any) {
	await requireAdmin();
	return prisma.region.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      description: body.description,
      imageUrl: body.imageUrl,
    },
  });
}

export async function deleteRegionService(id: string) {
	await requireAdmin();
	return prisma.region.delete({
		where: {
			id,
		},
	});
}