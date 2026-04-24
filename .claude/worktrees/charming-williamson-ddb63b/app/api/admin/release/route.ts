import { z } from "zod"
import { prisma } from "@/lib/db"

const ReleaseSchema = z.object({
  reservationId: z.string().min(1),
})

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return Response.json({ error: "server_misconfigured" }, { status: 500 })
  }

  const cookieHeader = request.headers.get("cookie") ?? ""
  const tokenMatch = cookieHeader.match(/(?:^|;\s*)x-admin-token=([^;]*)/)
  const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null

  if (token !== adminPassword) {
    return Response.json({ error: "unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = ReleaseSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: "validation_error", issues: parsed.error.issues }, { status: 400 })
  }

  const { reservationId } = parsed.data

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  })
  if (!reservation) {
    return Response.json({ error: "not_found" }, { status: 404 })
  }

  await prisma.reservation.delete({ where: { id: reservationId } })

  return Response.json({ released: true, spotId: reservation.spotId })
}
