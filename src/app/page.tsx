import { verifySession } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const userSession = await verifySession();

  return (
    <main className="container max-w-screen-lg mx-auto max-md:px-4 px-6">
      <section className="min-h-screen flex flex-col md:flex-row justify-center md:items-center gap-6 md:gap-12">
        <div className="relative w-full md:max-w-[480px] h-[280px] md:h-[320px] rounded-lg overflow-hidden">
          <Image
            alt="banner-img"
            src="/banner.jpg"
            fill
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-medium">
              Effortlessly manage your shoe collection with{" "}
              <span className="font-bold text-muted-foreground">ShoeMate</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-base">
              Keep your shoes organized and accessible, all in one place
            </p>
          </div>
          {userSession ? (
            <Button asChild className="w-fit" size={"lg"}>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild className="w-fit" size={"lg"}>
              <Link href="/signin">Sign in</Link>
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
