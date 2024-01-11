import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/pocketbase";

const protectedRoutes = ["/dashboard"];

function isAuthenticated(cookieStore: ReadonlyRequestCookies) {
  try {
    const { authStore } = createServerClient(cookieStore);
    return authStore.isValid;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  console.log(`[middleware] ${request.method} ${request.url}`);

  const cookieStore = cookies();
  const authenticated = await isAuthenticated(cookieStore);

  if (!authenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl.origin).toString());
  }

  if (authenticated && request.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin).toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
