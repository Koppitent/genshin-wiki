import prisma from "../prisma";

export async function getWeaponsService() {
  return prisma.weapon.findMany({
    include: {
      weaponType: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}