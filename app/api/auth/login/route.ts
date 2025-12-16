export const runtime = "edge";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signToken } from "@/lib/auth"; // 你原本的

export async function POST(req: Request) {
  const body = await req.json();

  // 轉成 PHP 最穩的格式
  const form = new URLSearchParams();
  for (const [k, v] of Object.entries(body)) {
    form.append(k, String(v));
  }

  const r = await fetch(
    "https://www.highlight.url.tw/api/login.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    }
  );

  const text = await r.text();

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid response from auth server" },
      { status: 502 }
    );
  }

  if (data.status !== "success") {
    return NextResponse.json(
      { ok: false, message: data.message },
      { status: 401 }
    );
  }

  // 🔐 這裡你才簽 JWT
  const token = await signToken({
    id: data.member_id,
    email: data.email,
    name: data.name,
    role: data.subscription,
  });
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
