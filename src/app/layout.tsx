import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShoeMate",
  description: "ShoeMate by Erwin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
