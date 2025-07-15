import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // 로깅 데이터 수집
  const logData = {
    timestamp: new Date().toISOString(),
    url: request.nextUrl.toString(),
    method: request.method,
    ip: request.headers.get("x-forwarded-for") ?? "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
    referer: request.headers.get("referer"),
    path: request.nextUrl.pathname,
  };

  // 로깅 API에 데이터 전송
  fetch(`${request.nextUrl.origin}/api/log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logData),
  }).catch(console.error);

  // 관리자 페이지 접근 제어
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|upload|log|favicon.ico).*)"],
};
