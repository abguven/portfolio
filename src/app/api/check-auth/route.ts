import { type NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { verifyAuthToken } from "../authenticate/route";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const secret = process.env.PAGE_ACCESS_PASSWORD;

  if (secret && cookies.authToken && verifyAuthToken(cookies.authToken, secret)) {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
