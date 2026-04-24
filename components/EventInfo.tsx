export default function EventInfo() {
  return (
    <section className="w-full font-sans">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "420px" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/fireworks_header.mp4"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,20,60,0.55)" }} />
        <div className="relative z-10 w-full py-20 md:py-32 px-6 flex flex-col items-center text-center gap-6">
          <h1
            className="text-4xl md:text-6xl font-semibold leading-tight"
            style={{ color: "#F0F4FF", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            America&rsquo;s 250<sup>th</sup> &mdash; A July 4th Pyromusical
          </h1>
          <p className="text-lg md:text-xl max-w-2xl" style={{ color: "#EEF2FF", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
            Join us for a special, family-oriented celebration of America&rsquo;s 250th Independence Day&mdash;the largest pyromusical in the Carolinas. Invite your friends and neighbors, gather your family, and bring lawn chairs and blankets. Every shell and effect is synchronized to music to tell a story&mdash;celebrating freedom, sacrifice, and the American spirit.
          </p>
          <span
            className="inline-block text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
            style={{ backgroundColor: "#BF0A30", color: "#F0F4FF" }}
          >
            Saturday, July 4, 2026
          </span>
        </div>
      </div>

      {/* ── Event Details Grid ─────────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6" style={{ backgroundColor: "#F0F4FF" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center" style={{ color: "#0D1B4B" }}>
            Event Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Date */}
            <div className="flex items-start gap-4 p-6 rounded-xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BF0A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#BF0A30" }}>Date</p>
                <p className="text-base font-medium" style={{ color: "#0D1B4B" }}>Saturday, July 4, 2026</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 p-6 rounded-xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BF0A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#BF0A30" }}>Location</p>
                <p className="text-base font-medium" style={{ color: "#0D1B4B" }}>
                  Pinetuck Golf Course<br />
                  2578 Tuckaway Rd, Rock Hill, SC 29730
                </p>
              </div>
            </div>

            {/* Venue Opens */}
            <div className="flex items-start gap-4 p-6 rounded-xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BF0A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#BF0A30" }}>Venue Opens</p>
                <p className="text-base font-medium" style={{ color: "#0D1B4B" }}>6:30 PM</p>
              </div>
            </div>

            {/* Show Begins */}
            <div className="flex items-start gap-4 p-6 rounded-xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BF0A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#BF0A30" }}>Pyromusical Begins</p>
                <p className="text-base font-medium" style={{ color: "#0D1B4B" }}>9:20 PM &mdash; approx. 15 minutes</p>
              </div>
            </div>

            {/* Admission */}
            <div className="flex items-start gap-4 p-6 rounded-xl md:col-span-2" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <span className="shrink-0 mt-0.5" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BF0A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V22H4V12" />
                  <path d="M22 7H2v5h20V7z" />
                  <path d="M12 22V7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "#BF0A30" }}>Admission</p>
                <p className="text-base font-medium" style={{ color: "#0D1B4B" }}>Free. No tickets or purchase required. This is a free community event.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Schedule ──────────────────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center" style={{ color: "#0D1B4B" }}>
            Schedule
          </h2>
          <ol className="space-y-4">
            {[
              { time: "6:30 PM", label: "Venue opens" },
              { time: "6:30–9:20 PM", label: "Pre-show gathering, activities, and treat tents hosted by families and church groups" },
              { time: "9:20 PM", label: "Pyromusical begins" },
              { time: "~9:35 PM", label: "Show concludes (approx. 15 minutes)" },
            ].map(({ time, label }) => (
              <li key={time} className="flex items-start gap-4">
                <span
                  className="shrink-0 text-sm font-semibold w-32 pt-0.5"
                  style={{ color: "#BF0A30" }}
                >
                  {time}
                </span>
                <span className="text-base" style={{ color: "#0D1B4B" }}>{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── Participate — Reserve a Tent Space ────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6" style={{ backgroundColor: "#EEF2FF" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center" style={{ color: "#0D1B4B" }}>
            Reserve a Space for an Event Tent
          </h2>
          <p className="text-base leading-relaxed mb-6 text-center" style={{ color: "#0D1B4B" }}>
            Families and church groups are invited to host free treat tents for the community. All treats are provided <strong>free of charge</strong> as a way to serve and connect with others.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#BF0A30" }}>Treat ideas</p>
              <ul className="space-y-1.5 text-base" style={{ color: "#0D1B4B" }}>
                {["Snow cones", "Cotton candy", "Donuts", "Watermelon", "Ice water"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#BF0A30" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#BF0A30" }}>Tent host guidelines</p>
              <ul className="space-y-1.5 text-base" style={{ color: "#0D1B4B" }}>
                {[
                  "Open to families and church groups",
                  "All items must be free — no selling or fundraising",
                  "Standard tent size: 10×10",
                  "Setup / teardown times provided upon approval",
                  "Reservations are subject to confirmation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: "#039149" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="/reserve#map"
              className="inline-block font-semibold rounded px-9 py-3.5 min-h-[44px] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 no-underline"
              style={{ backgroundColor: "#BF0A30", color: "#F0F4FF", borderRadius: "6px", textDecoration: "none" }}
            >
              Reserve a Tent Space
            </a>
          </div>
        </div>
      </div>

      {/* ── Family Environment ────────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center" style={{ color: "#0D1B4B" }}>
            Family Environment
          </h2>
          <p className="text-base leading-relaxed mb-6 text-center" style={{ color: "#0D1B4B" }}>
            To help create a safe and welcoming environment for everyone, we ask all attendees to follow these simple guidelines. By attending, you agree to follow these guidelines. Event organizers reserve the right to ask anyone who does not comply to leave.
          </p>
          <ul className="space-y-4">
            {[
              "This is an alcohol-free event",
              "No smoking or vaping",
              "No personal fireworks or drones",
              "Conduct yourself in a Christ-like manner at all times",
              "Follow all posted instructions and guidance from event staff",
              "Please carry out all of your trash — this is a volunteer-run event",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#BF0A30" }}
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                </span>
                <span className="text-base" style={{ color: "#0D1B4B" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Viewing Experience ────────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6" style={{ backgroundColor: "#F5F7FF" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: "#0D1B4B" }}>
            Viewing Experience
          </h2>
          <ul className="space-y-4">
            {[
              "Bring lawn chairs or blankets",
              "Plan to sit facing the designated launch area",
              "Follow posted guidance for viewing zones",
              "Audio for the show will be available via on-site sound system",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#002868" }}
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                </span>
                <span className="text-base" style={{ color: "#0D1B4B" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Site Map ─────────────────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6" style={{ backgroundColor: "#EEF2FF" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: "#0D1B4B" }}>
            Event Site Map
          </h2>
          <img
            src="/site-map.jpg"
            alt="Pinetuck Golf Course event site map showing audience view area, event tents, parking areas, handicap parking, and fireworks discharge zone"
            className="w-full rounded-xl"
            style={{ boxShadow: "0 4px 24px rgba(20,52,55,0.15)" }}
          />
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center" style={{ color: "#0D1B4B" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-0 divide-y" style={{ borderColor: "#b0b8d1" }}>
            {[
              {
                q: "Is this event open to the public?",
                a: "Yes. Friends, neighbors, and families are all welcome.",
              },
              {
                q: "Is there a cost to attend?",
                a: "No. This is a completely free event. No tickets or purchase required.",
              },
              {
                q: "Is alcohol allowed?",
                a: "No. This is an alcohol-free event.",
              },
              {
                q: "Can I smoke or vape?",
                a: "No. Smoking and vaping are not permitted anywhere on the venue grounds.",
              },
              {
                q: "Can I bring outside food?",
                a: "Yes, but please carry out all of your trash. This is a free event with no paid staff to clean up afterwards.",
              },
              {
                q: "Can I sell food or products?",
                a: "No. All food and treats at this event are provided free of charge by volunteer tent hosts. No selling or fundraising is permitted.",
              },
              {
                q: "Can I reserve more than one tent spot?",
                a: "One spot per family or group per email address. If you have an exceptional need, please contact us.",
              },
              {
                q: "What happens if it rains?",
                a: "Pray for no rain. Weather updates will be posted on this page if needed.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group">
                <summary
                  className="cursor-pointer list-none py-4 flex items-center justify-between text-base font-semibold select-none min-h-[44px]"
                  style={{ color: "#0D1B4B" }}
                >
                  {q}
                  <span className="ml-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#BF0A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="5 8 10 13 15 8" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-4 text-base leading-relaxed" style={{ color: "#0D1B4B" }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hosted By ─────────────────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6" style={{ backgroundColor: "#EEF2FF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0D1B4B" }}>
            Hosted By
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#0D1B4B" }}>
            This event is hosted by the Fort Mill South Carolina Stake of The Church of Jesus Christ of Latter-day Saints. The use of the golf course and the professional fireworks have been donated.
          </p>
        </div>
      </div>

    </section>
  );
}
