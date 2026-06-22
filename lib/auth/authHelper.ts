import { Session } from "next-auth";

export function hasRole(session: Session | null, role: string) {
  return !!session?.user?.roles?.includes(role);
}
