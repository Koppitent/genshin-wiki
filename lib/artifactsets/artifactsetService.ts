import prisma from "@/lib/prisma";

export async function getArtifactSetsService() {
  return prisma.artifactSet.findMany({
		include: {
			artifacts: true,
		},
    orderBy: {
      name: "asc",
    },
  });
}

export async function createArtifactSetService(body: any) {
  if (!body.name) {
    throw new Error("Name is required");
  }

  const artifactSet = await prisma.artifactSet.create({
    data: {
      name: body.name,
      rarity: body.rarity,
      setBonusDescription2: body.setBonusDescription2,
      setBonusDescription4: body.setBonusDescription4,
      imageUrl: body.imageUrl,
    },
  });

  for (const artifact of body.artifacts) {
    try {
      if (artifact.id) {
        await prisma.artifactSet.update({
          where: { id: artifactSet.id },
          data: {
            artifacts: {
              connect: { id: artifact.id },
            },
          },
        });
      } else {
        await prisma.artifact.create({
          data: {
            name: artifact.name,
            description: artifact.description,
            rarity: artifact.rarity,
            imageUrl: artifact.imageUrl,
            artifactSet: {
              connect: { id: artifactSet.id },
            },
          },
        });
      }
    } catch (error) {
      console.error(`Failed artifact ${artifact.name}`, error);
    }
  }

  return artifactSet;
}

export async function updateArtifactSetService(body: any) {
  if (!body.name) {
    throw new Error("Name is required");
  }

  if (!body.id) {
    throw new Error("Missing id for update");
  }

  const artifactSet = await prisma.$transaction([
    prisma.artifactSet.update({
      where: { id: body.id },
      data: {
        name: body.name,
        rarity: body.rarity,
        setBonusDescription2: body.setBonusDescription2,
        setBonusDescription4: body.setBonusDescription4,
        imageUrl: body.imageUrl,
      },
    }),

    prisma.artifactSet.update({
      where: { id: body.id },
      data: {
        artifacts: {
          disconnect: body.existingArtifactIds.map((id: string) => ({ id })),
          connect: body.artifactIds.map((id: string) => ({ id })),
        },
      },
    }),
  ]);

  return artifactSet;
}

export async function deleteArtifactSetService(id: string) {
  return prisma.artifactSet.delete({
    where: { id },
  });
}
