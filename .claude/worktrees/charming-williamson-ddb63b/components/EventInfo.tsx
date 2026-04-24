export default function EventInfo() {
  return (
    <section className="w-full font-sans">
      {/* ── Hero / Header ─────────────────────────────────────────── */}
      <div
        className="w-full py-16 md:py-24 px-6 flex flex-col items-center text-center gap-6"
        style={{ backgroundColor: "#135658" }}
      >
        <h1
          className="text-4xl md:text-6xl font-semibold leading-tight"
          style={{ color: "#fff4df" }}
        >
          July 4th Fireworks at PineTuck
        </h1>
        <p className="text-lg md:text-xl max-w-2xl" style={{ color: "#e6f4ed" }}>
          Celebrating 250 Years of American Independence — Semiquincentennial
        </p>
        <span
          className="inline-block text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
          style={{ backgroundColor: "#039149", color: "#fff4df" }}
        >
          Saturday, July 4, 2026
        </span>
        <a
          href="#map"
          className="inline-block font-semibold rounded px-9 py-3.5 min-h-[44px] min-w-[44px] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "#fff4df",
            color: "#105157",
            borderRadius: "6px",
          }}
        >
          Reserve Your Spot
        </a>
      </div>

      {/* ── Event Details Grid ─────────────────────────────────────── */}
      <div
        className="w-full py-16 md:py-24 px-6"
        style={{ backgroundColor: "#fff4df" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-10 text-center"
            style={{ color: "#143437" }}
          >
            Event Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div
              className="flex items-start gap-4 p-6 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 24px rgba(20,52,55,0.10)",
              }}
            >
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#039149"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#039149" }}>
                  Date
                </p>
                <p className="text-base font-medium" style={{ color: "#143437" }}>
                  {/* PLACEHOLDER: Event date — default "Saturday, July 4, 2026" */}
                  Saturday, July 4, 2026
                </p>
              </div>
            </div>

            {/* Gates Open */}
            <div
              className="flex items-start gap-4 p-6 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 24px rgba(20,52,55,0.10)",
              }}
            >
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#039149"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#039149" }}>
                  Gates Open
                </p>
                <p className="text-base font-medium" style={{ color: "#143437" }}>
                  {/* PLACEHOLDER: Gates open time — e.g. "5:00 PM" */}
                  5:00 PM
                </p>
              </div>
            </div>

            {/* Fireworks Start */}
            <div
              className="flex items-start gap-4 p-6 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 24px rgba(20,52,55,0.10)",
              }}
            >
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#039149"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#039149" }}>
                  Fireworks Start
                </p>
                <p className="text-base font-medium" style={{ color: "#143437" }}>
                  {/* PLACEHOLDER: Fireworks start time — e.g. "9:30 PM" */}
                  9:30 PM
                </p>
              </div>
            </div>

            {/* Location */}
            <div
              className="flex items-start gap-4 p-6 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 24px rgba(20,52,55,0.10)",
              }}
            >
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#039149"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#039149" }}>
                  Location
                </p>
                <p className="text-base font-medium" style={{ color: "#143437" }}>
                  {/* PLACEHOLDER: Full address — e.g. "PineTuck Golf Course, 123 Golf Club Rd, Rock Hill, SC 29730" */}
                  PineTuck Golf Course, 123 Golf Club Rd, Rock Hill, SC 29730
                </p>
              </div>
            </div>

            {/* Parking */}
            <div
              className="flex items-start gap-4 p-6 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 24px rgba(20,52,55,0.10)",
              }}
            >
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#039149"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <path d="M16 8h4l3 4v4h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#039149" }}>
                  Parking
                </p>
                <p className="text-base font-medium" style={{ color: "#143437" }}>
                  {/* PLACEHOLDER: Parking info — e.g. "Free parking in the main lot off Club Drive" */}
                  Free parking in the main lot off Club Drive
                </p>
              </div>
            </div>

            {/* Contact */}
            <div
              className="flex items-start gap-4 p-6 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 24px rgba(20,52,55,0.10)",
              }}
            >
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#039149"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.16h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#039149" }}>
                  Contact
                </p>
                <p className="text-base font-medium" style={{ color: "#143437" }}>
                  {/* PLACEHOLDER: Contact name/email/phone */}
                  events@pinetuck.com · (803) 555-0100
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── What to Bring ──────────────────────────────────────────── */}
      <div
        className="w-full py-16 md:py-24 px-6"
        style={{ backgroundColor: "#e6f4ed" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-8 text-center"
            style={{ color: "#143437" }}
          >
            What to Bring
          </h2>
          <ul className="space-y-4">
            {[
              /* PLACEHOLDER: Tent size limit — e.g. "Tent (max 10×10 ft)" */
              "Tent (max 10×10 ft)",
              "Chairs and blankets",
              "Sunscreen and bug spray",
              "Water and snacks (no outside alcohol)",
              /* PLACEHOLDER: Any other restrictions the organizer wants to list */
              "Personal items — please pack out what you pack in",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#039149" }}
                  aria-hidden="true"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                </span>
                <span className="text-base" style={{ color: "#143437" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Parking & Getting There ────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-6 text-center"
            style={{ color: "#143437" }}
          >
            Parking &amp; Getting There
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#143437" }}>
            {/*
              PLACEHOLDER: Detailed parking / directions paragraph.
              Replace this entire paragraph with specific directions, gate info,
              rideshare drop-off location, ADA parking details, etc.
            */}
            Parking is free and available in the main lot located off Club Drive, directly adjacent to the golf course entrance. Additional overflow parking is available in the east field lot. Rideshare drop-off is permitted at the main entrance on Club Drive. ADA-accessible spaces are clearly marked near the front entrance. Follow posted signage on arrival — staff will be on-site to direct traffic. Allow extra travel time as roads near the venue may experience increased volume on the evening of July 4th.
          </p>
        </div>
      </div>

      {/* ── FAQ Accordion ─────────────────────────────────────────── */}
      <div
        className="w-full py-16 md:py-24 px-6"
        style={{ backgroundColor: "#f3f6f7" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-8 text-center"
            style={{ color: "#143437" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-0 divide-y" style={{ borderColor: "#c9c9c9" }}>
            <details className="group">
              <summary
                className="cursor-pointer list-none py-4 flex items-center justify-between text-base font-semibold select-none min-h-[44px]"
                style={{ color: "#143437" }}
              >
                Is this event free?
                <span
                  className="ml-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#039149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 8 10 13 15 8" />
                  </svg>
                </span>
              </summary>
              <p className="pb-4 text-base leading-relaxed" style={{ color: "#143437" }}>
                Yes — tent spots are free. Reserve yours online to secure your location on the lawn.
              </p>
            </details>

            <details className="group">
              <summary
                className="cursor-pointer list-none py-4 flex items-center justify-between text-base font-semibold select-none min-h-[44px]"
                style={{ color: "#143437" }}
              >
                Can I reserve more than one spot?
                <span
                  className="ml-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#039149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 8 10 13 15 8" />
                  </svg>
                </span>
              </summary>
              <p className="pb-4 text-base leading-relaxed" style={{ color: "#143437" }}>
                One spot per family per email address. If you have an exceptional need, please contact us directly.
              </p>
            </details>

            <details className="group">
              <summary
                className="cursor-pointer list-none py-4 flex items-center justify-between text-base font-semibold select-none min-h-[44px]"
                style={{ color: "#143437" }}
              >
                What if it rains?
                <span
                  className="ml-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#039149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 8 10 13 15 8" />
                  </svg>
                </span>
              </summary>
              <p className="pb-4 text-base leading-relaxed" style={{ color: "#143437" }}>
                {/* PLACEHOLDER: Rain policy — e.g. "The event proceeds rain or shine. In the event of severe weather or lightning, the show may be postponed to July 5th." */}
                The event proceeds rain or shine. In the event of severe weather or lightning, the show may be postponed. Updates will be sent to your reservation email and posted on this page.
              </p>
            </details>

            <details className="group">
              <summary
                className="cursor-pointer list-none py-4 flex items-center justify-between text-base font-semibold select-none min-h-[44px]"
                style={{ color: "#143437" }}
              >
                Can I arrive early to set up?
                <span
                  className="ml-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#039149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 8 10 13 15 8" />
                  </svg>
                </span>
              </summary>
              <p className="pb-4 text-base leading-relaxed" style={{ color: "#143437" }}>
                {/* PLACEHOLDER: Setup time policy — e.g. "Gates open at 5:00 PM. Early setup before gate opening is not permitted." */}
                Gates open at 5:00 PM. Early setup before gate opening is not permitted. Tent spots are held until 7:00 PM; unclaimed spots may be released after that time.
              </p>
            </details>

            <details className="group">
              <summary
                className="cursor-pointer list-none py-4 flex items-center justify-between text-base font-semibold select-none min-h-[44px]"
                style={{ color: "#143437" }}
              >
                How do I cancel my reservation?
                <span
                  className="ml-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#039149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 8 10 13 15 8" />
                  </svg>
                </span>
              </summary>
              <p className="pb-4 text-base leading-relaxed" style={{ color: "#143437" }}>
                Use the cancellation link in your confirmation email, or email us at{" "}
                <a
                  href="mailto:events@pinetuck.com"
                  className="underline font-medium"
                  style={{ color: "#039149" }}
                >
                  {/* PLACEHOLDER: Contact email for cancellations */}
                  events@pinetuck.com
                </a>
                .
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* ── Footer Strip ──────────────────────────────────────────── */}
      <div
        className="w-full py-8 px-6 flex flex-col items-center gap-2 text-center"
        style={{ backgroundColor: "#135658" }}
      >
        <p className="text-sm font-medium" style={{ color: "#e6f4ed" }}>
          PineTuck Golf Course &middot; Rock Hill, SC &middot; July 4, 2026
        </p>
        <p className="text-sm" style={{ color: "#fff4df" }}>
          {/* PLACEHOLDER: Organizer name / organization */}
          Organized by PineTuck Events &amp; Community Foundation
        </p>
      </div>
    </section>
  );
}
