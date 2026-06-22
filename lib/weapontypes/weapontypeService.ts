import prisma from "@/lib/prisma";
import { requireAdmin } from "../auth/authService";

export function getWeaponTypesService() {
	return prisma.weaponType.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function createWeaponTypeService(body: any) {
	await requireAdmin();
	return prisma.weaponType.create({
    data: {
      name: body.name,
    },
  });
}

export async function updateWeaponTypeService(body: any) {
	await requireAdmin();
	return prisma.weaponType.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
    },
  });
}

export async function deleteWeaponTypeService(id: string) {
	await requireAdmin();
	await prisma.weaponType.delete({
    where: {
      id,
    },
  });
  return {
    success: true,
  };
}
