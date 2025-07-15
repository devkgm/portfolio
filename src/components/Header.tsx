"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
          >
            개발자 김경모의 포트폴리오
          </Link>
          <div className="flex items-center gap-4">
            {status == "authenticated" ? (
              <>
                <Link
                  href="/admin"
                  className="relative inline-flex items-center px-6 py-2.5 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                >
                  작성
                </Link>
                <button
                  onClick={() => signOut()}
                  className="relative inline-flex items-center px-6 py-2.5 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
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
