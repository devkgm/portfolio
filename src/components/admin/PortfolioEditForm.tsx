'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageUploader } from './ImageUploader';
import { useRouter } from 'next/navigation';
import type { Portfolio } from '@/db';

interface PortfolioForm {
  title: string;
  description: string;
  githubUrl: string;
  tags: string;
}

interface Props {
  portfolio: Portfolio;
}

export default function PortfolioEditForm({ portfolio }: Props) {
  const [thumbnail, setThumbnail] = useState<string>(portfolio.thumbnail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<PortfolioForm>({
    defaultValues: {
      title: portfolio.title,
      description: portfolio.description,
      githubUrl: portfolio.githubUrl,
      tags: JSON.parse(portfolio.tags).join(', '),
    },
  });

  const onSubmit = async (data: PortfolioForm) => {
    try {
      setIsSubmitting(true);
      
      const portfolioData = {
        ...data,
        thumbnail,
        tags: data.tags.split(',').map(tag => tag.trim()),
      };
      
      const response = await fetch(`/api/portfolios/${portfolio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        throw new Error('Failed to update portfolio');
      }

      router.push('/admin');
      router.refresh();
      alert('포트폴리오가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('Submit error:', error);
      alert('포트폴리오 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          프로젝트 제목
        </label>
        <input
          {...register('title', { required: '제목을 입력해주세요' })}
          className="w-full px-3 py-2 border rounded-md text-gray-900"
          placeholder="프로젝트 제목을 입력하세요"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1 font-medium">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          프로젝트 설명
        </label>
        <textarea
          {...register('description', { required: '설명을 입력해주세요' })}
          className="w-full px-3 py-2 border rounded-md h-32 text-gray-900"
          placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1 font-medium">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          GitHub URL
        </label>
        <input
          {...register('githubUrl', { required: 'GitHub URL을 입력해주세요' })}
          className="w-full px-3 py-2 border rounded-md text-gray-900"
          placeholder="GitHub 저장소 URL을 입력하세요"
        />
        {errors.githubUrl && (
          <p className="text-red-600 text-sm mt-1 font-medium">{errors.githubUrl.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          기술 스택 (쉼표로 구분)
        </label>
        <input
          {...register('tags', { required: '기술 스택을 입력해주세요' })}
          className="w-full px-3 py-2 border rounded-md text-gray-900"
          placeholder="React, TypeScript, Node.js"
        />
        {errors.tags && (
          <p className="text-red-600 text-sm mt-1 font-medium">{errors.tags.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          썸네일 이미지
        </label>
        <ImageUploader onImageUpload={setThumbnail} initialImage={thumbnail} />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {isSubmitting ? '수정 중...' : '포트폴리오 수정'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
} 