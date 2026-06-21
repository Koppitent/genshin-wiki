import { ArtifactSetFull } from "@/lib/artifactsets/artifactsetServiceClient";

type Props = {
	artifactSet: ArtifactSetFull;
	showFullName?: boolean;
}

export default function ArtifactIcon({ artifactSet, showFullName }: Props) {
	return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <div className="relative w-[5rem] h-[5rem] hover:scale-105 transition-transform duration-200">
        <img
          src={artifactSet.imageUrl}
          alt={artifactSet.name}
          className={`w-full h-full object-cover rounded-md rarity-${artifactSet.rarity}`}
        />
      </div>
      <p className="font-bold text-lg text-center mt-2">
        {showFullName
          ? artifactSet.name
          : artifactSet.name.length > 10
          ? artifactSet.name.slice(0, 7) + "..."
          : artifactSet.name}
      </p>
    </div>
  );
}
