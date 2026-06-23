import { Session } from "next-auth";

export function hasRole(session: Session | null, role: string) {
  if (!session?.user?.roles) return false;
  const target = role.toUpperCase();
  return session.user.roles.some((r) => r === target);
}
