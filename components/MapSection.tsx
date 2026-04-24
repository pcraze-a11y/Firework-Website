"use client";

import { useState, useEffect, useCallback } from "react";
import TentMap from "@/components/TentMap";
import ReservationModal from "@/components/ReservationModal";
import Toast from "@/components/Toast";

interface Spot {
  id: string;
  row: string;
  col: number;
  reservation?: { familyName: string; status: string } | null;
}


export default function MapSection() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

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
    if (spot?.reservation) return; // pending or confirmed — not clickable
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
      message: `Request for spot ${spotId} submitted! You'll receive an email if approved.`,
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

  return (
    <>
      {/* Hero */}
      <section
        id="map"
        className="relative w-full overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/fireworks_header.mp4"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,20,60,0.55)" }} />
        <div className="relative z-10 w-full py-14 md:py-20 px-6 flex flex-col items-center gap-6 text-center">
        <h1
          className="text-3xl md:text-5xl font-semibold leading-tight"
          style={{ color: "#F0F4FF", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
        >
          Reserve an Event Tent Spot
        </h1>
        <p className="text-base md:text-lg max-w-xl" style={{ color: "#EEF2FF", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
          Click an available spot to submit a request. Requests are reviewed and you&rsquo;ll be notified by email.
        </p>

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
                backgroundColor: "#EEF2FF",
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

      {/* Tent reservation info */}
      <section className="w-full py-16 md:py-24 px-6" style={{ backgroundColor: "#EEF2FF" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center" style={{ color: "#0D1B4B" }}>
            Reserve a Space for an Event Tent
          </h2>
          <p className="text-base leading-relaxed mb-6 text-center" style={{ color: "#0D1B4B" }}>
            Families and church groups are invited to host free treat tents for the community. All treats are provided <strong>free of charge</strong> as a way to serve and connect with others.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#BF0A30" }}>Treat ideas</p>
              <ul className="space-y-1.5 text-base" style={{ color: "#0D1B4B" }}>
                {["Snow cones", "Cotton candy", "Donuts", "Watermelon", "Ice water"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#BF0A30" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(20,52,55,0.10)" }}>
              <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#BF0A30" }}>Tent host guidelines</p>
              <ul className="space-y-1.5 text-base" style={{ color: "#0D1B4B" }}>
                {[
                  "Open to families and church groups",
                  "All items must be free — no selling or fundraising",
                  "Standard tent size: 10×10",
                  "Setup / teardown times provided upon approval",
                  "Reservations are subject to confirmation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: "#039149" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
