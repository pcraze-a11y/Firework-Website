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

      {/* ── Sneak Peek Video ──────────────────────────────────────── */}
      <div className="w-full py-16 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center" style={{ color: "#0D1B4B" }}>
            Sneak Peek
          </h2>
          <div className="w-full rounded-xl overflow-hidden" style={{ position: "relative", paddingBottom: "56.25%", height: 0, boxShadow: "0 4px 24px rgba(20,52,55,0.15)" }}>
            <iframe
              src="https://www.youtube.com/embed/LXlV4Tm9e8k"
              title="Sneak Peek"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>

          {/* Shell Trajectory Chart */}
          <div className="mt-16 flex items-start gap-8">
          <div className="rounded overflow-hidden flex-shrink-0" style={{ width: "75%", border: "1px solid rgba(20,50,100,0.12)", backgroundColor: "#f4f7fb" }}>
            <svg id="mainChart" viewBox="0 0 1060 700" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "auto" }} fontFamily="'Barlow Condensed',sans-serif">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dde8f5"/>
                  <stop offset="100%" stopColor="#eef3fa"/>
                </linearGradient>
                <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c8d4e0"/>
                  <stop offset="100%" stopColor="#b8c4d0"/>
                </linearGradient>
                <linearGradient id="bldgGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2a4a80" stopOpacity="0.85"/>
                  <stop offset="50%" stopColor="#3a6ab8" stopOpacity="0.65"/>
                  <stop offset="100%" stopColor="#2a4a80" stopOpacity="0.85"/>
                </linearGradient>
                <filter id="glow1" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="glowStrong" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="buildingGlow" x="-20%" y="-5%" width="140%" height="115%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <rect width="1060" height="700" fill="url(#skyGrad)"/>
              <g stroke="rgba(20,50,100,0.08)" strokeWidth="1">
                <line x1="90" y1="554" x2="1040" y2="554"/><line x1="90" y1="489" x2="1040" y2="489"/>
                <line x1="90" y1="423" x2="1040" y2="423"/><line x1="90" y1="358" x2="1040" y2="358"/>
                <line x1="90" y1="292" x2="1040" y2="292"/><line x1="90" y1="226" x2="1040" y2="226"/>
                <line x1="90" y1="161" x2="1040" y2="161"/><line x1="90" y1="95"  x2="1040" y2="95"/>
                <line x1="90" y1="49"  x2="1040" y2="49"/>
              </g>
              <rect x="0" y="620" width="1060" height="80" fill="url(#groundGrad)"/>
              <line x1="0" y1="620" x2="1060" y2="620" stroke="rgba(20,50,100,0.3)" strokeWidth="1.5"/>
              <g fill="rgba(20,50,100,0.6)" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" letterSpacing="1">
                <text x="82" y="558" textAnchor="end">100</text><text x="82" y="493" textAnchor="end">200</text>
                <text x="82" y="427" textAnchor="end">300</text><text x="82" y="362" textAnchor="end">400</text>
                <text x="82" y="296" textAnchor="end">500</text><text x="82" y="230" textAnchor="end">600</text>
                <text x="82" y="165" textAnchor="end">700</text><text x="82" y="99"  textAnchor="end">800</text>
              </g>
              <text transform="rotate(-90,18,330)" x="0" y="0" fill="rgba(20,50,100,0.4)" fontSize="11" letterSpacing="3" textAnchor="middle" fontFamily="'Barlow Condensed',sans-serif">ALTITUDE (FEET)</text>
              <line x1="90" y1="30" x2="90" y2="620" stroke="rgba(20,50,100,0.2)" strokeWidth="1"/>
              <line x1="90" y1="49" x2="920" y2="49" stroke="rgba(20,50,100,0.2)" strokeWidth="1" strokeDasharray="4 6"/>
              <text x="86" y="46" textAnchor="end" fill="rgba(20,50,100,0.6)" fontSize="10" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">871</text>
              <g id="building" filter="url(#buildingGlow)">
                <rect x="924" y="617" width="52" height="3" fill="none" stroke="#2a4a80" strokeWidth="1.5"/>
                <rect x="928" y="240" width="44" height="380" fill="url(#bldgGrad)" stroke="#3a6ab0" strokeWidth="1"/>
                <rect x="932" y="190" width="36" height="52" fill="url(#bldgGrad)" stroke="#3a6ab0" strokeWidth="1"/>
                <rect x="935" y="155" width="30" height="37" fill="url(#bldgGrad)" stroke="#3a6ab0" strokeWidth="1"/>
                <rect x="938" y="120" width="24" height="37" fill="url(#bldgGrad)" stroke="#3a6ab0" strokeWidth="1"/>
                <rect x="942" y="80"  width="16" height="42" fill="url(#bldgGrad)" stroke="#4a7ac0" strokeWidth="1"/>
                <line x1="950" y1="49" x2="950" y2="82" stroke="#2a5090" strokeWidth="2.5"/>
                <polygon points="950,49 946,68 954,68" fill="none" stroke="#C8102E" strokeWidth="1.5"/>
                <g stroke="rgba(20,60,140,0.15)" strokeWidth="0.5">
                  <line x1="929" y1="260" x2="971" y2="260"/><line x1="929" y1="280" x2="971" y2="280"/>
                  <line x1="929" y1="300" x2="971" y2="300"/><line x1="929" y1="320" x2="971" y2="320"/>
                  <line x1="929" y1="340" x2="971" y2="340"/><line x1="929" y1="360" x2="971" y2="360"/>
                  <line x1="929" y1="380" x2="971" y2="380"/><line x1="929" y1="400" x2="971" y2="400"/>
                  <line x1="929" y1="420" x2="971" y2="420"/><line x1="929" y1="440" x2="971" y2="440"/>
                  <line x1="929" y1="460" x2="971" y2="460"/><line x1="929" y1="480" x2="971" y2="480"/>
                  <line x1="929" y1="500" x2="971" y2="500"/><line x1="929" y1="520" x2="971" y2="520"/>
                  <line x1="929" y1="540" x2="971" y2="540"/><line x1="929" y1="560" x2="971" y2="560"/>
                  <line x1="929" y1="580" x2="971" y2="580"/><line x1="929" y1="600" x2="971" y2="600"/>
                  <line x1="950" y1="82" x2="950" y2="617"/>
                </g>
                <rect x="933" y="263" width="4" height="3" fill="rgba(30,80,180,0.25)" rx="0.5"/>
                <rect x="940" y="283" width="4" height="3" fill="rgba(30,80,180,0.18)" rx="0.5"/>
                <rect x="955" y="303" width="4" height="3" fill="rgba(30,80,180,0.22)" rx="0.5"/>
                <rect x="963" y="343" width="4" height="3" fill="rgba(30,80,180,0.15)" rx="0.5"/>
                <rect x="935" y="383" width="4" height="3" fill="rgba(30,80,180,0.20)" rx="0.5"/>
                <rect x="960" y="423" width="4" height="3" fill="rgba(30,80,180,0.18)" rx="0.5"/>
                <rect x="944" y="463" width="4" height="3" fill="rgba(30,80,180,0.25)" rx="0.5"/>
                <rect x="933" y="503" width="4" height="3" fill="rgba(30,80,180,0.15)" rx="0.5"/>
              </g>
              <text x="950" y="642" textAnchor="middle" fill="rgba(20,50,100,0.75)" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily="'Barlow Condensed',sans-serif">BANK OF AMERICA</text>
              <text x="950" y="655" textAnchor="middle" fill="rgba(20,50,100,0.5)" fontSize="10" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">CORPORATE CENTER</text>
              <text x="950" y="666" textAnchor="middle" fill="rgba(100,60,10,0.7)" fontSize="9" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">871 FT · CHARLOTTE, NC</text>
              <circle cx="110" cy="620" r="4" fill="#9a6e10" opacity="0.8"/>
              <text x="112" y="638" fill="rgba(100,60,10,0.6)" fontSize="9" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">LAUNCH</text>
              {/* 1 inch */}
              <path d="M 200,620 L 200,554" fill="none" stroke="#e87070" strokeWidth="2" strokeDasharray="7 5" opacity="0.9"/>
              <circle cx="200" cy="554" r="14" fill="none" stroke="#e87070" strokeWidth="1.2" opacity="0.5"/>
              <circle cx="200" cy="554" r="14" fill="rgba(232,112,112,0.08)"/>
              <g transform="translate(200,554)" filter="url(#glow1)">
                <g stroke="#e87070" strokeWidth="1.2" fill="none" opacity="0.95">
                  <line x1="0" y1="-9" x2="0" y2="-14"/><line x1="0" y1="9" x2="0" y2="14"/>
                  <line x1="-9" y1="0" x2="-14" y2="0"/><line x1="9" y1="0" x2="14" y2="0"/>
                  <line x1="-6.4" y1="-6.4" x2="-9.9" y2="-9.9"/><line x1="6.4" y1="-6.4" x2="9.9" y2="-9.9"/>
                  <line x1="-6.4" y1="6.4" x2="-9.9" y2="9.9"/><line x1="6.4" y1="6.4" x2="9.9" y2="9.9"/>
                </g>
                <circle cx="0" cy="0" r="3" fill="#e87070" opacity="0.9"/>
              </g>
              <text x="220" y="551" fill="#e87070" fontSize="13" fontWeight="600" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">1 in</text>
              <text x="220" y="563" fill="rgba(232,112,112,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="'Barlow Condensed',sans-serif">100 FT · 45 FT BURST</text>
              {/* 2 inch */}
              <path d="M 280,620 L 280,489" fill="none" stroke="#e8904a" strokeWidth="2" strokeDasharray="7 5" opacity="0.9"/>
              <circle cx="280" cy="489" r="19" fill="none" stroke="#e8904a" strokeWidth="1.2" opacity="0.5"/>
              <circle cx="280" cy="489" r="19" fill="rgba(232,144,74,0.08)"/>
              <g transform="translate(280,489)" filter="url(#glow1)">
                <g stroke="#e8904a" strokeWidth="1.3" fill="none" opacity="0.95">
                  <line x1="0" y1="-11" x2="0" y2="-17"/><line x1="0" y1="11" x2="0" y2="17"/>
                  <line x1="-11" y1="0" x2="-17" y2="0"/><line x1="11" y1="0" x2="17" y2="0"/>
                  <line x1="-7.8" y1="-7.8" x2="-12" y2="-12"/><line x1="7.8" y1="-7.8" x2="12" y2="-12"/>
                  <line x1="-7.8" y1="7.8" x2="-12" y2="12"/><line x1="7.8" y1="7.8" x2="12" y2="12"/>
                </g>
                <circle cx="0" cy="0" r="3.5" fill="#e8904a" opacity="0.9"/>
              </g>
              <text x="304" y="486" fill="#e8904a" fontSize="13" fontWeight="600" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">2 in</text>
              <text x="304" y="498" fill="rgba(232,144,74,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="'Barlow Condensed',sans-serif">200 FT · 90 FT BURST</text>
              {/* 3 inch */}
              <path d="M 380,620 L 380,423" fill="none" stroke="#e8c84a" strokeWidth="2" strokeDasharray="7 5" opacity="0.9"/>
              <circle cx="380" cy="423" r="29" fill="none" stroke="#e8c84a" strokeWidth="1.2" opacity="0.45"/>
              <circle cx="380" cy="423" r="29" fill="rgba(232,200,74,0.07)"/>
              <g transform="translate(380,423)" filter="url(#glow1)">
                <g stroke="#e8c84a" strokeWidth="1.4" fill="none" opacity="0.95">
                  <line x1="0" y1="-13" x2="0" y2="-20"/><line x1="0" y1="13" x2="0" y2="20"/>
                  <line x1="-13" y1="0" x2="-20" y2="0"/><line x1="13" y1="0" x2="20" y2="0"/>
                  <line x1="-9.2" y1="-9.2" x2="-14.1" y2="-14.1"/><line x1="9.2" y1="-9.2" x2="14.1" y2="-14.1"/>
                  <line x1="-9.2" y1="9.2" x2="-14.1" y2="14.1"/><line x1="9.2" y1="9.2" x2="14.1" y2="14.1"/>
                </g>
                <circle cx="0" cy="0" r="4" fill="#e8c84a" opacity="0.9"/>
              </g>
              <text x="404" y="420" fill="#e8c84a" fontSize="13" fontWeight="600" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">3 in</text>
              <text x="404" y="432" fill="rgba(232,200,74,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="'Barlow Condensed',sans-serif">300 FT · 135 FT BURST</text>
              {/* 4 inch */}
              <path d="M 490,620 L 490,358" fill="none" stroke="#6aaa10" strokeWidth="2" strokeDasharray="7 5" opacity="0.9"/>
              <circle cx="490" cy="358" r="39" fill="none" stroke="#6aaa10" strokeWidth="1.2" opacity="0.4"/>
              <circle cx="490" cy="358" r="39" fill="rgba(106,170,16,0.06)"/>
              <g transform="translate(490,358)" filter="url(#glow1)">
                <g stroke="#6aaa10" strokeWidth="1.5" fill="none" opacity="0.95">
                  <line x1="0" y1="-15" x2="0" y2="-24"/><line x1="0" y1="15" x2="0" y2="24"/>
                  <line x1="-15" y1="0" x2="-24" y2="0"/><line x1="15" y1="0" x2="24" y2="0"/>
                  <line x1="-10.6" y1="-10.6" x2="-17" y2="-17"/><line x1="10.6" y1="-10.6" x2="17" y2="-17"/>
                  <line x1="-10.6" y1="10.6" x2="-17" y2="17"/><line x1="10.6" y1="10.6" x2="17" y2="17"/>
                </g>
                <circle cx="0" cy="0" r="4.5" fill="#6aaa10" opacity="0.9"/>
              </g>
              <text x="520" y="355" fill="#6aaa10" fontSize="13" fontWeight="600" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">4 in</text>
              <text x="520" y="367" fill="rgba(106,170,16,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="'Barlow Condensed',sans-serif">400 FT · 180 FT BURST</text>
              {/* 5 inch */}
              <path d="M 590,620 L 590,292" fill="none" stroke="#0a9a78" strokeWidth="2.2" strokeDasharray="7 5" opacity="0.9"/>
              <circle cx="590" cy="292" r="48" fill="none" stroke="#0a9a78" strokeWidth="1.2" opacity="0.38"/>
              <circle cx="590" cy="292" r="48" fill="rgba(10,154,120,0.06)"/>
              <g transform="translate(590,292)" filter="url(#glowStrong)">
                <g stroke="#0a9a78" strokeWidth="1.6" fill="none" opacity="0.95">
                  <line x1="0" y1="-17" x2="0" y2="-27"/><line x1="0" y1="17" x2="0" y2="27"/>
                  <line x1="-17" y1="0" x2="-27" y2="0"/><line x1="17" y1="0" x2="27" y2="0"/>
                  <line x1="-12" y1="-12" x2="-19.1" y2="-19.1"/><line x1="12" y1="-12" x2="19.1" y2="-19.1"/>
                  <line x1="-12" y1="12" x2="-19.1" y2="19.1"/><line x1="12" y1="12" x2="19.1" y2="19.1"/>
                </g>
                <circle cx="0" cy="0" r="5" fill="#0a9a78" opacity="0.9"/>
              </g>
              <text x="625" y="289" fill="#0a9a78" fontSize="13" fontWeight="600" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">5 in</text>
              <text x="625" y="301" fill="rgba(10,154,120,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="'Barlow Condensed',sans-serif">500 FT · 225 FT BURST</text>
              {/* 6 inch */}
              <path d="M 700,620 L 700,226" fill="none" stroke="#4ab4e8" strokeWidth="2.2" strokeDasharray="7 5" opacity="0.9"/>
              <circle cx="700" cy="226" r="58" fill="none" stroke="#4ab4e8" strokeWidth="1.2" opacity="0.35"/>
              <circle cx="700" cy="226" r="58" fill="rgba(74,180,232,0.06)"/>
              <g transform="translate(700,226)" filter="url(#glowStrong)">
                <g stroke="#4ab4e8" strokeWidth="1.7" fill="none" opacity="0.95">
                  <line x1="0" y1="-19" x2="0" y2="-30"/><line x1="0" y1="19" x2="0" y2="30"/>
                  <line x1="-19" y1="0" x2="-30" y2="0"/><line x1="19" y1="0" x2="30" y2="0"/>
                  <line x1="-13.4" y1="-13.4" x2="-21.2" y2="-21.2"/><line x1="13.4" y1="-13.4" x2="21.2" y2="-21.2"/>
                  <line x1="-13.4" y1="13.4" x2="-21.2" y2="21.2"/><line x1="13.4" y1="13.4" x2="21.2" y2="21.2"/>
                </g>
                <circle cx="0" cy="0" r="5.5" fill="#4ab4e8" opacity="0.9"/>
              </g>
              <text x="738" y="223" fill="#4ab4e8" fontSize="13" fontWeight="600" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">6 in</text>
              <text x="738" y="235" fill="rgba(74,180,232,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="'Barlow Condensed',sans-serif">600 FT · 270 FT BURST</text>
              {/* 8 inch */}
              <path d="M 820,620 L 820,95" fill="none" stroke="#1a3a7a" strokeWidth="2.5" strokeDasharray="9 5" opacity="0.95"/>
              <circle cx="820" cy="95" r="77" fill="none" stroke="#1a3a7a" strokeWidth="1.3" opacity="0.3"/>
              <circle cx="820" cy="95" r="77" fill="rgba(26,58,122,0.05)"/>
              <g transform="translate(820,95)" filter="url(#glowStrong)">
                <g stroke="#1a3a7a" strokeWidth="2" fill="none" opacity="0.98">
                  <line x1="0" y1="-22" x2="0" y2="-35"/><line x1="0" y1="22" x2="0" y2="35"/>
                  <line x1="-22" y1="0" x2="-35" y2="0"/><line x1="22" y1="0" x2="35" y2="0"/>
                  <line x1="-15.6" y1="-15.6" x2="-24.7" y2="-24.7"/><line x1="15.6" y1="-15.6" x2="24.7" y2="-24.7"/>
                  <line x1="-15.6" y1="15.6" x2="-24.7" y2="24.7"/><line x1="15.6" y1="15.6" x2="24.7" y2="24.7"/>
                </g>
                <circle cx="0" cy="0" r="6" fill="#1a3a7a" opacity="0.95"/>
              </g>
              <text x="820" y="44" textAnchor="middle" fill="#1a3a7a" fontSize="14" fontWeight="700" letterSpacing="1" fontFamily="'Barlow Condensed',sans-serif">8 in</text>
              <text x="820" y="56" textAnchor="middle" fill="rgba(26,58,122,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="'Barlow Condensed',sans-serif">800 FT · 360 FT BURST</text>
            </svg>
          </div>

          <p className="flex-1 text-base text-left font-bold" style={{ color: "#0D1B4B" }}>
            This year&rsquo;s show will include more than 2,000 shells and effects including monstrous 8 inch aerial shells!
          </p>
          </div>
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
