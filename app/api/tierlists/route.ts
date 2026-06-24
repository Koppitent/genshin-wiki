import { withErrorHandler } from "@/lib/api/errorHandler";
import { CreateTierListSchema, UpdateTierListSchema } from "@/lib/tierlists/tierlist.schema";
import {
  createTierListService,
  getTierListsByProfileIdService,
	updateTierListService,
} from "@/lib/tierlists/tierlistService";

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json();

  const data = CreateTierListSchema.parse(body);

  const result = await createTierListService(data);

  return Response.json(result);
});

export const PUT = withErrorHandler(async (request: Request) => {
  const body = await request.json();

  const data = UpdateTierListSchema.parse(body);

  const result = await updateTierListService(data);

  return Response.json(result);
});

export const GET = withErrorHandler(async (request: Request) => {
  return Response.json(await getTierListsByProfileIdService());
});