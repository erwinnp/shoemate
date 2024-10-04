import { verifySession } from "@/actions/auth";
import { EditShoeForm } from "@/components/forms/edit-shoe-form";
import { redirect } from "next/navigation";

export default async function EditShoePage({
  params,
}: {
  params: { id: string };
}) {
  const userSession = await verifySession();

  if (!userSession) {
    redirect("/signin");
  }

  return (
    <section className="w-full md:min-h-[90vh] md:flex md:flex-col md:justify-center md:gap-8 mt-10 md:mt-0">
      <EditShoeForm userId={userSession.id} shoeId={params.id} />
    </section>
  );
}
