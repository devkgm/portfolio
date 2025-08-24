import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/utils/supabase";
import { AccessLog } from "@/types/log";

export async function POST(request: NextRequest) {
  try {
    const logData = (await request.json()) as AccessLog;

    const { error } = await getServerClient()
      .from("access_logs")
      .insert([
        {
          path: logData.path,
          ip: logData.ip,
          geo: logData.geo,
          user_agent: logData.userAgent,
        },
      ]);

    if (error) {
      console.error("Failed to insert access log into Supabase:", error);
      return NextResponse.json(
        { error: "Failed to save access log" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/log/access:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
