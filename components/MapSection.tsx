"use client";

import { useState, useEffect, useCallback } from "react";
import TentMap from "@/components/TentMap";
import ReservationModal from "@/components/ReservationModal";
import Toast from "@/components/Toast";

interface Spot {
  id: string;
  row: string;
  col: number;
  reservation?: { familyName: string } | null;
}

interface MyReservation {
  spotId: string;
  familyName: string;
  createdAt: string;
}

export default function MapSection() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [findEmail, setFindEmail] = useState("");
  const [findLoading, setFindLoading] = useState(false);
  const [myReservation, setMyReservation] = useState<MyReservation | null | undefined>(undefined);

  const fetchSpots = useCallback(async () => {
    try {
      const res = await fetch("/api/spots");
      const data: { spots: Spot[] } = await res.json();
      setSpots(data.spots);
    } catch {
      // silently ignore poll failures
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpots();
    const interval = setInterval(fetchSpots, 30_000);
    return () => clearInterval(interval);
  }, [fetchSpots]);

  function handleSpotClick(id: string) {
    const spot = spots.find((s) => s.id === id);
    if (spot?.reservation) return;
    if (selectedSpotId === id) {
      setSelectedSpotId(null);
      setModalOpen(false);
      return;
    }
    setSelectedSpotId(id);
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
    setSelectedSpotId(null);
  }

  function handleReservationSuccess(spotId: string) {
    setModalOpen(false);
    setSelectedSpotId(null);
    setToast({
      message: `Spot ${spotId} reserved! Check your email for confirmation.`,
      type: "success",
    });
    fetchSpots();
  }

  function handleSpotTaken(message: string) {
    setSelectedSpotId(null);
    setToast({ message, type: "error" });
    fetchSpots();
  }

  function handleGenericError() {
    setToast({ message: "Something went wrong. Please try again.", type: "error" });
  }

  async function handleFindReservation(e: React.FormEvent) {
    e.preventDefault();
    if (!findEmail.trim()) return;
    setFindLoading(true);
    setMyReservation(undefined);
    try {
      const res = await fetch(`/api/my-reservation?email=${encodeURIComponent(findEmail.trim())}`);
      const data: { reservation: MyReservation | null } = await res.json();
      setMyReservation(data.reservation);
    } catch {
      setMyReservation(null);
    } finally {
      setFindLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        id="map"
        className="w-full py-12 md:py-16 px-6 flex flex-col items-center gap-6 text-center"
        style={{ backgroundColor: "#135658" }}
      >
        <h1
          className="text-3xl md:text-5xl font-semibold leading-tight"
          style={{ color: "#fff4df" }}
        >
          Reserve Your Tent Spot
        </h1>
        <p className="text-base md:text-lg max-w-xl" style={{ color: "#e6f4ed" }}>
          Click an available spot on the map below to reserve it. Free for all families.
        </p>

        {/* Legend pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-1">
          <span
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#e6f4ed", color: "#135658", border: "2px solid #039149" }}
          >
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: "#e6f4ed", border: "2px solid #039149" }}
            />
            Available
          </span>
          <span
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#d1d5db", color: "#4b5563", border: "2px solid #9ca3af" }}
          >
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: "#d1d5db", border: "2px solid #9ca3af" }}
            />
            Reserved
          </span>
          <span
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#fff4df", color: "#105157", border: "2px solid #ff9a83" }}
          >
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: "#fff4df", border: "2px solid #ff9a83" }}
            />
            Your selection
          </span>
        </div>
      </section>

      {/* Map area */}
      <section className="w-full bg-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div
              className="w-full rounded-xl animate-pulse"
              style={{
                aspectRatio: "705 / 490",
                backgroundColor: "#e6f4ed",
              }}
              aria-label="Loading map…"
              role="status"
            />
          ) : (
            <TentMap
              spots={spots}
              selectedSpotId={selectedSpotId}
              onSpotClick={handleSpotClick}
            />
          )}
        </div>
      </section>

      {/* Find My Reservation */}
      <section
        className="w-full py-12 px-6"
        style={{ backgroundColor: "#f3f6f7" }}
      >
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <h2
            className="text-xl md:text-2xl font-semibold text-center"
            style={{ color: "#143437" }}
          >
            Already reserved? Find your spot.
          </h2>

          <form
            onSubmit={handleFindReservation}
            className="flex flex-col sm:flex-row gap-3"
            noValidate
          >
            <label htmlFor="find-email" className="sr-only">
              Email address
            </label>
            <input
              id="find-email"
              type="email"
              autoComplete="email"
              required
              value={findEmail}
              onChange={(e) => {
                setFindEmail(e.target.value);
                setMyReservation(undefined);
              }}
              placeholder="your@email.com"
              className="flex-1 border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 rounded"
              style={{
                borderColor: "#c9c9c9",
                color: "#143437",
                borderRadius: "6px",
              }}
            />
            <button
              type="submit"
              disabled={findLoading || !findEmail.trim()}
              className="shrink-0 px-5 py-2.5 text-sm font-semibold rounded transition-opacity disabled:opacity-50 min-h-[44px]"
              style={{
                backgroundColor: "#135658",
                color: "#fff4df",
                borderRadius: "6px",
              }}
            >
              {findLoading ? "Looking…" : "Look up"}
            </button>
          </form>

          {myReservation === null && (
            <p
              className="text-sm text-center"
              style={{ color: "#b44b5d" }}
              role="status"
            >
              No reservation found for that email.
            </p>
          )}

          {myReservation && (
            <div
              className="p-4 rounded-xl text-sm"
              style={{
                backgroundColor: "#e6f4ed",
                color: "#143437",
                borderRadius: "12px",
              }}
              role="status"
            >
              <p>
                You have{" "}
                <strong>spot {myReservation.spotId}</strong> reserved,{" "}
                <strong>{myReservation.familyName}</strong>. Your confirmation
                email contains a link to release it.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && selectedSpotId && (
        <ReservationModal
          spotId={selectedSpotId}
          onClose={handleModalClose}
          onSuccess={handleReservationSuccess}
          onSpotTaken={handleSpotTaken}
          onGenericError={handleGenericError}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}
