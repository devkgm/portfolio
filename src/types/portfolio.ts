export interface CreatePortfolioData {
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
  thumbnail: string;
}

export interface ImageUploadResponse {
  imageUrl: string;
}
