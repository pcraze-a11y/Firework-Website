# Deployment Guide — Pinetuck Fireworks Tent Reservation

This guide is written for a non-developer organizer. Follow each part in order. You do not need to understand code — just copy and paste the values where indicated.

---

## Part 1 — Set Up Your Database (Supabase)

Supabase is the free database service that stores all reservation records.

1. Go to https://supabase.com and create a free account.
2. Click "New Project". Give it any name (e.g. `pinetuck-fireworks`). Choose a region close to South Carolina — **US East (N. Virginia)** is a good choice.
3. Set a database password. Write it down — you will need it in a moment.
4. Click "Create new project" and wait about 2 minutes for it to finish setting up.
5. In the left sidebar, click **Project Settings** → **Database**.
6. Scroll down to **Connection string** and choose **URI** format.
7. Copy the **Transaction mode** connection string (it uses port **6543**). This is your `DATABASE_URL`. Replace `[YOUR-PASSWORD]` in the string with the password you set in step 3.
8. Switch the toggle to **Session mode** (port **5432**). Copy that string. This is your `DIRECT_URL`. Replace `[YOUR-PASSWORD]` the same way.

Keep both strings somewhere safe (a notes app or password manager). You will paste them into Vercel in Part 4.

---

## Part 2 — Set Up Email (Resend)

Resend sends confirmation emails to people who make a reservation. The free tier allows 3,000 emails per month and 100 per day, which is more than enough for this event.

1. Go to https://resend.com and create a free account.
2. In the left sidebar, click **Domains** → **Add Domain**. Enter the domain you want to send from (e.g. `yourevent.com`).
3. Resend will show you a set of DNS records to add at your domain registrar (e.g. Namecheap, GoDaddy, Cloudflare). Add each record exactly as shown. DNS changes can take up to 24 hours to take effect, but usually happen within 15 minutes.
   - If you do not have a domain yet, you can skip this step for now and use Resend's shared test address during development. You will not be able to send to real recipients until you verify a domain.
4. Once your domain shows "Verified", click **API Keys** → **Add API Key**. Give it any name and click **Add**.
5. Copy the key that appears (it starts with `re_`). You will only see it once — save it now.

---

## Part 3 — Deploy to Vercel

Vercel hosts the website. It automatically republishes the site whenever you push code changes to GitHub.

1. If you have not already, push the project folder to a GitHub repository. (If you are not sure how to do this, ask the developer who set up the project to push it for you.)
2. Go to https://vercel.com and click **Sign Up** or **Log In** using your GitHub account.
3. Click **Add New Project**.
4. Find your repository in the list and click **Import**.
5. Under **Framework Preset**, confirm it shows **Next.js**. Leave all other build settings at their defaults.
6. **Do not click Deploy yet.** Go to Part 4 first to add your environment variables.

---

## Part 4 — Configure Environment Variables

Environment variables are private settings — passwords, API keys, and URLs — that the site needs to run. You set them in Vercel so they are never stored in the code itself.

In Vercel, go to your project → **Settings** → **Environment Variables**.

Add the following six variables. For each one, type the name exactly as shown in the **Variable** column, then paste the value.

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Supabase → Project Settings → Database → Transaction mode connection string (port 6543) |
| `DIRECT_URL` | Supabase → Project Settings → Database → Session mode connection string (port 5432) |
| `RESEND_API_KEY` | Resend → API Keys → your key (starts with `re_`) |
| `EMAIL_FROM` | Your verified Resend sender address, e.g. `reservations@yourevent.com` |
| `NEXT_PUBLIC_SITE_URL` | Your site URL, e.g. `https://pinetuck.yourdomain.com` — use the Vercel-assigned URL for now if you do not have a custom domain yet |
| `ADMIN_PASSWORD` | A strong password you choose — this protects the /admin page, so pick something you will not forget |

After all six variables are added, go back to the **Deployments** tab and click **Deploy** (or **Redeploy** if you already deployed).

---

## Part 5 — Run the Database Migration

The migration creates the database tables and loads the tent spots (A1 through H10). You only need to do this once — right after the first successful deployment.

You will need a terminal (Command Prompt or Terminal app). If you are not comfortable with this step, ask the developer who set up the project to run these commands for you.

```sh
npm install -g vercel
vercel login
vercel link
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

What each command does:

- `npm install -g vercel` — installs the Vercel command-line tool.
- `vercel login` — logs you in (opens a browser tab to confirm).
- `vercel link` — connects this folder on your computer to your Vercel project.
- `vercel env pull .env.local` — downloads your environment variables so the next two commands can use them.
- `npx prisma migrate deploy` — creates the database tables.
- `npx prisma db seed` — fills in the 80 tent spots (A1 through H10).

To verify it worked: go to Supabase → **Table Editor** → **spots**. You should see 80 rows.

---

## Part 6 — Connect a Custom Domain (optional)

Skip this part if you are happy using the Vercel-assigned URL (e.g. `pinetuck-fireworks.vercel.app`).

1. In Vercel, go to your project → **Settings** → **Domains** → **Add Domain**.
2. Type your domain (e.g. `pinetuck.yourdomain.com`) and click **Add**.
3. Vercel will show you a DNS record to add at your registrar. Add it and wait for propagation (usually under 30 minutes).
4. Once Vercel shows the domain as active, go back to **Settings** → **Environment Variables** and update `NEXT_PUBLIC_SITE_URL` to your new domain.
5. Go to **Deployments** → **Redeploy** so the site picks up the updated URL.

---

## Part 7 — Test Before Going Live

Run through this checklist before sharing the reservation link with anyone.

1. Visit your site URL. Fill out the reservation form and submit it.
2. Check the email address you used — you should receive a confirmation email within a minute.
3. Click the release link inside the confirmation email. The spot should become available again (the page should confirm this).
4. Visit `https://yoursite.com/admin`. You will be prompted for a password — enter the `ADMIN_PASSWORD` you set in Part 4.
5. Confirm that your test reservation appears in the list.
6. Click **Export CSV** and verify the file downloads and opens correctly.

If any step fails, see the Common Issues section below.

---

## Part 8 — Customizing Event Details

The site contains placeholder text for details specific to your event (dates, location, rules, etc.).

1. Open the file `components/EventInfo.tsx` in a text editor (Notepad works, or ask your developer to help).
2. Search for `{{PLACEHOLDER` — each occurrence marks a spot that needs your real content.
3. See `CONTENT_TODO.md` in the project folder for a full list of placeholders and what to put in each one.
4. Save the file, then push the change to GitHub. Vercel will automatically detect the change and redeploy the site within 1–2 minutes.

---

## Common Issues

**"Prisma client not generated" error after deploy**
Run `npx prisma generate` in the project folder on your computer, then push the change to GitHub to trigger a fresh deployment.

**Emails are not arriving**
Check that `RESEND_API_KEY` is correctly set in Vercel (no extra spaces). Also confirm in Resend → Domains that your sending domain shows "Verified". Check the recipient's spam folder.

**Migration fails with a connection error**
Migrations cannot use the connection pooler. Make sure `DIRECT_URL` is set in Vercel env vars and that it uses port **5432**, not 6543.

**The /admin page shows a 401 Unauthorized error**
`ADMIN_PASSWORD` is either not set or was added after the last deployment. Go to Vercel → Settings → Environment Variables, confirm the value, then redeploy.

**The site deployed but shows a blank page or 500 error**
Go to Vercel → your project → **Deployments** → click the latest deployment → **Functions** tab → look for error messages. The most common cause is a missing environment variable.
