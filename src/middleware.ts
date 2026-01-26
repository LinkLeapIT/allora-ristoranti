import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ✅ Log the incoming request URL
  console.log("MIDDLEWARE: ", request.url);

  // Bypass middleware for specific API routes that don't need auth/processing
  if (
    pathname.startsWith('/api/public') ||
    pathname.startsWith('/api/refresh-token') ||
    pathname.startsWith('/api/checkout') ||
    pathname.startsWith('/api/categories')
  ) {
    return NextResponse.next();
  }

  // ✅ Body Size Limit Check for POST requests
  if (request.method === "POST") {
    const contentLength = request.headers.get("content-length");
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (contentLength && parseInt(contentLength, 10) > maxSize) {
      return new NextResponse("Body exceeded 10 MB limit.", { status: 413 });
    }
  }

  // ✅ Fetch Token from Cookies or Authorization Header
  let token = request.cookies.get("firebaseAuthToken")?.value;
  if (!token && request.headers.has("authorization")) {
    const authHeader = request.headers.get("authorization") as string;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

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
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = new URL("/", request.url);
    url.search = search; // Preserve query parameters
    return NextResponse.redirect(url);
  }

  // ✅ Decode and Validate JWT Token
  const decodedToken = decodeJwt(token);

  // Check for token expiration
  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    // If token is expired and it's an API call, return 401
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 });
    }
    // For page loads, redirect to refresh the token
    const url = new URL(
      `/api/refresh-token?redirect=${encodeURIComponent(pathname + search)}`,
      request.url
    );
    return NextResponse.redirect(url);
  }

  // ✅ Restrict Admin Routes
  if (!decodedToken.admin && pathname.startsWith("/admin")) {
    const url = new URL("/", request.url);
    url.search = search; // Preserve query parameters
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ Matcher Configuration for Middleware
export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/account/:path*",
    "/product",
    "/api/:path*", // All api routes will be matched
    "/admin/product/edit/:path*",
  ],
};