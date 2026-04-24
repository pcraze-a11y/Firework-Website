import Link from "next/link"

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function ReleasePage({ searchParams }: Props) {
  const { token } = await searchParams

  let released = false
  let spotId: string | null = null

  if (token) {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    try {
      const res = await fetch(`${base}/api/release`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        cache: "no-store",
      })
      if (res.ok) {
        const data = (await res.json()) as { released: boolean; spotId: string }
        released = data.released
        spotId = data.spotId ?? null
      }
    } catch {
      // network error — released stays false
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-smoke px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-[12px] shadow-card overflow-hidden">
        <div className="bg-brand-dark-teal px-8 py-6">
          <p className="text-white text-xl font-semibold font-sans m-0">
            PineTuck Fireworks &middot; July 4, 2026
          </p>
        </div>

        <div className="px-8 py-10">
          {released ? (
            <>
              <h1 className="text-2xl font-semibold text-brand-heading mb-4">Spot Released</h1>
              <p className="text-brand-text text-base leading-relaxed mb-2">
                {spotId ? (
                  <>
                    Tent Spot <strong>{spotId}</strong> has been released and is now available for
                    another family.
                  </>
                ) : (
                  "Your spot has been released and is now available for another family."
                )}
              </p>
              <p className="text-brand-text text-base leading-relaxed mb-8">
                Thank you for letting another family enjoy the fireworks.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-brand-error mb-4">Invalid Link</h1>
              <p className="text-brand-text text-base leading-relaxed mb-8">
                This release link is invalid or has already been used.
              </p>
            </>
          )}

          <Link
            href="/"
            className="inline-block bg-brand-cream text-brand-darker-teal font-semibold rounded px-9 py-3 hover:bg-brand-mint transition-colors"
          >
            Back to reservations
          </Link>
        </div>

        <div className="border-t border-brand-silver px-8 py-4">
          <p className="text-center text-sm text-brand-silver m-0">
            PineTuck Golf Course &middot; Rock Hill, SC
          </p>
        </div>
      </div>
    </main>
  )
}
