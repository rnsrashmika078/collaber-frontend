import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const API = process.env.EXPRESS_URL!;
export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookieStore = await cookies();

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": `application/json`,
    },
    body: JSON.stringify({ email: body.email, password: body.password }),
  });

  const payload = await res.json();

  cookieStore.set("access_token", String(payload.result.accessToken), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return NextResponse.json({
    user: payload.result.user,
  });
}
