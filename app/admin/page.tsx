import { prisma } from "@/lib/db"
import AdminClient from "@/components/AdminClient"
import type { Prisma } from "@prisma/client"

export type ReservationWithSpot = Prisma.ReservationGetPayload<{ include: { spot: true } }>

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const reservations = await prisma.reservation.findMany({
    include: { spot: true },
    orderBy: { createdAt: "desc" },
  })

  const totalSpots = await prisma.spot.count()

  return <AdminClient reservations={reservations} totalSpots={totalSpots} />
}
