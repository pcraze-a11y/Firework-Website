"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ReservationModalProps {
  spotId: string;
  onClose: () => void;
  onSuccess: (spotId: string) => void;
  onSpotTaken: (message: string) => void;
  onGenericError: () => void;
}

export default function ReservationModal({
  spotId,
  onClose,
  onSuccess,
  onSpotTaken,
  onGenericError,
}: ReservationModalProps) {
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState<string | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setEmailExistsError(null);

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spotId, familyName, email, phone: phone || undefined, purpose }),
      });

      if (res.status === 201) {
        onSuccess(spotId);
        return;
      }

      const data: { error: string; message: string } = await res.json();

      if (res.status === 409 && data.error === "spot_taken") {
        onClose();
        onSpotTaken(data.message);
        return;
      }

      if (res.status === 409 && data.error === "email_exists") {
        setEmailExistsError(data.message);
        setSubmitting(false);
        return;
      }

      onClose();
      onGenericError();
    } catch {
      onClose();
      onGenericError();
    }
  }

  const inputClass =
    "w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 disabled:opacity-50";
  const inputStyle = { borderColor: "#c9c9c9", color: "#143437", borderRadius: "6px" };
  const focusRingStyle = { "--tw-ring-color": "#039149" } as React.CSSProperties;

  const canSubmit = familyName.trim() && email.trim() && purpose.trim().length >= 5;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className="
          w-full sm:max-w-md sm:mx-4 p-6 md:p-8 bg-white
          sm:rounded-xl
          rounded-t-xl rounded-b-none
          max-h-[90vh] overflow-y-auto
        "
        style={{ boxShadow: "0 8px 48px rgba(20,52,55,0.18)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2
              id="modal-title"
              className="text-xl font-semibold"
              style={{ color: "#143437" }}
            >
              Reserve Tent Space {spotId}
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
              Your request will be reviewed before confirmation.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close reservation form"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] -mt-1 -mr-1 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "#143437" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="3" x2="15" y2="15" />
              <line x1="15" y1="3" x2="3" y2="15" />
            </svg>
          </button>
        </div>

        {/* Tent guidelines callout */}
        <div className="rounded-lg px-4 py-3 mb-2 text-sm" style={{ backgroundColor: "#F0F4FF", color: "#0D1B4B", borderLeft: "3px solid #BF0A30" }}>
          <p className="font-semibold mb-1">Tent host requirements</p>
          <ul className="space-y-0.5" style={{ color: "#143437" }}>
            <li>Open to families and church groups only</li>
            <li>All treats / items must be <strong>free</strong> — no selling or fundraising</li>
            <li>Standard tent size: 10×10</li>
            <li>Setup / teardown times provided upon confirmation</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Family Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="modal-family-name"
              className="text-sm font-medium"
              style={{ color: "#143437" }}
            >
              Family Name <span aria-hidden="true" style={{ color: "#b44b5d" }}>*</span>
            </label>
            <input
              ref={firstInputRef}
              id="modal-family-name"
              type="text"
              autoComplete="family-name"
              required
              disabled={submitting}
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className={inputClass}
              style={{ ...inputStyle, ...focusRingStyle }}
              placeholder="Smith"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="modal-email"
              className="text-sm font-medium"
              style={{ color: "#143437" }}
            >
              Email <span aria-hidden="true" style={{ color: "#b44b5d" }}>*</span>
            </label>
            <input
              id="modal-email"
              type="email"
              autoComplete="email"
              required
              disabled={submitting}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailExistsError(null);
              }}
              className={inputClass}
              style={{
                ...inputStyle,
                ...focusRingStyle,
                borderColor: emailExistsError ? "#b44b5d" : "#c9c9c9",
              }}
              placeholder="smith@example.com"
              aria-describedby={emailExistsError ? "email-error" : undefined}
              aria-invalid={emailExistsError ? "true" : "false"}
            />
            {emailExistsError && (
              <p id="email-error" className="text-sm" style={{ color: "#b44b5d" }}>
                {emailExistsError}
              </p>
            )}
          </div>

          {/* Phone (optional) */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="modal-phone"
              className="text-sm font-medium"
              style={{ color: "#143437" }}
            >
              Phone{" "}
              <span className="text-xs font-normal" style={{ color: "#6b7280" }}>
                (optional)
              </span>
            </label>
            <input
              id="modal-phone"
              type="tel"
              autoComplete="tel"
              disabled={submitting}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              style={{ ...inputStyle, ...focusRingStyle }}
              placeholder="(803) 555-0100"
            />
          </div>

          {/* Purpose */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="modal-purpose"
              className="text-sm font-medium"
              style={{ color: "#143437" }}
            >
              How do you plan to use this spot?{" "}
              <span aria-hidden="true" style={{ color: "#b44b5d" }}>*</span>
            </label>
            <textarea
              id="modal-purpose"
              required
              disabled={submitting}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 resize-none"
              style={{ ...inputStyle, ...focusRingStyle }}
              placeholder="e.g. Smith family hosting a snow cone tent for the community"
            />
            <p className="text-xs text-right" style={{ color: "#6b7280" }}>
              {purpose.length}/500
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting || !canSubmit}
            className="w-full py-3 text-sm font-semibold rounded transition-opacity disabled:opacity-50"
            style={{ backgroundColor: "#039149", color: "#ffffff", borderRadius: "6px" }}
          >
            {submitting ? "Submitting…" : "Request Spot"}
          </button>
        </form>
      </div>
    </div>
  );
}
