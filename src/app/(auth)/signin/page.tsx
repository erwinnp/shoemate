import { verifySession } from "@/actions/auth";
import { SignInForm } from "@/components/forms/signin-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const userSession = await verifySession();

  if (userSession) {
    redirect("/");
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-6 md:gap-8">
      <h1 className="font-bold text-3xl">ShoeMate</h1>
      <SignInForm />
    </section>
  );
}
