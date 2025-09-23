import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const authConfig = {
  providers: [
    Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID ?? ""),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET ?? ""),
    }),
    GitHub({
      clientId: String(process.env.GITHUB_ID ?? ""),
      clientSecret: String(process.env.GITHUB_SECRET ?? ""),
    }),
  ],
  pages: {
    signIn: "/signin",
    // You can also customize error/newUser etc if needed
  },
  // Callbacks where you can persist additional data on the token/session
  callbacks: {
    async session({ session }: { session: any }) {
      return session;
    },
  },
};
