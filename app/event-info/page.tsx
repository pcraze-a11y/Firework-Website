import EventInfo from "@/components/EventInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Info — PineTuck Fireworks July 4th",
  description:
    "Details, what to bring, parking, and FAQs for the PineTuck Golf Course July 4th fireworks event in Rock Hill, SC.",
};

export default function EventInfoPage() {
  return (
    <main>
      <EventInfo />
    </main>
  );
}
