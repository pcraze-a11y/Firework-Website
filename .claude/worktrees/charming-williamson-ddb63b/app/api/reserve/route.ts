import { z } from "zod"
import { prisma } from "@/lib/db"
import { sendReservationConfirmation } from "@/lib/email"

const ReserveSchema = z.object({
  spotId: z.string().min(1),
  familyName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(20).optional(),
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

  const { spotId, familyName, phone } = parsed.data
  const email = parsed.data.email.toLowerCase().trim()

  const spot = await prisma.spot.findUnique({ where: { id: spotId } })
  if (!spot) {
    return Response.json({ error: "spot_not_found" }, { status: 404 })
  }

  const releaseToken = crypto.randomUUID()

  let reservation: { id: string; spotId: string; familyName: string; releaseToken: string }
  try {
    reservation = await prisma.reservation.create({
      data: { spotId, familyName, email, phone, releaseToken },
      select: { id: true, spotId: true, familyName: true, releaseToken: true },
    })
  } catch (err) {
    // P2002 is Prisma's unique-constraint violation. We inspect the target fields
    // to distinguish a race on spotId (two users booking the same spot) from a
    // duplicate email, and return a specific error for each case so the client
    // can give the user an actionable message.
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
          { error: "spot_taken", message: "This spot was just taken. Please choose another." },
          { status: 409 }
        )
      }
      if (target.includes("email")) {
        return Response.json(
          { error: "email_exists", message: "This email already has a reservation." },
          { status: 409 }
        )
      }
    }
    throw err
  }

  try {
    await sendReservationConfirmation({ email, familyName, spotId, releaseToken })
  } catch {
    // Email failure must not fail the reservation
  }

  return Response.json({ reservation }, { status: 201 })
}
