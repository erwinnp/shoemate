"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IStoreTokenRequest {
  id: string;
  email: string;
  username: string;
}

//Setup session user ke cookies
export async function storeUser(request: IStoreTokenRequest) {
  const storeCookie = cookies();
  storeCookie.set({
    name: "userSession",
    value: JSON.stringify(request),
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return redirect("/dashboard");
}

//Cek user session untuk validasi
export async function verifySession() {
  const userSession = cookies().get("userSession")?.value;

  if (userSession) {
    const session = JSON.parse(userSession);

    return {
      id: session.id,
      email: session.email,
      username: session.username,
    };
  }

  return null;
}

export async function removeSession() {
  cookies().delete("userSession");

  return redirect("/signin");
}
