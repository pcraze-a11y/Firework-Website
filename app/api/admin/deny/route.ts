import { z } from "zod"
import { prisma } from "@/lib/db"
import { sendDenialEmail } from "@/lib/email"

const Schema = z.object({
  reservationId: z.string().min(1),
})

function isAuthorized(request: Request): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  const cookieHeader = request.headers.get("cookie") ?? ""
  const match = cookieHeader.match(/(?:^|;\s*)x-admin-token=([^;]*)/)
  const token = match ? decodeURIComponent(match[1]) : null
  return token === adminPassword
}

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "server_misconfigured" }, { status: 500 })
  }
  if (!isAuthorized(request)) {
    return Response.json({ error: "unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: "validation_error", issues: parsed.error.issues }, { status: 400 })
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: parsed.data.reservationId },
  })
  if (!reservation) {
    return Response.json({ error: "not_found" }, { status: 404 })
  }
  if (reservation.status !== "pending") {
    return Response.json({ error: "not_pending" }, { status: 409 })
  }

  // Delete the record so the spot becomes available again
  await prisma.reservation.delete({ where: { id: reservation.id } })

  try {
    await sendDenialEmail({
      email: reservation.email,
      familyName: reservation.familyName,
      spotId: reservation.spotId,
    })
  } catch {
    // Email failure must not fail the action
  }

  return Response.json({ denied: true, spotId: reservation.spotId })
}
