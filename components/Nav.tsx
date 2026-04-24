"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const link = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className="px-4 py-2 rounded text-sm font-semibold flex items-center min-h-[44px] transition-colors"
        style={{
          backgroundColor: active ? "#F0F4FF" : "transparent",
          color: active ? "#001F5B" : "#EEF2FF",
          textDecoration: "none",
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-2"
      style={{ backgroundColor: "#002868" }}
    >
      <img
        src="/eagle.jpeg"
        alt="Patriotic bald eagle"
        className="rounded"
        style={{ height: "40px", width: "40px", objectFit: "cover", filter: "grayscale(100%) sepia(100%) hue-rotate(200deg) saturate(500%) brightness(1.1)" }}
      />
      <div className="flex gap-1">
        {link("/", "Home")}
        {link("/reserve", "Reserve an Event Tent")}
      </div>
    </nav>
  );
}
