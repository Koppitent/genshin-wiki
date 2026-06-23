import { withErrorHandler } from "@/lib/api/errorHandler";
import { CreateTierListSchema } from "@/lib/tierlists/tierlist.schema";
import { createTierListService, getTierListsByProfileIdService, getTierListService } from "@/lib/tierlists/tierlistService";

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json();

  const data = CreateTierListSchema.parse(body);

  const result = await createTierListService(data);

  return Response.json(result);
});

export const GET = withErrorHandler(async (request: Request) => {
	return Response.json(await getTierListsByProfileIdService());
});