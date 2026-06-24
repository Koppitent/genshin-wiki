import { withErrorHandler } from "@/lib/api/errorHandler";
import { getTierListOfficialService } from "@/lib/tierlists/tierlistService";

export const GET = withErrorHandler(async (request: Request) => {
	return Response.json(await getTierListOfficialService());
});