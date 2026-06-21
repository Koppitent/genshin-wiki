import { getArtifactSetsService } from "@/lib/artifactsets/artifactsetService";
import ArtifactSetsClientPage from "../components/artifacts/ArtifactSetsClient";

export default async function ArtifactPage() {
	const artifactSets = await getArtifactSetsService();
	return (
		<>
			<ArtifactSetsClientPage artifactSets={artifactSets} />
		</>
	);
}