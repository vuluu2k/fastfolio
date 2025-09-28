import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected route prefixes
const protectedRoutes = ["/dashboard", "/analytics", "/publish", "/portfolio"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { nextUrl } = req;
  const path: string = nextUrl.pathname;
  const isProtected = protectedRoutes.some((base) => path.startsWith(base));

  if (isProtected && !token) {
    const signInUrl = new URL("/signin", nextUrl);
    signInUrl.searchParams.set("callbackUrl", path + nextUrl.search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
    "/dashboard",
    "/analytics",
    "/publish",
    "/portfolio",
  ],
};
