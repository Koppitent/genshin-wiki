-- CreateTable
CREATE TABLE "ArtifactSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "setBonusDescription4" TEXT NOT NULL,
    "setBonusDescription2" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "ArtifactSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artifact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "artifactSetId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_artifactSetId_fkey" FOREIGN KEY ("artifactSetId") REFERENCES "ArtifactSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
