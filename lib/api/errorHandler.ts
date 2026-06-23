import { MyErrors } from "./errors";

export function handleException(e: unknown): Response {
  if (e instanceof MyErrors) {
    return Response.json({ message: e.message }, { status: e.status });
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
