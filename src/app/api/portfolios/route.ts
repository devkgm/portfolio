import { NextResponse } from "next/server";
import { portfolioDb } from "@/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 데이터베이스에 저장
    const result = await portfolioDb.create({
      title: data.title,
      description: data.description,
      githubUrl: data.githubUrl,
      thumbnail: data.thumbnail,
      tags: JSON.stringify(data.tags),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Portfolio creation error:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const portfolios = await portfolioDb.getAll();
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}
