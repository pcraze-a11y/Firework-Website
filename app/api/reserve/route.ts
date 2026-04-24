import { z } from "zod"
import { prisma } from "@/lib/db"
import { sendAdminNotification } from "@/lib/email"

const ReserveSchema = z.object({
  spotId: z.string().min(1),
  familyName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(20).optional(),
  purpose: z.string().min(5).max(500),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = ReserveSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: "validation_error", issues: parsed.error.issues }, { status: 400 })
  }

  const { spotId, familyName, phone, purpose } = parsed.data
  const email = parsed.data.email.toLowerCase().trim()

  const spot = await prisma.spot.findUnique({ where: { id: spotId } })
  if (!spot) {
    return Response.json({ error: "spot_not_found" }, { status: 404 })
  }

  // Check for an active (pending or confirmed) reservation under this email
  const existingByEmail = await prisma.reservation.findFirst({
    where: { email, status: { in: ["pending", "confirmed"] } },
  })
  if (existingByEmail) {
    return Response.json(
      { error: "email_exists", message: "This email already has an active reservation request." },
      { status: 409 }
    )
  }

  const releaseToken = crypto.randomUUID()

  let reservation: { id: string; spotId: string; familyName: string; releaseToken: string }
  try {
    reservation = await prisma.reservation.create({
      data: { spotId, familyName, email, phone, purpose, status: "pending", releaseToken },
      select: { id: true, spotId: true, familyName: true, releaseToken: true },
    })
  } catch (err) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "P2002"
    ) {
      const meta = (err as { meta?: { target?: string[] } }).meta
      const target = meta?.target ?? []
      if (target.includes("spotId")) {
        return Response.json(
          { error: "spot_taken", message: "This spot already has a pending or confirmed request. Please choose another." },
          { status: 409 }
        )
      }
    }
    throw err
  }

  try {
    await sendAdminNotification({ email, familyName, phone, spotId, purpose })
  } catch {
    // Email failure must not fail the reservation
  }

  return Response.json({ reservation }, { status: 201 })
}
