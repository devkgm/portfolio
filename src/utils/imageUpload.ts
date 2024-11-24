import fs from 'fs';
import path from 'path';

export async function saveImage(base64Data: string): Promise<string> {
  try {
    // 이미 저장된 이미지 URL인 경우 그대로 반환
    if (base64Data.startsWith('/uploads/')) {
      return base64Data;
    }

    // base64 데이터에서 파일 형식과 실제 데이터 추출
    const [header, base64Image] = base64Data.split(',');
    if (!header || !base64Image) {
      throw new Error('Invalid image data');
    }

    // 파일 형식 결정
    let fileExtension = 'jpg'; // 기본값
    if (header.includes('image/png')) {
      fileExtension = 'png';
    } else if (header.includes('image/gif')) {
      fileExtension = 'gif';
    } else if (header.includes('image/jpeg')) {
      fileExtension = 'jpg';
    }

    const fileName = `${Date.now()}.${fileExtension}`;
    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    // public/uploads 디렉토리가 없으면 생성
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    
    // 이미지 저장
    fs.writeFileSync(filePath, imageBuffer);
    
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Image save error:', error);
    throw new Error('Failed to save image');
  }
} 