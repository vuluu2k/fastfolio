import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
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
    Credentials({
      name: "Email OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Code", type: "text" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email?.toLowerCase().trim();
          const code = credentials?.code?.trim();
          const name = credentials?.name?.trim();

          if (!email || !code) return null;

          // Find matching verification token
          const vt = await prisma.verificationToken.findUnique({
            where: { token: code },
          });

          if (!vt || vt.identifier.toLowerCase() !== email) {
            return null;
          }

          if (vt.expires < new Date()) {
            // Cleanup expired token
            await prisma.verificationToken.delete({
              where: { token: vt.token },
            });
            return null;
          }

          // Upsert user by email
          const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: { email, name },
          });

          // Consume token so it cannot be reused
          await prisma.verificationToken.delete({ where: { token: vt.token } });

          return user;
        } catch {
          return null;
        }
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

