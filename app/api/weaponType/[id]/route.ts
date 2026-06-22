import { handleException } from "@/lib/api/errorHandler";
import { deleteWeaponTypeService } from "@/lib/weapontypes/weapontypeService";

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	try {
		return Response.json(await deleteWeaponTypeService(id));
	} catch (e) {
		return await handleException(e);
	}
}
