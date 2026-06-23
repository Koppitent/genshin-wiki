import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const profile = await prisma.userProfile.findUnique({
          where: { userId: user.id },
          include: { roles: true },
        });

        if (!profile) {
          throw new Error("UserProfile missing for userId " + token.id);
        }

        token.id = user.id;
        token.profileId = profile.id;
        token.roles = profile.roles.map((r) => r.name.toUpperCase()) ?? [];
        token.tokenVersion = profile.tokenVersion;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.profileId = token.profileId;
      session.user.roles = token.roles;
      session.user.tokenVersion = token.tokenVersion;

      return session;
    },
  },

  events: {
    async createUser({ user }) {
      await prisma.userProfile.create({
        data: {
          userId: user.id,
          roles: {
            connect: { name: "USER" },
          },
        },
      });
    },
  },
});
