import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Pinetuck Fireworks — America's 250th, July 4th 2026",
  description:
    "A free, family-oriented July 4th pyromusical at Pinetuck Golf Course in Rock Hill, SC. The largest pyromusical in the Carolinas.",
  openGraph: {
    title: "Pinetuck Fireworks — America's 250th, July 4th 2026",
    description: "A free July 4th pyromusical at Pinetuck Golf Course, Rock Hill, SC.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
      </head>
      <body className="antialiased min-h-screen">
        <Nav />
        {children}
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
