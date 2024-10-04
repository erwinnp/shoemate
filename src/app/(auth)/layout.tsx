import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="container max-w-screen-lg mx-auto max-md:px-4 px-6">
        {children}
      </main>
      <Toaster />
    </>
  );
}
