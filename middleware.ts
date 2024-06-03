import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/auth";

const AUTH_PAGES = ["/login"];
const PROTECT_PAGES = ["/admin"];
const UNPROTECT_PAGES = ["/"];

const isAuthPages = (url: string) =>
  AUTH_PAGES.some((page) => url.startsWith(page));

const isProtectedPages = (url: string) =>
  PROTECT_PAGES.some((page) => url.startsWith(page));

const isUnprotectedPages = (url: string) =>
  UNPROTECT_PAGES.some((page) => url === page);

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const token = cookies.get("token")?.value ?? null;

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);
  const isProtectedPageRequested = isProtectedPages(nextUrl.pathname);
  const isUnprotectedPageRequested = isUnprotectedPages(nextUrl.pathname);

  if (isProtectedPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.redirect(new URL("/login", url));
      response.cookies.delete("token");
      return response;
    }
    const response = NextResponse.next();
    return response;
  }

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    const response = NextResponse.redirect(new URL(`/admin`, url));
    return response;
  }

  if (isUnprotectedPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = { matcher: ["/login", "/", "/admin/:path*"] };
