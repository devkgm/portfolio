"use client";

import { useState } from "react";
import { uploadImage } from "@/utils/api";

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
}

export function ImageUploader({
  onImageUpload,
  initialImage,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(initialImage || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 4.5 * 1024 * 1024; // 4.5MB Limit
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    //Vercel 정책으로 이미지 첨부 제한
    if (file.size > maxSize) {
      alert("최대 4.5MB 용량의 이미지를 첨부할 수 있습니다.");
      return;
    }

    setIsUploading(true);

    try {
      const { imageUrl } = await uploadImage(file);

      setPreview(imageUrl);
      onImageUpload(imageUrl);
      alert("이미지 업로드에 성공했습니다.");
    } catch (error) {
      console.error("Image upload error:", error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <p>업로드 중...</p>
            ) : preview ? (
              <img
                src={preview}
                alt="미리보기"
                className="max-h-56 object-contain"
              />
            ) : (
              <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">클릭하여 업로드</span> 또는
                  드래그 앤 드롭
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF (최대 10MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
}
