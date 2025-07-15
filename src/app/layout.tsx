import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Provider from "./lib/provider";
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
    <Provider>
      <html lang="ko">
        <body className={inter.className}>
          <div className="min-h-screen animate-gradient bg-[size:400%_400%] bg-gradient-to-br from-indigo-200 via-purple-100 to-violet-200">
            <div className="absolute inset-0 -z-10 w-full">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:14px_24px]" />
              <div className="absolute inset-0 animate-gradient-slow bg-[size:200%_200%] bg-[radial-gradient(circle_800px_at_100%_200px,#818cf850,transparent)]" />
              <div className="absolute inset-0 animate-gradient-slow-reverse bg-[size:200%_200%] bg-[radial-gradient(circle_800px_at_0%_800px,#6366f150,transparent)]" />
            </div>

            <Header />

            <main className="relative">
              <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
                {children}
              </div>
            </main>
          </div>
        </body>
      </html>
    </Provider>
  );
}
