import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
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
