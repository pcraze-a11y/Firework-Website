import { Resend } from "resend"

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY!)
}

function FROM() { return process.env.EMAIL_FROM ?? "noreply@example.com" }
function SITE_URL() { return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000" }

function ADMIN_EMAIL() { return process.env.ADMIN_EMAIL ?? "cacraze@gmail.com" }

const HEADER_HTML = `
  <div style="background-color:#135658;padding:24px 32px;">
    <p style="margin:0;color:#ffffff;font-size:20px;font-weight:600;font-family:Arial,sans-serif;">
      Pinetuck Fireworks &middot; July 4, 2026
    </p>
  </div>
`

const FOOTER_HTML = `
  <div style="margin-top:40px;padding:16px 32px;border-top:1px solid #c9c9c9;">
    <p style="margin:0;color:#888888;font-size:13px;font-family:Arial,sans-serif;text-align:center;">
      Pinetuck Golf Course &middot; Rock Hill, SC
    </p>
  </div>
`

function wrapEmail(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f3f6f7;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f6f7;padding:32px 0;">
    <tr><td align="center">
      <div style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(20,52,55,0.10);">
        ${HEADER_HTML}
        <div style="padding:32px;">
          ${body}
        </div>
        ${FOOTER_HTML}
      </div>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendAdminNotification(opts: {
  familyName: string
  email: string
  phone?: string | null
  spotId: string
  purpose: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping admin notification email")
    return
  }

  const html = wrapEmail(`
    <p style="font-family:Arial,sans-serif;font-size:18px;color:#143437;margin:0 0 20px;font-weight:600;">
      New Spot Request
    </p>
    <div style="background-color:#e6f4ed;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 8px;">
        <strong>Spot:</strong> ${escapeHtml(opts.spotId)}
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 8px;">
        <strong>Family:</strong> ${escapeHtml(opts.familyName)}
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 8px;">
        <strong>Email:</strong> ${escapeHtml(opts.email)}
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 8px;">
        <strong>Phone:</strong> ${escapeHtml(opts.phone ?? "—")}
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 4px;">
        <strong>Purpose / notes:</strong>
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0;white-space:pre-wrap;">
        ${escapeHtml(opts.purpose)}
      </p>
    </div>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#555555;margin:0;">
      Log in to the admin panel to approve or deny this request.
    </p>
  `)

  const text = [
    "New Spot Request — Pinetuck Fireworks",
    "",
    `Spot:    ${opts.spotId}`,
    `Family:  ${opts.familyName}`,
    `Email:   ${opts.email}`,
    `Phone:   ${opts.phone ?? "—"}`,
    "",
    "Purpose / notes:",
    opts.purpose,
    "",
    "Log in to the admin panel to approve or deny this request.",
  ].join("\n")

  const { error } = await getResend().emails.send({
    from: FROM(),
    to: ADMIN_EMAIL(),
    subject: `[Pinetuck] New spot request: ${opts.spotId} — ${opts.familyName}`,
    html,
    text,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
}

export async function sendApprovalEmail(opts: {
  email: string
  familyName: string
  spotId: string
  releaseToken: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping approval email")
    return
  }

  const releaseUrl = `${SITE_URL()}/release?token=${opts.releaseToken}`

  const html = wrapEmail(`
    <p style="font-family:Arial,sans-serif;font-size:18px;color:#143437;margin:0 0 20px;">
      Hi ${escapeHtml(opts.familyName)},
    </p>
    <p style="font-family:Arial,sans-serif;font-size:16px;color:#143437;margin:0 0 24px;line-height:1.6;">
      Great news &mdash; your request for Tent Spot <strong>${escapeHtml(opts.spotId)}</strong> has been
      <strong style="color:#039149;">approved</strong> for the July 4th fireworks at Pinetuck Golf Course.
    </p>
    <div style="background-color:#e6f4ed;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 8px;font-weight:600;">Event Details</p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 4px;">
        <strong>Date:</strong> Friday, July 4, 2026
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0;">
        <strong>Location:</strong> Pinetuck Golf Course, 2578 Tuckaway Rd, Rock Hill, SC 29730
      </p>
    </div>
    <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 12px;">
      Need to cancel? Click the link below to release your spot:
    </p>
    <p style="font-family:Arial,sans-serif;font-size:15px;margin:0;word-break:break-all;">
      <a href="${releaseUrl}" style="color:#135658;font-weight:700;">${releaseUrl}</a>
    </p>
  `)

  const text = [
    `Hi ${opts.familyName},`,
    "",
    `Your request for Tent Spot ${opts.spotId} has been approved! See you July 4th at Pinetuck Golf Course.`,
    "",
    `To release your spot if you can no longer make it: ${releaseUrl}`,
  ].join("\n")

  const { error } = await getResend().emails.send({
    from: FROM(),
    to: opts.email,
    subject: "Your Pinetuck Tent Spot Request Has Been Approved!",
    html,
    text,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
}

export async function sendDenialEmail(opts: {
  email: string
  familyName: string
  spotId: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping denial email")
    return
  }

  const html = wrapEmail(`
    <p style="font-family:Arial,sans-serif;font-size:18px;color:#143437;margin:0 0 20px;">
      Hi ${escapeHtml(opts.familyName)},
    </p>
    <p style="font-family:Arial,sans-serif;font-size:16px;color:#143437;margin:0 0 16px;line-height:1.6;">
      Unfortunately your request for Tent Spot <strong>${escapeHtml(opts.spotId)}</strong> was not approved
      at this time.
    </p>
    <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0;">
      If you have questions, please reach out to the event organizer. We hope to see you at a future Pinetuck event!
    </p>
  `)

  const text = [
    `Hi ${opts.familyName},`,
    "",
    `Unfortunately your request for Tent Spot ${opts.spotId} was not approved at this time.`,
    "",
    "If you have questions, please reach out to the event organizer. We hope to see you at a future Pinetuck event!",
  ].join("\n")

  const { error } = await getResend().emails.send({
    from: FROM(),
    to: opts.email,
    subject: "Update on Your Pinetuck Tent Spot Request",
    html,
    text,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
}

export async function sendReleasedConfirmation(opts: {
  email: string
  familyName: string
  spotId: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping release confirmation email")
    return
  }

  const html = wrapEmail(`
    <p style="font-family:Arial,sans-serif;font-size:18px;color:#143437;margin:0 0 20px;">
      Hi ${escapeHtml(opts.familyName)},
    </p>
    <p style="font-family:Arial,sans-serif;font-size:16px;color:#143437;margin:0 0 16px;line-height:1.6;">
      Spot <strong>${escapeHtml(opts.spotId)}</strong> has been released and is now available for another family.
    </p>
    <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0;">
      We hope to see you at a future Pinetuck event. Happy 4th of July!
    </p>
  `)

  const text = [
    `Hi ${opts.familyName},`,
    "",
    `Spot ${opts.spotId} has been released and is now available for another family.`,
    "",
    "We hope to see you at a future Pinetuck event. Happy 4th of July!",
  ].join("\n")

  const { error } = await getResend().emails.send({
    from: FROM(),
    to: opts.email,
    subject: "Your Pinetuck Tent Spot Has Been Released",
    html,
    text,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}
