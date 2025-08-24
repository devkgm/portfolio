import { getServerClient } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await getServerClient()
      .storage.from("thumbnails")
      .upload(fileName, file);

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = getServerClient().storage.from("thumbnails").getPublicUrl(data.path);

    return NextResponse.json({ imageUrl: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
