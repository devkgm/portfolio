import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { signOut } from "next-auth/react";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // 즉시 만료
    path: "/",
  });

  return response;
}
