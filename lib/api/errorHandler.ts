import { NextRequest } from "next/server";
import { MyErrors } from "./errors";

export function handleException(e: unknown): Response {
  if (e instanceof MyErrors) {
    return Response.json({ message: e.message }, { status: e.status });
  }

  console.error("Unhandled error:", e);

  return Response.json({ message: "Internal Server Error" }, { status: 500 });
}

type AnyRequest = Request | NextRequest;
export function withErrorHandler<T extends AnyRequest>(handler: (req: T) => Promise<Response>) {
  return async (req: T) => {
    try {
      return await handler(req);
    } catch (e) {
      return handleException(e);
    }
  };
}
