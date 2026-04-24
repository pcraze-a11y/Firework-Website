"use client";

interface Spot {
  id: string;
  row: string;
  col: number;
  reservation?: { familyName: string; status: string } | null;
}

interface TentMapProps {
  spots: Spot[];
  selectedSpotId: string | null;
  onSpotClick: (spotId: string) => void;
}

// Exact white-square centers measured from the 705×490 aerial image via pixel analysis.
// Left column = A1–A9, right column = B1–B9.
const SPOT_LAYOUT = [
  { id: "A1", cx: 243, cy: 200 },
  { id: "A2", cx: 254, cy: 216 },
  { id: "A3", cx: 265, cy: 231 },
  { id: "A4", cx: 276, cy: 247 },
  { id: "A5", cx: 287, cy: 263 },
  { id: "A6", cx: 298, cy: 279 },
  { id: "A7", cx: 309, cy: 294 },
  { id: "A8", cx: 320, cy: 310 },
  { id: "A9", cx: 331, cy: 326 },
  { id: "B1", cx: 308, cy: 164 },
  { id: "B2", cx: 319, cy: 180 },
  { id: "B3", cx: 330, cy: 196 },
  { id: "B4", cx: 341, cy: 212 },
  { id: "B5", cx: 352, cy: 227 },
  { id: "B6", cx: 363, cy: 243 },
  { id: "B7", cx: 374, cy: 259 },
  { id: "B8", cx: 385, cy: 274 },
  { id: "B9", cx: 396, cy: 290 },
];

// Squares are ~16.4px per side, rotated ~55° clockwise (measured from axis-aligned bounding
// boxes of 22–23px and pixel area of ~269). Spots are sized slightly over to guarantee coverage.
const TILT = 55;
const SPOT_W = 18;
const SPOT_H = 18;

function truncate(name: string, max = 6): string {
  return name.length > max ? name.slice(0, max) + "…" : name;
}

export default function TentMap({ spots, selectedSpotId, onSpotClick }: TentMapProps) {
  const spotMap = new Map<string, Spot>();
  for (const s of spots) spotMap.set(s.id, s);

  return (
    <svg
      viewBox="0 0 705 490"
      width="100%"
      role="img"
      aria-label="Tent reservation map"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", display: "block" }}
    >
      {/* Aerial photo background */}
      <image
        href="/aerial-map.jpg"
        x="0"
        y="0"
        width="705"
        height="490"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Tent spots — positioned at pixel-exact centers from image analysis */}
      {SPOT_LAYOUT.map(({ id, cx, cy }) => {
        const spot = spotMap.get(id);
        const isPending = spot?.reservation?.status === "pending";
        const isConfirmed = spot?.reservation?.status === "confirmed";
        const isTaken = isPending || isConfirmed;
        const isSelected = selectedSpotId === id && !isTaken;

        let fill: string;
        let stroke: string;
        let strokeWidth: number;
        let fillOpacity: number;

        if (isPending) {
          fill = "#fef9c3";
          stroke = "#ca8a04";
          strokeWidth = 1.5;
          fillOpacity = 1;
        } else if (isConfirmed) {
          fill = "#d1d5db";
          stroke = "#9ca3af";
          strokeWidth = 1.5;
          fillOpacity = 1;
        } else if (isSelected) {
          fill = "#dbeafe";
          stroke = "#3b82f6";
          strokeWidth = 2;
          fillOpacity = 1;
        } else {
          fill = "#e6f4ed";
          stroke = "#039149";
          strokeWidth = 1.5;
          fillOpacity = 1;
        }

        const cursor = isTaken ? "not-allowed" : "pointer";

        let ariaLabel: string;
        if (isPending) {
          ariaLabel = `Spot ${id}, pending review`;
        } else if (isConfirmed && spot?.reservation) {
          ariaLabel = `Spot ${id}, reserved by ${spot.reservation.familyName}`;
        } else if (isSelected) {
          ariaLabel = `Spot ${id}, selected`;
        } else {
          ariaLabel = `Spot ${id}, available`;
        }

        const handleClick = () => {
          if (isTaken) return;
          onSpotClick(id);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        };

        return (
          <g
            key={id}
            tabIndex={0}
            role="button"
            aria-label={ariaLabel}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={{ cursor, outline: "none" }}
            transform={`rotate(${TILT}, ${cx}, ${cy})`}
          >
            {/* Touch target */}
            <rect
              x={cx - SPOT_W / 2 - 4}
              y={cy - SPOT_H / 2 - 4}
              width={SPOT_W + 8}
              height={SPOT_H + 8}
              fill="transparent"
            />
            {isPending && <title>Spot {id} — pending review</title>}
            {isConfirmed && spot?.reservation && <title>{spot.reservation.familyName}</title>}
            <rect
              x={cx - SPOT_W / 2}
              y={cy - SPOT_H / 2}
              width={SPOT_W}
              height={SPOT_H}
              rx={2}
              fill={fill}
              fillOpacity={fillOpacity}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
            <text
              x={cx}
              y={isConfirmed && spot?.reservation ? cy - 3 : cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={8}
              fontWeight={700}
              fill={isTaken ? "#4b5563" : "#135658"}
            >
              {id}
            </text>
            {isConfirmed && spot?.reservation && (
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={6}
                fill="#4b5563"
              >
                {truncate(spot.reservation.familyName)}
              </text>
            )}
          </g>
        );
      })}

      {/* Legend — bottom-right over less-critical image area */}
      <g transform="translate(572, 410)">
        <rect x={-8} y={-8} width={130} height={84} rx={6} fill="white" fillOpacity={0.88} />
        <rect x={0} y={0} width={16} height={12} rx={2} fill="#e6f4ed" fillOpacity={0.9} stroke="#039149" strokeWidth={1.5} />
        <text x={22} y={6} dominantBaseline="middle" fontSize={11} fill="#374151">Available</text>
        <rect x={0} y={22} width={16} height={12} rx={2} fill="#fef9c3" fillOpacity={0.9} stroke="#ca8a04" strokeWidth={1.5} />
        <text x={22} y={28} dominantBaseline="middle" fontSize={11} fill="#374151">Pending</text>
        <rect x={0} y={44} width={16} height={12} rx={2} fill="#d1d5db" fillOpacity={0.9} stroke="#9ca3af" strokeWidth={1.5} />
        <text x={22} y={50} dominantBaseline="middle" fontSize={11} fill="#374151">Reserved</text>
      </g>
    </svg>
  );
}
