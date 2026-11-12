import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register", "/change-password", "/forgot-password", "/reset-password"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken"); // Fixed variable name
  const pathname = request.nextUrl.pathname;

  console.log("Pathname:", pathname);
  console.log("Access Token exists:", !!accessToken);

  if (!accessToken) {
    console.log("No access token found");
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  try {
    const user: { role: string } | null = jwtDecode(accessToken.value);
    console.log("Decoded user:", user);
    console.log("User role:", user?.role);

    if (user?.role !== "fleet_user") {
      console.log("Invalid role, redirecting to login");
      if (AuthRoutes.includes(pathname)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    console.log("Valid user, allowing access");
    return NextResponse.next();
  } catch (error) {
    console.log("JWT decode error:", error);
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
