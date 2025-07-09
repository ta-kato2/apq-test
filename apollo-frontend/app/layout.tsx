import type { Metadata } from "next";
import "./globals.css";
import { RelayProvider } from "@/lib/relay-provider";

export const metadata: Metadata = {
  title: "Apollo GraphQL Frontend",
  description: "Next.js frontend for Apollo Router sample",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RelayProvider>{children}</RelayProvider>
      </body>
    </html>
  );
}
