import Link from 'next/link';

interface PortfolioCardProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export default function PortfolioCard({
  id,
  title,
  description,
  thumbnail,
  tags,
}: PortfolioCardProps) {
  return (
    <Link href={`/portfolio/${id}`}>
      <div className="h-full flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:-translate-y-1">
        <div className="aspect-video w-full overflow-hidden bg-black">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1">{title}</h3>
          <p className="mb-4 flex-1 text-base font-medium text-gray-700 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
} 