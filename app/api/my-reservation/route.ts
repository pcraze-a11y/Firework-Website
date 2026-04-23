import { z } from "zod"
import { prisma } from "@/lib/db"

const EmailSchema = z.string().email()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawEmail = searchParams.get("email") ?? ""

  const parsed = EmailSchema.safeParse(rawEmail)
  if (!parsed.success) {
    return Response.json({ error: "validation_error", issues: parsed.error.issues }, { status: 400 })
  }

  const email = parsed.data.toLowerCase().trim()

  const reservation = await prisma.reservation.findUnique({
    where: { email },
    select: { id: true, spotId: true, familyName: true, createdAt: true },
  })

  return Response.json({ reservation: reservation ?? null })
}
