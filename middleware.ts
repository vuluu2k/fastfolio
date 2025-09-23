import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protect specific routes by redirecting unauthenticated users to /signin
const protectedRoutes = [
  "/dashboard",
];

export default auth(async (req: NextRequest) => {
  const { nextUrl } = req;
  const isProtected = protectedRoutes.some((base) =>
    nextUrl.pathname.startsWith(base)
  );

  const isAuthed = Boolean((req as unknown as { auth?: unknown }).auth);

  if (isProtected && !isAuthed) {
    const signInUrl = new URL("/signin", nextUrl);
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
  ],
};
