import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const logData = await request.json();
    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, `access_${new Date().toISOString().split('T')[0]}.log`);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logEntry = JSON.stringify({
      ...logData,
      timestamp: new Date().toISOString(),
    }) + '\n';

    fs.appendFileSync(logFile, logEntry);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logging error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 