import { verifySession } from "@/actions/auth";
import CardProfile from "@/components/card-profile";
import { redirect } from "next/navigation";

export default async function Profile() {
  const userSession = await verifySession();

  if (!userSession) {
    redirect("/signin");
  }

  return (
    <section className="w-full md:min-h-[80vh] md:flex md:flex-col md:justify-center md:gap-8 mt-20 md:mt-0">
      <CardProfile userId={userSession.id} />
    </section>
  );
}
