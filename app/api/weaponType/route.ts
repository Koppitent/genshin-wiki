import { withErrorHandler } from "@/lib/api/errorHandler";
import { createWeaponTypeService, deleteWeaponTypeService, getWeaponTypesService, updateWeaponTypeService } from "@/lib/weapontypes/weapontypeService";

export async function GET() {
  return Response.json(await getWeaponTypesService());
}

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();

  if (!body.name) {
    return Response.json(
      {
        error: "Name is required",
      },
      {
        status: 400,
      },
    );
  }
  return Response.json(await createWeaponTypeService(body));
});

export const PUT = withErrorHandler(async (req: Request) => {
  const body = await req.json();

  if (!body.name) {
    return Response.json(
      {
        error: "Name is required",
      },
      {
        status: 400,
      },
    );
  }
	
	if (!body.id) {
    throw new Error("Missing id for update");
  }

  return Response.json(await updateWeaponTypeService(body));
});
