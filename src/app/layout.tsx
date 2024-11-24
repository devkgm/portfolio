import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "개발자 포트폴리오 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen animate-gradient bg-[size:400%_400%] bg-gradient-to-br from-indigo-200 via-purple-100 to-violet-200">
          {/* 배경 패턴 */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="absolute inset-0 animate-gradient-slow bg-[size:200%_200%] bg-[radial-gradient(circle_800px_at_100%_200px,#818cf850,transparent)]" />
            <div className="absolute inset-0 animate-gradient-slow-reverse bg-[size:200%_200%] bg-[radial-gradient(circle_800px_at_0%_800px,#6366f150,transparent)]" />
          </div>

          {/* 헤더 */}
          <Header />

          {/* 메인 컨텐츠 */}
          <main className="relative">
            <div className="absolute inset-0 -z-10 h-full w-full">
              <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl">
                <div className="aspect-[577/310] w-[36.0625rem] animate-gradient-slow bg-[size:200%_200%] bg-gradient-to-r from-[#818cf8] to-[#6366f1] opacity-25" 
                     style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'}}
                />
              </div>
              <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl">
                <div className="aspect-[577/310] w-[36.0625rem] animate-gradient-slow-reverse bg-[size:200%_200%] bg-gradient-to-r from-[#818cf8] to-[#6366f1] opacity-25"
                     style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'}}
                />
              </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
