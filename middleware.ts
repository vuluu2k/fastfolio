import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define protected route prefixes
const protectedRoutes = ["/dashboard"];

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const isProtected = protectedRoutes.some((base) =>
      nextUrl.pathname.startsWith(base)
    );

    // req.nextauth.token is available in withAuth
    const isAuthed = Boolean((req as any).nextauth?.token);

    if (isProtected && !isAuthed) {
      const signInUrl = new URL("/signin", nextUrl);
      signInUrl.searchParams.set(
        "callbackUrl",
        nextUrl.pathname + nextUrl.search,
      );
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // we handle redirects manually above
    },
  },
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
  ],
};
