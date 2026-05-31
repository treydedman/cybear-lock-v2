import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/new-entry", "/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Just check token exists and is a valid JWT shape
  // Full verification happens in API routes
  const parts = token.split(".");
  if (parts.length !== 3) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/new-entry/:path*", "/profile/:path*"],
};
