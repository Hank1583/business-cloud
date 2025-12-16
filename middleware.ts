import { NextResponse, NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const memberId = req.cookies.get("token")?.value;

  if (!memberId && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
