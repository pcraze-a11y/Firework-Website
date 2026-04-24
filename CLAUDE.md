@AGENTS.md

# Pinetuck Fireworks — Project Guide for Claude

## What this is
A free tent-spot reservation site for the July 4, 2026 fireworks at Pinetuck Golf Course, Rock Hill SC. Families click a map, fill in name + email, get a confirmation email with a one-click release link. Admin dashboard at `/admin`.

## Where things live
```
app/page.tsx                    → shell (MapSection + EventInfo)
components/MapSection.tsx       → all interactive state (client component)
components/TentMap.tsx          → pure SVG map, no state
components/ReservationModal.tsx → reservation form modal
components/Toast.tsx            → success/error toast
components/EventInfo.tsx        → server component, all public info
components/AdminClient.tsx      → admin table + CSV export
app/admin/page.tsx              → server component, fetches reservations
app/api/reserve/route.ts        → POST, concurrent-booking guarantee here
app/api/release/route.ts        → POST by token
app/api/spots/route.ts          → GET all spots
app/api/my-reservation/route.ts → GET by email
app/api/admin/release/route.ts  → POST by reservationId (admin only)
app/release/page.tsx            → server page for email release links
lib/db.ts                       → Prisma singleton with adapter-pg
lib/email.ts                    → Resend integration (lazy init)
proxy.ts                        → HTTP Basic Auth for /admin and /api/admin
prisma/schema.prisma            → Spot + Reservation models
prisma/seed.ts                  → seeds 80 spots A1–H10
```

## Running locally

### Prerequisites
- The life-management-system Docker Postgres container must be running (`lms-postgres` on port 5432)
- The `pinetuck` database must exist in it

### First-time DB setup
```bash
docker exec lms-postgres psql -U lms -c "CREATE DATABASE pinetuck;"
cd /c/Users/Pacra/PinetuckShow
DATABASE_URL="postgresql://lms:lms_dev_password@localhost:5432/pinetuck" \
DIRECT_URL="postgresql://lms:lms_dev_password@localhost:5432/pinetuck" \
  npx prisma db push
DATABASE_URL="postgresql://lms:lms_dev_password@localhost:5432/pinetuck" \
  npx tsx prisma/seed.ts
```

### Dev server
```bash
cd /c/Users/Pacra/PinetuckShow
DATABASE_URL="postgresql://lms:lms_dev_password@localhost:5432/pinetuck" \
DIRECT_URL="postgresql://lms:lms_dev_password@localhost:5432/pinetuck" \
RESEND_API_KEY="re_placeholder" \
EMAIL_FROM="noreply@localhost" \
NEXT_PUBLIC_SITE_URL="http://localhost:3001" \
ADMIN_PASSWORD="admin" \
  npm run dev -- --port 3001
```

Admin: http://localhost:3001/admin (password: `admin`)

### ⚠ Shell env caveat
The life-management-system injects `DATABASE_URL` into the shell. **Always prefix Prisma CLI commands** with the explicit env vars above, or they silently connect to the LMS database. `dotenv` does NOT override already-set shell vars.

### ⚠ Working directory
**Always `cd /c/Users/Pacra/PinetuckShow` before any npm/npx command.** The Bash tool's working directory drifts to life-management-system between sessions.

## Critical tech stack notes (breaking changes)

### Prisma 7
- `url` and `directUrl` are **NOT allowed in `schema.prisma`** — removed in Prisma 7.
- CLI connection URL goes in `prisma.config.ts` → `datasource.url`. Use `DIRECT_URL` (non-pooled) there.
- Runtime requires `@prisma/adapter-pg` passed to `new PrismaClient({ adapter })`. See `lib/db.ts`.
- Use `prisma db push` for local dev. Use `prisma migrate deploy` for production.

### Next.js 16
- `middleware.ts` is **deprecated** → file is now `proxy.ts`, export function is `proxy()` not `middleware()`.
- `params` in route handlers is a **Promise** — `await params`.
- Use `Response.json(...)` not `NextResponse.json(...)` in route handlers.
- `searchParams` in server pages is also a Promise — `await searchParams`.

### Tailwind v4
- **CSS-first config** — no `tailwind.config.ts`. All tokens in `app/globals.css` under `@theme inline { }`.
- Google Fonts `@import url(...)` must come **before** `@import "tailwindcss"`.
- Custom color utilities: `text-brand-text`, `bg-brand-dark-teal`, etc. — all defined in globals.css.

### Resend (email)
- `new Resend(key)` throws at instantiation if key is missing — **never instantiate at module level**.
- `lib/email.ts` uses a lazy `getResend()` call inside each function, after the early-return guard.

## Concurrent-booking guarantee
`app/api/reserve/route.ts` lines ~41–68. `Reservation` has `@unique` on `spotId` and `email`. On conflict, Prisma throws `P2002`; we inspect `meta.target` to return `spot_taken` vs `email_exists`.

## Content placeholders
All 13 organizer-specific placeholders are in `components/EventInfo.tsx`. See `CONTENT_TODO.md`. Search `{{PLACEHOLDER` to find them.

## Deploying to production
See `DEPLOY.md` — written for non-developers. Supabase (Postgres) + Vercel + Resend, all free tiers.
