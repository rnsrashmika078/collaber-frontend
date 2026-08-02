import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const API = process.env.EXPRESS_URL!;
export async function GET() {
  console.log("API ", API);
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  console.log("TOKEN", token?.value);

  const res = await fetch(`${API}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const result = await res.json();
  console.log("result", result);

  return NextResponse.json({
    result,
  });
}
