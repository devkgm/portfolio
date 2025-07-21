import { NextRequest, NextResponse, userAgent } from "next/server";
import { getToken } from "next-auth/jwt";
import { AccessLog } from "./types/log";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const ip = request.headers.get("x-forwarded-for")?.split(",").shift();

  const geo = {
    city: request.headers.get("x-vercel-ip-city") || undefined,
    country: request.headers.get("x-vercel-ip-country") || undefined,
    region: request.headers.get("x-vercel-ip-country-region") || undefined,
  };
  const { device, os, browser, isBot } = userAgent(request);

  if (!isBot) {
    fetch(`${nextUrl.origin}/api/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: nextUrl.pathname,
        ip,
        geo,
        userAgent: JSON.stringify({ device, os, browser }),
      } as AccessLog),
    });
  }

  // 인증 및 권한 확인 로직
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAdminPath = nextUrl.pathname.startsWith("/admin");

  if (isAdminPath) {
    if (!token || token.sub !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
