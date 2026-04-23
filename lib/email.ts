import { Resend } from "resend"

// Lazy — Resend throws if the key is missing at instantiation time, so we
// only construct it inside the send functions (after the early-return guard).
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY!)
}

function FROM() { return process.env.EMAIL_FROM ?? "noreply@example.com" }
function SITE_URL() { return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000" }

const HEADER_HTML = `
  <div style="background-color:#135658;padding:24px 32px;">
    <p style="margin:0;color:#ffffff;font-size:20px;font-weight:600;font-family:Arial,sans-serif;">
      PineTuck Fireworks &middot; July 4, 2026
    </p>
  </div>
`

const FOOTER_HTML = `
  <div style="margin-top:40px;padding:16px 32px;border-top:1px solid #c9c9c9;">
    <p style="margin:0;color:#888888;font-size:13px;font-family:Arial,sans-serif;text-align:center;">
      PineTuck Golf Course &middot; Rock Hill, SC
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

export async function sendReservationConfirmation(opts: {
  email: string
  familyName: string
  spotId: string
  releaseToken: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping reservation confirmation email")
    return
  }

  const releaseUrl = `${SITE_URL()}/release?token=${opts.releaseToken}`

  const html = wrapEmail(`
    <p style="font-family:Arial,sans-serif;font-size:18px;color:#143437;margin:0 0 20px;">
      Hi ${escapeHtml(opts.familyName)},
    </p>
    <p style="font-family:Arial,sans-serif;font-size:16px;color:#143437;margin:0 0 24px;line-height:1.6;">
      You&rsquo;ve reserved Tent Spot <strong>${escapeHtml(opts.spotId)}</strong> for the July 4th fireworks at PineTuck Golf Course.
    </p>
    <div style="background-color:#e6f4ed;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 8px;font-weight:600;">Event Details</p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 4px;">
        <strong>Date:</strong> Friday, July 4, 2026
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0;">
        <strong>Location:</strong> {{PLACEHOLDER: address}}
      </p>
    </div>
    <p style="font-family:Arial,sans-serif;font-size:15px;color:#143437;margin:0 0 8px;">
      Need to cancel? Click the link below to release your spot so another family can enjoy the fireworks.
    </p>
    <p style="margin:0 0 8px;">
      <a href="${releaseUrl}" style="font-family:Arial,sans-serif;font-size:15px;color:#135658;font-weight:700;word-break:break-all;">
        ${releaseUrl}
      </a>
    </p>
  `)

  const text = [
    `Hi ${opts.familyName},`,
    "",
    `You've reserved Tent Spot ${opts.spotId} for the July 4th Fireworks at PineTuck Golf Course.`,
    "",
    `To release your spot: ${releaseUrl}`,
  ].join("\n")

  const { error } = await getResend().emails.send({
    from: FROM(),
    to: opts.email,
    subject: "Your PineTuck Fireworks Tent Spot is Reserved! 🎆",
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
      We hope to see you at a future PineTuck event. Happy 4th of July!
    </p>
  `)

  const text = [
    `Hi ${opts.familyName},`,
    "",
    `Spot ${opts.spotId} has been released and is now available for another family.`,
    "",
    "We hope to see you at a future PineTuck event. Happy 4th of July!",
  ].join("\n")

  const { error } = await getResend().emails.send({
    from: FROM(),
    to: opts.email,
    subject: "Your PineTuck Tent Spot Has Been Released",
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
