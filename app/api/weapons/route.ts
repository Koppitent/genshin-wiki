import { withErrorHandler } from "@/lib/api/errorHandler";
import { createWeaponService, deleteWeaponService, getWeaponsService, updateWeaponService } from "@/lib/weapons/weaponService";

export const POST = withErrorHandler(async (request: Request) => {
	const body = await request.json();
  return Response.json(await createWeaponService(body));
});

export const PUT = withErrorHandler(async (request: Request) => {
  const body = await request.json();
  return Response.json(await updateWeaponService(body));
});

export const DELETE = withErrorHandler(async (req: Request) => {
	const body = await req.json();
	if (!body.id) {
    throw new Error("Missing id for update");
  }
	return Response.json(await deleteWeaponService(body.id));
});

export async function GET() {
	return Response.json(await getWeaponsService());
}
