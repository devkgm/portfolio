import { CreatePortfolioData, ImageUploadResponse } from "@/types/portfolio";

export const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response.json();
};

export const createPortfolio = async (
  data: CreatePortfolioData
): Promise<void> => {
  const response = await fetch("/api/portfolios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create portfolio");
  }
};
