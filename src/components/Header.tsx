'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = useCallback(() => {
    const cookies = document.cookie.split(';');
    const adminToken = cookies
      .find(cookie => cookie.trim().startsWith('admin_token='))
      ?.split('=')[1];
    setIsLoggedIn(adminToken === 'true');
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus, pathname]); // pathname이 변경될 때마다 로그인 상태 체크

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [router]);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            개발자 김경모의 포트폴리오
          </Link>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/admin"
                  className="relative inline-flex items-center px-6 py-2.5 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                >
                  작성
                </Link>
                <button
                  onClick={handleLogout}
                  className="relative inline-flex items-center px-6 py-2.5 font-semibold transition-all duration-200 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 hover:shadow-lg hover:shadow-gray-300/30 hover:-translate-y-0.5"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="relative inline-flex items-center px-6 py-2.5 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
              >
                로그인
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
} 