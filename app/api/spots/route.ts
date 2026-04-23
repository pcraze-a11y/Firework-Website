import { prisma } from "@/lib/db"

export async function GET() {
  const spots = await prisma.spot.findMany({
    include: { reservation: { select: { familyName: true } } },
    orderBy: [{ row: "asc" }, { col: "asc" }],
  })

  return Response.json({ spots })
}
