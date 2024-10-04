import { verifySession } from "@/actions/auth";
import { SignUpForm } from "@/components/forms/signup-form";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const userSession = await verifySession();
  if (userSession) {
    redirect("/");
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-6 md:gap-8">
      <h1 className="font-bold text-3xl">ShoeMate</h1>
      <SignUpForm />
    </section>
  );
}
