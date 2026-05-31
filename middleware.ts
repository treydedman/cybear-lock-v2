import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET ?? "";
console.log("secret length:", secret.length);

const protectedRoutes = ["/dashboard", "/new-entry", "/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("middleware cookies:", req.cookies.getAll());
  console.log("pathname:", pathname);

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  console.log("token found:", !!token);
  console.log("secret available:", !!secret);
  console.log("secret length:", secret.length);

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/new-entry/:path*", "/profile/:path*"],
};
