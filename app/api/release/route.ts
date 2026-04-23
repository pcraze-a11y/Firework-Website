import { z } from "zod"
import { prisma } from "@/lib/db"
import { sendReleasedConfirmation } from "@/lib/email"

const ReleaseSchema = z.object({
  token: z.string().min(1),
})

export async function POST(request: Request) {
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

  const { token } = parsed.data

  const reservation = await prisma.reservation.findUnique({
    where: { releaseToken: token },
  })
  if (!reservation) {
    return Response.json({ error: "not_found" }, { status: 404 })
  }

  await prisma.reservation.delete({ where: { id: reservation.id } })

  try {
    await sendReleasedConfirmation({
      email: reservation.email,
      familyName: reservation.familyName,
      spotId: reservation.spotId,
    })
  } catch {
    // Email failure must not fail the release
  }

  return Response.json({ released: true, spotId: reservation.spotId })
}
