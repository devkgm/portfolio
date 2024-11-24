'use client';

import { useEffect, useState } from 'react';
import { getGitHubUser } from '@/utils/github';

export default function Profile() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubUser = async () => {
      const user = await getGitHubUser('devkgm'); // GitHub 사용자 이름
      if (user) {
        setAvatarUrl(user.avatar_url);
      }
    };

    fetchGitHubUser();
  }, []);

  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl bg-white/70 p-6 md:p-8 shadow-lg backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-100/50 to-blue-100/50" />
      <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={avatarUrl || '/profile-placeholder.jpg'}
            alt="프로필 이미지"
            className="h-full w-full object-cover transition-transform hover:scale-110"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="mb-4 text-2xl md:text-3xl font-bold text-gray-900">
            👨‍💻
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              소개
            </span>
          </h1>
          <p className="text-base md:text-lg font-medium leading-relaxed text-gray-700">
            안녕하세요 👋 <br/>
            <span className="animate-pulse bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              좋은 제품을 빌드하는게 즐거운 개발자
            </span>{" "}
            <b>김경모</b>입니다. <br/>
            추구하는 개발 🎯목표는 사용자 경험 개선🔥
          </p>
        </div>
      </div>
    </div>
  );
} 