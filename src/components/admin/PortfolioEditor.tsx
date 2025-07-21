"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImageUploader } from "./ImageUploader";
import { useRouter } from "next/navigation";

interface PortfolioForm {
  title: string;
  description: string;
  githubUrl: string;
  tags: string;
}

export default function PortfolioEditor() {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PortfolioForm>();

  const onSubmit = async (data: PortfolioForm) => {
    try {
      setIsSubmitting(true);

      const portfolioData = {
        ...data,
        thumbnail,
        tags: data.tags.split(",").map((tag) => tag.trim()),
      };

      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        throw new Error("Failed to create portfolio");
      }

      reset();
      setThumbnail("");
      router.refresh();
      alert("포트폴리오가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("Submit error:", error);
      alert("포트폴리오 저장에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
    >
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          프로젝트 제목
        </label>
        <input
          {...register("title", { required: "제목을 입력해주세요" })}
          className="w-full px-3 py-2 border rounded-md text-gray-900"
          placeholder="프로젝트 제목을 입력하세요"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1 font-medium">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          프로젝트 설명
        </label>
        <textarea
          {...register("description", { required: "설명을 입력해주세요" })}
          className="w-full px-3 py-2 border rounded-md h-32 text-gray-900"
          placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1 font-medium">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          GitHub URL
        </label>
        <input
          {...register("githubUrl", { required: "GitHub URL을 입력해주세요" })}
          className="w-full px-3 py-2 border rounded-md text-gray-900"
          placeholder="GitHub 저장소 URL을 입력하세요"
          defaultValue="https://github.com/devkgm"
        />
        {errors.githubUrl && (
          <p className="text-red-600 text-sm mt-1 font-medium">
            {errors.githubUrl.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          기술 스택 (쉼표로 구분)
        </label>
        <input
          {...register("tags", { required: "기술 스택을 입력해주세요" })}
          className="w-full px-3 py-2 border rounded-md text-gray-900"
          placeholder="React, TypeScript, Node.js"
        />
        {errors.tags && (
          <p className="text-red-600 text-sm mt-1 font-medium">
            {errors.tags.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          썸네일 이미지
        </label>
        <ImageUploader onImageUpload={setThumbnail} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
      >
        {isSubmitting ? "저장 중..." : "포트폴리오 저장"}
      </button>
    </form>
  );
}
