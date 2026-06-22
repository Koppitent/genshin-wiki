import { handleException } from "@/lib/api/errorHandler";
import { deleteRegionService } from "@/lib/regions/regionService";

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	try {
		return Response.json(await deleteRegionService(id));
	} catch (e) {
		return await handleException(e);
	}
}