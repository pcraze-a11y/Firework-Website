import EventInfo from "@/components/EventInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinetuck Fireworks — America's 250th, July 4th 2026",
  description:
    "A free, family-oriented July 4th pyromusical at Pinetuck Golf Course in Rock Hill, SC. The largest pyromusical in the Carolinas.",
  openGraph: {
    title: "Pinetuck Fireworks — America's 250th, July 4th 2026",
    description:
      "A free, family-oriented July 4th pyromusical at Pinetuck Golf Course in Rock Hill, SC.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <EventInfo />
    </main>
  );
}
