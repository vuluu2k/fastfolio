import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "password",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        // Access passwordHash using a safe cast until Prisma types regenerate
        const passwordHash = (user as any)?.passwordHash as string | undefined;
        if (!user || !passwordHash) return null;
        if (!user.emailVerified) return null;

        const valid = await bcrypt.compare(password, passwordHash);
        if (!valid) return null;
        return user;
      },
    }),
    Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID ?? ""),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET ?? ""),
      authorization: {
        params: {
          // Ask Google for a refresh_token
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: String(process.env.GITHUB_ID ?? ""),
      clientSecret: String(process.env.GITHUB_SECRET ?? ""),
      authorization: {
        params: {
          // Request standard scopes; offline_access may require org settings enabled
          scope: "read:user user:email offline_access",
        },
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    // You can also customize error/newUser etc if needed
  },
  // Callbacks where you can persist additional data on the token/session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as any).id ?? token.sub;
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        token.picture = (user as any).image ?? token.picture;
      }

      if (token?.sub || token?.email) {
        const safeUser = await prisma.user.findFirst({
          where: {
            OR: [
              token.sub ? { id: token.sub as string } : undefined,
              token.email ? { email: token.email as string } : undefined,
            ].filter(Boolean) as any,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
          },
        });

        if (safeUser) {
          token.sub = safeUser.id;
          token.name = safeUser.name ?? token.name;
          token.email = safeUser.email ?? token.email;
          token.picture = safeUser.image ?? token.picture;
        }
      }

      return token;
    },

    async session({ session, token }) {
      const id = (token as any)?.sub as string | undefined;
      const email = token?.email as string | undefined;

      if (id || email) {
        const safeUser = await prisma.user.findFirst({
          where: {
            OR: [
              id ? { id } : undefined,
              email ? { email } : undefined,
            ].filter(Boolean) as any,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
          },
        });

        if (safeUser) {
          (session as any).user = safeUser;
          return session;
        }
      }

      // Fallback: map minimal fields from token
      (session as any).user = {
        id: id,
        name: token?.name as string | undefined,
        email: token?.email as string | undefined,
        image: (token as any)?.picture ?? null,
      } as any;
      return session;
    },
  },
};
