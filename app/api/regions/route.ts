import { withErrorHandler } from "@/lib/api/errorHandler";
import { createRegionService, deleteRegionService, getRegionsService, updateRegionService } from "@/lib/regions/regionService";

export async function GET() {
  return Response.json(await getRegionsService());
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
  return Response.json(await createRegionService(body));
});

export const PUT = withErrorHandler(async (req: Request) => {
  const body = await req.json();
  if (!body.name || !body.imageUrl) {
    return Response.json(
      {
        error: "Name and image URL are required",
      },
      {
        status: 400,
      },
    );
  }
  if (!body.id) {
    return Response.json(
      {
        error: "Missing id for update",
      },
      {
        status: 400,
      },
    );
  }
  return Response.json(await updateRegionService(body));
});
