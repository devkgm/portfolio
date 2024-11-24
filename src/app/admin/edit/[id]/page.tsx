import { portfolioDb } from '@/db';
import PortfolioEditForm from '@/components/admin/PortfolioEditForm';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPortfolioPage({ params }: Props) {
  const portfolioId = Number(params.id);
  
  if (isNaN(portfolioId)) {
    notFound();
  }

  const portfolio = portfolioDb.getById(portfolioId);
  
  if (!portfolio) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">포트폴리오 수정</h1>
        <p className="mt-2 text-base font-medium text-gray-700">
          포트폴리오 내용을 수정할 수 있습니다.
        </p>
      </div>
      <PortfolioEditForm portfolio={portfolio} />
    </div>
  );
} 