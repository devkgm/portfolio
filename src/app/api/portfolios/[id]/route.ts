import { NextResponse } from "next/server";
import { portfolioDb } from "@/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const portfolioId = Number(id);

    if (isNaN(portfolioId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const portfolio = await portfolioDb.getById(portfolioId);
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const portfolioId = Number(id);

    if (isNaN(portfolioId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();
    // 데이터베이스에 저장
    const result = await portfolioDb.update(portfolioId, {
      title: data.title,
      description: data.description,
      githubUrl: data.githubUrl,
      thumbnail: data.thumbnail,
      tags: JSON.stringify(data.tags),
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Portfolio update error:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const portfolioId = Number(id);

    if (isNaN(portfolioId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await portfolioDb.delete(portfolioId);
    if (!result.success) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}
