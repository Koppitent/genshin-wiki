import { requireAdmin } from "../auth/authService";
import prisma from "../prisma";

export async function deleteWeaponService(id: string) {
	await requireAdmin();
  await prisma.weapon.delete({
    where: {
      id,
    },
  });
  return {
    success: true,
  };
}

export async function createWeaponService(body: any) {
	await requireAdmin();
	return prisma.weapon.create({
    data: {
      name: body.name,
      description: body.description,
      weaponType: {
        connect: {
          id: body.weaponTypeId,
        },
      },
      imageUrl: body.imageUrl,
      rarity: Number(body.rarity),
      baseAttack: Number(body.baseAttack),
    },
  });
}

export async function updateWeaponService(body: any) {
	await requireAdmin();
	return prisma.weapon.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      description: body.description,
      weaponType: {
        connect: {
          id: body.weaponTypeId,
        },
      },
      imageUrl: body.imageUrl,
      rarity: Number(body.rarity),
      baseAttack: Number(body.baseAttack),
    },
  });
}

export function getWeaponService(id: string) {
	return prisma.weapon.findUnique({
		where: {
			id,	
		},
		include: {
			weaponType: true,
		},
	});
}

export function getWeaponsService() {
  return prisma.weapon.findMany({
    include: {
      weaponType: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}