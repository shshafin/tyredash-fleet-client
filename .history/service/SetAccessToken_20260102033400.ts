"use server";
import { cookies } from "next/headers";

const setAccessToken = async (token: string, name: string) => {
  const cookieStore = await cookies();

  cookieStore.set(name, token, {
    path: "/",
    // 🏎️ ডোমেইনটা ডাইনামিক রাখা জরুরি
    domain:
      process.env.NODE_ENV === "development"
        ? ".tiresdash.local"
        : ".tiresdash.com",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // ৩০ দিন
  });
};

export default setAccessToken;
