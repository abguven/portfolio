import { type NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { createHmac, timingSafeEqual } from "node:crypto";

function generateAuthToken(secret: string): string {
  return createHmac("sha256", secret).update("portfolio-auth-v1").digest("hex");
}

export function verifyAuthToken(token: string, secret: string): boolean {
  const expected = generateAuthToken(secret);
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;
  const correctPassword = process.env.PAGE_ACCESS_PASSWORD;

  if (!correctPassword) {
    console.error("PAGE_ACCESS_PASSWORD environment variable is not set");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  if (!timingSafeEqual(Buffer.from(password ?? ""), Buffer.from(correctPassword))) {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }

  const token = generateAuthToken(correctPassword);
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.headers.set(
    "Set-Cookie",
    cookie.serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }),
  );

  return response;
}
