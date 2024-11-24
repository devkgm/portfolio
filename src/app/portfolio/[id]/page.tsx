'use client';

import { getReadmeContent } from '@/utils/github';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

interface Portfolio {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  thumbnail: string;
  tags: string;
}

export default function PortfolioDetailPage({ params }: Props) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const cookies = document.cookie.split(';');
      const hasAdminToken = cookies.some(cookie => 
        cookie.trim().startsWith('admin_token=true')
      );
      setIsLoggedIn(hasAdminToken);
    };

    const loadPortfolio = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`/api/portfolios/${id}`);
        if (!response.ok) {
          notFound();
        }
        const data = await response.json();
        setPortfolio(data);
        
        const content = await getReadmeContent(data.githubUrl);
        setReadmeContent(content);
      } catch (error) {
        console.error('Failed to load portfolio:', error);
        notFound();
      }
    };

    checkLoginStatus();
    loadPortfolio();
  }, [params]);

  const handleDelete = async () => {
    if (!portfolio || !confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/portfolios/${portfolio.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        throw new Error('Failed to delete portfolio');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  if (!portfolio) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-6 overflow-hidden rounded-lg bg-transparent h-[400px] flex items-center justify-center">
          <img
            src={portfolio.thumbnail}
            alt={portfolio.title}
            className="max-h-full w-auto object-contain"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{portfolio.title}</h1>
          {isLoggedIn && (
            <div className="flex gap-4">
              <Link
                href={`/admin/edit/${portfolio.id}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                수정
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p className="mb-4 text-base font-medium text-gray-700">{portfolio.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {JSON.parse(portfolio.tags).map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={portfolio.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub 방문
        </a>
      </div>
      
      <div className="prose max-w-none rounded-lg bg-white p-8 shadow-lg">
        {readmeContent ? (
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readmeContent}</ReactMarkdown>
        ) : (
          <p className="text-base font-medium text-gray-700">README.md를 불러올 수 없습니다.</p>
        )}
      </div>
    </div>
  );
} 