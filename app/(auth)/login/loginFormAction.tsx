"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (prevState: any, data: FormData) => {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const response = await fetch(`${baseUrl}/fleet-auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);

    return {
      success: false,
      error: errorData.message || "Login failed. Please try again.",
    };
  }

  const user = await response.json();
  console.log(user);

  (await cookies()).set("accessToken", user.data.accessToken);

  redirect("/"); // Redirect after successful login
};
