import { verifySession } from "@/actions/auth";
import TableShoes from "@/components/table-shoes";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const userSession = await verifySession();
  if (!userSession?.email) {
    redirect("/signin");
  }

  return (
    <section className="w-full md:min-h-[80vh] md:flex md:flex-col md:justify-center md:gap-8 mt-20 md:mt-0">
      <TableShoes userId={userSession.id} />
    </section>
  );
}
