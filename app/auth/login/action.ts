"use server";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const res = await fetch("https://www.highlight.url.tw/api/login.php", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    return {
      success: false,
      message: "伺服器錯誤，請稍後再試",
    };
  }
  const data = await res.json();
  if (data.status !== "success") {
    return {
      success: false,
      message: data.message || "登入失敗",
    };
  }
  const token = await signToken({
    id: data.member_id,
    email: data.email,
    name: data.name,
    role: data.subscription,
  });
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return { success: true };
}