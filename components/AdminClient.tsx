"use client"

import { useState } from "react"
import type { ReservationWithSpot } from "@/app/admin/page"

interface Props {
  reservations: ReservationWithSpot[]
  totalSpots: number
}

export default function AdminClient({ reservations: initial, totalSpots }: Props) {
  const [reservations, setReservations] = useState<ReservationWithSpot[]>(initial)

  async function handleRelease(reservation: ReservationWithSpot) {
    const spotLabel = `${reservation.spot.row}${reservation.spot.col}`
    const confirmed = window.confirm(
      `Release spot ${spotLabel} for ${reservation.familyName}?`
    )
    if (!confirmed) return

    const res = await fetch("/api/admin/release", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId: reservation.id }),
    })

    if (!res.ok) {
      const data = (await res.json()) as { error?: string }
      alert(`Failed to release: ${data.error ?? "unknown error"}`)
      return
    }

    setReservations((prev) => prev.filter((r) => r.id !== reservation.id))
  }

  function handleExportCSV() {
    const header = "Spot,Family Name,Email,Phone,Reserved At"
    const rows = reservations.map((r) => {
      const spot = `${r.spot.row}${r.spot.col}`
      const phone = r.phone ?? ""
      const at = r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt)
      return [spot, r.familyName, r.email, phone, at]
        .map((v) => `"${v.replace(/"/g, '""')}"`)
        .join(",")
    })
    const csv = [header, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "reservations.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const reserved = reservations.length
  const available = totalSpots - reserved

  return (
    <div className="min-h-screen bg-[#f3f6f7]">
      <header className="bg-[#135658] px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold tracking-wide">PineTuck Admin</h1>
        <button
          onClick={handleExportCSV}
          className="bg-[#039149] text-white text-sm font-medium rounded-[6px] px-4 py-2 hover:opacity-90 transition-opacity"
        >
          Export CSV
        </button>
      </header>

      <div className="px-6 py-4 flex gap-6 text-sm font-medium text-[#135658]">
        <span>Total spots: {totalSpots}</span>
        <span>Reserved: {reserved}</span>
        <span>Available: {available}</span>
      </div>

      <div className="px-6 pb-8 overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
          <thead>
            <tr className="bg-[#135658] text-white">
              <th className="text-left px-4 py-3 font-semibold">Spot</th>
              <th className="text-left px-4 py-3 font-semibold">Family Name</th>
              <th className="text-left px-4 py-3 font-semibold">Email</th>
              <th className="text-left px-4 py-3 font-semibold">Phone</th>
              <th className="text-left px-4 py-3 font-semibold">Reserved At</th>
              <th className="text-left px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No reservations yet.
                </td>
              </tr>
            )}
            {reservations.map((r, i) => {
              const spotLabel = `${r.spot.row}${r.spot.col}`
              const at =
                r.createdAt instanceof Date
                  ? r.createdAt.toLocaleString()
                  : new Date(r.createdAt).toLocaleString()
              return (
                <tr
                  key={r.id}
                  className={i % 2 === 1 ? "bg-[#f3f6f7]" : "bg-white"}
                >
                  <td className="px-4 py-3 font-mono font-medium">{spotLabel}</td>
                  <td className="px-4 py-3">{r.familyName}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.phone ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{at}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRelease(r)}
                      className="bg-[#b44b5d] text-white text-xs font-medium rounded-[6px] px-3 py-1 hover:opacity-90 transition-opacity"
                    >
                      Release
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
