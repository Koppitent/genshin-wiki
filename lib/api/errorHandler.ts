import { ForbiddenError, UnauthorizedError } from "./errors";

export function handleException(e: unknown): Response {
  if (e instanceof ForbiddenError) {
    return Response.json({ message: e.message }, { status: 403 });
  }

  if (e instanceof UnauthorizedError) {
    return Response.json({ message: e.message }, { status: 401 });
  }

  console.error("Unhandled error:", e);

  return Response.json({ message: "Internal Server Error" }, { status: 500 });
}

export function withErrorHandler(handler: (req: Request) => Promise<Response>) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (e) {
      return handleException(e);
    }
  };
}
