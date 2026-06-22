import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      const fullUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { roles: true },
      });

			const roles = fullUser?.roles.map((r) => r.name) ?? [];
			
      session.user.roles = roles;

      return session;
    },
  },
});
