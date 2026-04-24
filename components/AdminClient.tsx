"use client"

import { useState } from "react"
import type { ReservationWithSpot } from "@/app/admin/page"

interface Props {
  reservations: ReservationWithSpot[]
  totalSpots: number
}

export default function AdminClient({ reservations: initial, totalSpots }: Props) {
  const [reservations, setReservations] = useState<ReservationWithSpot[]>(initial)

  async function handleConfirm(reservation: ReservationWithSpot) {
    const spotLabel = `${reservation.spot.row}${reservation.spot.col}`
    if (!window.confirm(`Approve spot ${spotLabel} for ${reservation.familyName}?`)) return

    const res = await fetch("/api/admin/confirm", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId: reservation.id }),
    })

    if (!res.ok) {
      const data = (await res.json()) as { error?: string }
      alert(`Failed to confirm: ${data.error ?? "unknown error"}`)
      return
    }

    setReservations((prev) =>
      prev.map((r) => (r.id === reservation.id ? { ...r, status: "confirmed" } : r))
    )
  }

  async function handleDeny(reservation: ReservationWithSpot) {
    const spotLabel = `${reservation.spot.row}${reservation.spot.col}`
    if (!window.confirm(`Deny and delete request for spot ${spotLabel} by ${reservation.familyName}? This cannot be undone.`)) return

    const res = await fetch("/api/admin/deny", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId: reservation.id }),
    })

    if (!res.ok) {
      const data = (await res.json()) as { error?: string }
      alert(`Failed to deny: ${data.error ?? "unknown error"}`)
      return
    }

    setReservations((prev) => prev.filter((r) => r.id !== reservation.id))
  }

  async function handleRelease(reservation: ReservationWithSpot) {
    const spotLabel = `${reservation.spot.row}${reservation.spot.col}`
    if (!window.confirm(`Release confirmed spot ${spotLabel} for ${reservation.familyName}?`)) return

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
    const confirmed = reservations.filter((r) => r.status === "confirmed")
    const header = "Spot,Family Name,Email,Phone,Purpose,Reserved At"
    const rows = confirmed.map((r) => {
      const spot = `${r.spot.row}${r.spot.col}`
      const phone = r.phone ?? ""
      const at = r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt)
      return [spot, r.familyName, r.email, phone, r.purpose, at]
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

  const pending = reservations.filter((r) => r.status === "pending")
  const confirmed = reservations.filter((r) => r.status === "confirmed")
  const available = totalSpots - confirmed.length - pending.length

  const colClass = "text-left px-4 py-3 font-semibold"

  function ReservationRow({ r, actions }: { r: ReservationWithSpot; actions: React.ReactNode }) {
    const spotLabel = `${r.spot.row}${r.spot.col}`
    const at =
      r.createdAt instanceof Date
        ? r.createdAt.toLocaleString()
        : new Date(r.createdAt).toLocaleString()
    return (
      <tr className="border-b border-gray-100 last:border-0">
        <td className="px-4 py-3 font-mono font-medium">{spotLabel}</td>
        <td className="px-4 py-3">{r.familyName}</td>
        <td className="px-4 py-3">{r.email}</td>
        <td className="px-4 py-3">{r.phone ?? "—"}</td>
        <td className="px-4 py-3 max-w-xs">
          <span className="block text-sm text-gray-700 whitespace-pre-wrap break-words">{r.purpose}</span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{at}</td>
        <td className="px-4 py-3">
          <div className="flex gap-2">{actions}</div>
        </td>
      </tr>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f6f7]">
      <header className="bg-[#135658] px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold tracking-wide">Pinetuck Admin</h1>
        <button
          onClick={handleExportCSV}
          className="bg-[#039149] text-white text-sm font-medium rounded-[6px] px-4 py-2 hover:opacity-90 transition-opacity"
        >
          Export CSV
        </button>
      </header>

      <div className="px-6 py-4 flex gap-6 text-sm font-medium text-[#135658]">
        <span>Total spots: {totalSpots}</span>
        <span>Pending: {pending.length}</span>
        <span>Confirmed: {confirmed.length}</span>
        <span>Available: {available}</span>
      </div>

      {/* Pending */}
      <div className="px-6 pb-6">
        <h2 className="text-base font-semibold text-[#135658] mb-3 flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400" />
          Pending Requests ({pending.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
            <thead>
              <tr className="bg-[#7c6a1a] text-white">
                <th className={colClass}>Spot</th>
                <th className={colClass}>Family Name</th>
                <th className={colClass}>Email</th>
                <th className={colClass}>Phone</th>
                <th className={colClass}>Purpose</th>
                <th className={colClass}>Requested At</th>
                <th className={colClass}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                    No pending requests.
                  </td>
                </tr>
              )}
              {pending.map((r) => (
                <ReservationRow
                  key={r.id}
                  r={r}
                  actions={
                    <>
                      <button
                        onClick={() => handleConfirm(r)}
                        className="bg-[#039149] text-white text-xs font-medium rounded-[6px] px-3 py-1 hover:opacity-90 transition-opacity"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeny(r)}
                        className="bg-[#b44b5d] text-white text-xs font-medium rounded-[6px] px-3 py-1 hover:opacity-90 transition-opacity"
                      >
                        Deny
                      </button>
                    </>
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmed */}
      <div className="px-6 pb-8">
        <h2 className="text-base font-semibold text-[#135658] mb-3 flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#039149]" />
          Confirmed Reservations ({confirmed.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
            <thead>
              <tr className="bg-[#135658] text-white">
                <th className={colClass}>Spot</th>
                <th className={colClass}>Family Name</th>
                <th className={colClass}>Email</th>
                <th className={colClass}>Phone</th>
                <th className={colClass}>Purpose</th>
                <th className={colClass}>Confirmed At</th>
                <th className={colClass}>Action</th>
              </tr>
            </thead>
            <tbody>
              {confirmed.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                    No confirmed reservations yet.
                  </td>
                </tr>
              )}
              {confirmed.map((r) => (
                <ReservationRow
                  key={r.id}
                  r={r}
                  actions={
                    <button
                      onClick={() => handleRelease(r)}
                      className="bg-[#b44b5d] text-white text-xs font-medium rounded-[6px] px-3 py-1 hover:opacity-90 transition-opacity"
                    >
                      Release
                    </button>
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
