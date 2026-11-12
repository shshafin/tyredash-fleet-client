// import { NextResponse, NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";

// const AuthRoutes = [
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/reset-password",
// ];

// export function middleware(request: NextRequest) {
//   const accessToken = request.cookies.get("accessToken");
//   const { pathname } = request.nextUrl;

//   // 🏎️ Tactical Log
//   console.log(
//     `📡 [Middleware] Path: ${pathname} | Token: ${
//       accessToken ? "Found" : "Missing"
//     }`
//   );

//   // ১. যদি টোকেন না থাকে এবং ইউজার অথ রুট (Login/Register) এ থাকে, যেতে দাও
//   if (!accessToken) {
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     }
//     // প্রটেক্টেড রুটে থাকলে লগইনে পাঠাও
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // ২. যদি টোকেন থাকে এবং ইউজার লগইন পেজে যেতে চায়, তাকে ড্যাশবোর্ডে পাঠিয়ে দাও
//   if (AuthRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL("/", request.url)); // অথবা তোর ড্যাশবোর্ড পাথ
//   }

//   try {
//     const user: any = jwtDecode(accessToken.value);

//     // ফ্লিট ইউজারের রোল চেক
//     if (user?.role !== "fleet_user") {
//       const response = NextResponse.redirect(new URL("/login", request.url));
//       response.cookies.delete("accessToken"); // ভুল রোল হলে কুকি মুছে দাও
//       return response;
//     }

//     return NextResponse.next();
//   } catch (error) {
//     const response = NextResponse.redirect(new URL("/login", request.url));
//     response.cookies.delete("accessToken");
//     return response;
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
// };
