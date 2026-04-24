# PineTuck Fireworks — Tent Reservation Website

Free tent spot reservations for the July 4, 2026 fireworks at PineTuck Golf Course, Rock Hill, SC. Celebrating the 250th Independence Day (Semiquincentennial).

## What this is

A mobile-first web app where families click a numbered tent spot on an interactive map, enter their name and email, and receive a confirmation email with a one-click release link. Concurrent reservation attempts on the same spot are safe — the database's unique constraint guarantees exactly one reservation per spot.

## Features

- Interactive SVG map of the tent area (clubhouse → tent grid → 18th fairway)
- Click-to-reserve with modal form (name, email, optional phone)
- Visual states: available (green), reserved (gray with hover name), selected (cream)
- Confirmation email via Resend with a one-click release link
- "Find My Reservation" lookup by email
- `/release?token=...` page for one-click cancellations from email
- `/admin` dashboard (password-protected) with release-any-spot and CSV export
- 30-second polling so maps stay current without refresh

## Tech stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server components + route handlers in one project |
| Database | Prisma 7 + PostgreSQL (Supabase free tier) | Row-level unique constraint is the cleanest concurrent-booking guarantee |
| Styling | Tailwind v4 (CSS-first config) | Zero-runtime, mobile-first |
| Email | Resend free tier | 3k emails/month, simple API, good deliverability |
| Hosting | Vercel Hobby (free) | Auto-deploys from GitHub, custom domain support |

## Local development

### Prerequisites
- Node.js 18+
- A Supabase project (or any Postgres instance) with connection strings

### Setup

```bash
# 1. Clone and install
git clone <repo-url> pinetuck-fireworks
cd pinetuck-fireworks
npm install

# 2. Environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase URLs, Resend key, etc.

# 3. Database
npx prisma migrate deploy   # apply migrations
npx prisma db seed          # create the 80 spots (A1–H10)

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin dashboard

Visit [http://localhost:3000/admin](http://localhost:3000/admin) — browser prompts for HTTP Basic Auth password. Username is ignored; use whatever you set as `ADMIN_PASSWORD`.

## Customizing

### Event details (text content)
All organizer-specific text is in `components/EventInfo.tsx`. Search for `{{PLACEHOLDER` to find every item you need to fill in. The full list is in [`CONTENT_TODO.md`](CONTENT_TODO.md).

### Tent grid size
The grid is defined in `components/TentMap.tsx` (constants `ROWS` and `COLS`) and the seed in `prisma/seed.ts`. To change from 8×10 to a different size:
1. Update `ROWS` and `COLS` in `TentMap.tsx`
2. Update the row/col loops in `prisma/seed.ts`
3. Re-run `npx prisma db seed`

### Colors and fonts
Design tokens are in `app/globals.css` under `@theme`. The source design reference is documented in [`DESIGN_TOKENS.md`](DESIGN_TOKENS.md).

### Email templates
Edit `lib/email.ts` — both functions use inline HTML strings with full inline styles (required for email client compatibility).

## Deployment

See [`DEPLOY.md`](DEPLOY.md) for step-by-step instructions written for non-developers, covering Supabase setup, Vercel deployment, environment variables, migrations, and custom domain.

## Concurrent-booking guarantee

When two users click the same spot simultaneously, only one `INSERT` into the `reservations` table can succeed — the `spotId` column has a `@unique` constraint at the database level. The API catches Prisma error code `P2002`, inspects which field caused the conflict (`spotId` vs `email`), and returns a 409 with a user-friendly message. The other user's request fails gracefully and is told to pick a different spot.

See `app/api/reserve/route.ts` lines 41–68 for the annotated implementation.

## Testing

See [`TESTING.md`](TESTING.md) for how to run the concurrent-booking test script:

```bash
npm run dev  # in one terminal
npx tsx tests/concurrent.test.ts  # in another
```

## Project structure

```
app/
  page.tsx              # Home page (shell)
  layout.tsx            # Root layout + metadata
  globals.css           # Tailwind v4 config + design tokens
  admin/page.tsx        # Admin dashboard (server component)
  release/page.tsx      # One-click spot release from email link
  api/
    spots/route.ts      # GET — list all spots with reservation status
    reserve/route.ts    # POST — claim a spot (concurrent-safe)
    release/route.ts    # POST — release by token (from email link)
    my-reservation/     # GET — look up by email
    admin/release/      # POST — admin release by reservation ID
components/
  TentMap.tsx           # SVG interactive map
  MapSection.tsx        # Client shell: state, fetch, modal, toast
  ReservationModal.tsx  # Reservation form modal
  Toast.tsx             # Success/error toast notifications
  EventInfo.tsx         # Public event info (server component)
  AdminClient.tsx       # Admin table + CSV export (client component)
lib/
  db.ts                 # Prisma singleton
  email.ts              # Resend email functions
prisma/
  schema.prisma         # Spot + Reservation models
  seed.ts               # Seeds 80 spots (A1–H10)
  migrations/           # Prisma migration history
middleware.ts           # HTTP Basic Auth for /admin and /api/admin
tests/
  concurrent.test.ts    # Concurrent-booking + end-to-end test script
```

## Constraints honored
- No user accounts, no payment, no social features
- No paid service tiers required
- Secrets are never committed (`.env*` is in `.gitignore`)
