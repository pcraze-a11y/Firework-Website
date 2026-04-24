"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onDismiss: () => void;
}

export default function Toast({ message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const bg = type === "success" ? "#039149" : "#b44b5d";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg max-w-sm"
      style={{ backgroundColor: bg, color: "#ffffff" }}
    >
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 flex items-center justify-center min-w-[44px] min-h-[44px] -mr-2 rounded-lg hover:bg-white/20 transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="3" y1="3" x2="13" y2="13" />
          <line x1="13" y1="3" x2="3" y2="13" />
        </svg>
      </button>
    </div>
  );
}
