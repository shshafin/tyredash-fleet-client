"use server";

import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (prevState: any, data: FormData) => {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const response = await fetch(`${baseUrl}/fleet-users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    return {
      success: false,
      error: "Login failed",
    };
  }

  const user = await response.json();
  console.log(user);
  redirect("/"); // Redirect after successful login
};
