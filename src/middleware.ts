import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 로깅 데이터 수집
  const logData = {
    timestamp: new Date().toISOString(),
    url: request.nextUrl.toString(),
    method: request.method,
    ip: request.headers.get('x-forwarded-for') ?? 'unknown',
    userAgent: request.headers.get('user-agent') ?? 'unknown',
    referer: request.headers.get('referer'),
    path: request.nextUrl.pathname,
  };

  // 로깅 API에 데이터 전송
  fetch(`${request.nextUrl.origin}/api/log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  }).catch(console.error);

  // 관리자 페이지 접근 제어
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const adminToken = request.cookies.get('admin_token');

  if (isAdminPage && !adminToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적 파일과 로깅 API를 제외한 모든 경로
    '/((?!_next/static|_next/image|favicon.ico|public|uploads|api/log).*)',
  ],
}; 