import "next-auth";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      profileId: string;
      roles: string[];
      tokenVersion: number;
    };
  }

  interface User {
    id: string;
    profileId: string;
    roles: string[];
    tokenVersion: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
		profileId: string;
    roles: string[];
    tokenVersion: number;
  }
}
