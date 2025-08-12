import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// This function can be marked `async` if using `await` inside

const AuthRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");
  const pathname = request.nextUrl.pathname;

  const user: { role: string } | null = refreshToken ? jwtDecode(refreshToken.value) : null;

  console.log(user);

  if (!refreshToken || user?.role !== "fleet_user") {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  // Exclude static assets, API routes, and Next.js internals
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - *.extension (static files with extensions)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
