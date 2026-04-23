# Testing Guide

## Prerequisites
1. A local Postgres database running (or Supabase credentials in `.env.local`)
2. The database seeded: `npx prisma db seed`
3. The dev server running: `npm run dev`

## Run the concurrent-booking test
```bash
npx tsx tests/concurrent.test.ts
# Against a different URL:
npx tsx tests/concurrent.test.ts --base-url https://staging.yoursite.com
```

## What it tests
- **Concurrent race**: 5 simultaneous requests for the same spot → exactly 1 succeeds
- **Duplicate email**: same email can't hold two spots
- **End-to-end flow**: reserve → look up → release
- **API health**: spots endpoint returns valid JSON

## Manual testing checklist
- [ ] Load the site on a mobile device — map fits the screen, spots are tappable
- [ ] Reserve a spot — confirm email arrives with a working release link
- [ ] Click the release link — spot appears available again on the map
- [ ] Try to reserve a spot that someone else just reserved — see the "spot taken" error
- [ ] Visit /admin — browser prompts for password — enter ADMIN_PASSWORD
- [ ] Click Export CSV — file downloads with all reservations
