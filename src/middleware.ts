import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  console.log(req.nextUrl.pathname);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (req.nextUrl.pathname === "/admin/verify-blog" && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/blog-list", "/information", "/create-blog", "/admin/verify-blog"],
};
