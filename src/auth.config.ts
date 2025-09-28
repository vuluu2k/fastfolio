import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authConfig = {
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
    async session({ session, user }: { session: any; user: any }) {
      return { ...session, user };
    },
  },
};

