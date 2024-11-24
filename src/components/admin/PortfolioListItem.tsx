'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PortfolioListItemProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export default function PortfolioListItem({
  id,
  title,
  description,
  thumbnail,
  tags,
}: PortfolioListItemProps) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <p className="mb-4 text-base font-medium text-gray-700">{description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/edit/${id}`}
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700"
          >
            수정
          </Link>
          <button
            onClick={async () => {
              if (confirm('정말 삭제하시겠습니까?')) {
                try {
                  const response = await fetch(`/api/portfolios/${id}`, {
                    method: 'DELETE',
                  });
                  if (response.ok) {
                    router.refresh();
                  }
                } catch (error) {
                  console.error('Delete error:', error);
                  alert('삭제에 실패했습니다.');
                }
              }
            }}
            className="flex-1 rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
} 