import { auth } from "@/auth";
import { ForbiddenError, UnauthorizedError } from "../api/errors";

export async function requireAuth() {
  const session = await auth();

  if (!session) {
    throw new UnauthorizedError("Unauthorized");
  }

  return session;
}

export async function requireRole(role: string) {
  const session = await auth();

  if (!session) {
    throw new UnauthorizedError("Unauthorized");
  }

  if (!session.user.roles.includes(role.toLocaleUpperCase())) {
    throw new ForbiddenError("Forbidden");
  }

  return session;
}

export async function requireAdmin() {
	return requireRole("ADMIN");
}

export async function requireOwner(id: string) {
  const session = await requireAuth();
	if (!session) {
    throw new UnauthorizedError("Unauthorized");
  }
  if (session.user.id !== id) {
    throw new ForbiddenError("Forbidden");
  }
  return session;
}
