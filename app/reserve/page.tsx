import MapSection from "@/components/MapSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve a Tent Spot — Pinetuck Fireworks July 4th",
  description:
    "Reserve your free tent spot for the July 4th fireworks at Pinetuck Golf Course in Rock Hill, SC.",
};

export default function ReservePage() {
  return (
    <main>
      <MapSection />
    </main>
  );
}
