import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/pocketbase";

const unprotectedRoutes = ["/", "/signin", "/signup"];

async function isAuthenticated(cookieStore: ReadonlyRequestCookies) {
  const pb = createServerClient(cookieStore);

  try {
    if (pb.authStore.isValid) {
      console.log("Refreshing token for user");
      await pb.collection("users").authRefresh();
    }
  } catch (error) {
    pb.authStore.clear();
  } finally {
    return pb.authStore.isValid;
  }
}

export async function middleware(request: NextRequest) {
  console.log(`[middleware] ${request.method} ${request.url}`);

  const cookieStore = cookies();
  const authenticated = await isAuthenticated(cookieStore);

  if (!authenticated && !unprotectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl.origin).toString());
  }

  if (authenticated && request.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/projects", request.nextUrl.origin).toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
