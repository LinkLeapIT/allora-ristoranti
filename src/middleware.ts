import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("MIDDLEWARE: ", request.url);

  // ✅ Body Size Limit Check for POST requests
  if (request.method === "POST") {
    const contentLength = request.headers.get("content-length");
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (contentLength && parseInt(contentLength, 10) > maxSize) {
      return new NextResponse("Body exceeded 10 MB limit.", { status: 413 });
    }
  }

  // ✅ Fetch Cookies from the Request Header
  const token = request.cookies.get("firebaseAuthToken")?.value;

  // ✅ Allow Public Routes without Token
  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/api/public", // Add any other public APIs here
  ];

  if (!token && publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // ✅ Prevent Access to Auth Pages if Already Logged In
  if (
    token &&
    ["/login", "/register", "/forgot-password"].some((route) =>
      pathname.startsWith(route)
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Require Authentication for Protected Routes
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Decode and Validate JWT Token
  const decodedToken = decodeJwt(token);

  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    return NextResponse.redirect(
      new URL(
        `/api/refresh-token?redirect=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }

  // ✅ Restrict Admin Routes
  if (!decodedToken.admin && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Prevent Admins from Accessing Customer-Only Routes
  if (decodedToken.admin && pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// ✅ Matcher Configuration for Middleware
export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/account",
    "/account/:path*",
    "/product",
    "/api/:path*",
    "/admin/product/edit/:path*",
  ],
};
