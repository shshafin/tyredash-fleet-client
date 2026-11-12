import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  console.log(
    `📡 [Middleware] Path: ${pathname} | Token: ${
      accessToken ? "Present" : "Missing"
    }`
  );

  // ১. যদি টোকেন না থাকে
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    // প্রটেক্টেড রুটে যাওয়ার চেষ্টা করলে লগইনে পাঠাও
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ২. যদি টোকেন থাকে এবং ইউজার আবার লগইন/রেজিস্টার পেজে যেতে চায়
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const user: any = jwtDecode(accessToken);
    console.log(`👤 User Role: ${user?.role}`);

    // ৩. রোল চেক (Fleet User না হলে এক্সেস নেই)
    if (user?.role !== "fleet_user") {
      console.error("❌ Invalid Role: Redirecting to login & clearing cookie");
      const response = NextResponse.redirect(new URL("/login", request.url));
      // ভুল রোল হলে কুকিটা ডিলিট করে দেওয়া ভালো যাতে লুপ না হয়
      response.cookies.delete("accessToken");
      return response;
    }

    // ৪. সব ঠিক থাকলে যেতে দাও
    return NextResponse.next();
  } catch (error) {
    console.error("🕵️ JWT Decode Error:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
