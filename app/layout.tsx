import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PineTuck Fireworks — July 4th Tent Reservations",
  description:
    "Reserve your free tent spot for the July 4th fireworks at PineTuck Golf Course in Rock Hill, SC. Celebrating 250 years of independence.",
  openGraph: {
    title: "PineTuck Fireworks — July 4th Tent Reservations",
    description: "Reserve your free tent spot at PineTuck Golf Course, Rock Hill, SC.",
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
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
