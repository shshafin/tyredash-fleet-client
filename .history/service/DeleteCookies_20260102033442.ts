import { cookies } from "next/headers";

export const deleteCookies = async (keys: string[]) => {
  const cookieStore = await cookies();
  const domain =
    process.env.NODE_ENV === "development"
      ? ".tiresdash.local"
      : ".tiresdash.com";

  keys.forEach((key) => {
    cookieStore.set(key, "", { domain, path: "/", maxAge: 0 });
  });
};
