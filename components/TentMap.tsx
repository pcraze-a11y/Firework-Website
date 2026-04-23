"use client";

interface Spot {
  id: string;
  row: string;
  col: number;
  reservation?: { familyName: string } | null;
}

interface TentMapProps {
  spots: Spot[];
  selectedSpotId: string | null;
  onSpotClick: (spotId: string) => void;
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SPOT_W = 72;
const SPOT_H = 60;
const GAP = 8;
const GRID_START_Y = 100;

const TOTAL_GRID_W = COLS.length * SPOT_W + (COLS.length - 1) * GAP;
const GRID_START_X = (900 - TOTAL_GRID_W) / 2;

function truncate(name: string, max = 8): string {
  return name.length > max ? name.slice(0, max) + "…" : name;
}

export default function TentMap({ spots, selectedSpotId, onSpotClick }: TentMapProps) {
  const spotMap = new Map<string, Spot>();
  for (const s of spots) {
    spotMap.set(s.id, s);
  }

  return (
    <svg
      viewBox="0 0 900 600"
      width="100%"
      role="img"
      aria-label="Tent reservation map"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", display: "block" }}
    >
      {/* Clubhouse */}
      <rect x={0} y={10} width={900} height={60} fill="#135658" />
      <text
        x={450}
        y={47}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={18}
        fontWeight={700}
        letterSpacing={2}
      >
        CLUBHOUSE
      </text>

      {/* 18th Fairway */}
      <rect x={0} y={530} width={900} height={60} fill="#3bb673" />
      <text
        x={450}
        y={563}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={18}
        fontWeight={700}
        letterSpacing={2}
      >
        18TH FAIRWAY
      </text>

      {/* Spot grid */}
      {ROWS.map((row, rowIdx) =>
        COLS.map((col, colIdx) => {
          const id = `${row}${col}`;
          const spot = spotMap.get(id);
          const isReserved = Boolean(spot?.reservation);
          const isSelected = selectedSpotId === id;

          const x = GRID_START_X + colIdx * (SPOT_W + GAP);
          const y = GRID_START_Y + rowIdx * (SPOT_H + GAP);

          let fill: string;
          let stroke: string;
          let strokeWidth: number;

          if (isSelected) {
            fill = "#fff4df";
            stroke = "#ff9a83";
            strokeWidth = 2.5;
          } else if (isReserved) {
            fill = "#d1d5db";
            stroke = "#9ca3af";
            strokeWidth = 2;
          } else {
            fill = "#e6f4ed";
            stroke = "#039149";
            strokeWidth = 2;
          }

          const cursor = isReserved ? "not-allowed" : "pointer";

          let ariaLabel: string;
          if (isSelected) {
            ariaLabel = `Spot ${id}, selected`;
          } else if (isReserved && spot?.reservation) {
            ariaLabel = `Spot ${id}, reserved by ${spot.reservation.familyName}`;
          } else {
            ariaLabel = `Spot ${id}, available`;
          }

          const handleClick = () => {
            if (isReserved) return;
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
            >
              {/* Invisible touch target padding to 44×44 minimum */}
              <rect
                x={x - Math.max(0, (44 - SPOT_W) / 2)}
                y={y - Math.max(0, (44 - SPOT_H) / 2)}
                width={Math.max(SPOT_W, 44)}
                height={Math.max(SPOT_H, 44)}
                fill="transparent"
              />
              {isReserved && spot?.reservation && (
                <title>{spot.reservation.familyName}</title>
              )}
              <rect
                x={x}
                y={y}
                width={SPOT_W}
                height={SPOT_H}
                rx={4}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
              />
              <text
                x={x + SPOT_W / 2}
                y={isReserved && spot?.reservation ? y + SPOT_H / 2 - 7 : y + SPOT_H / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={600}
                fill={isReserved ? "#6b7280" : "#135658"}
              >
                {id}
              </text>
              {isReserved && spot?.reservation && (
                <text
                  x={x + SPOT_W / 2}
                  y={y + SPOT_H / 2 + 9}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={9}
                  fill="#6b7280"
                >
                  {truncate(spot.reservation.familyName)}
                </text>
              )}
            </g>
          );
        })
      )}

      {/* Legend */}
      <g transform="translate(10, 160)">
        <rect x={0} y={0} width={20} height={16} rx={3} fill="#e6f4ed" stroke="#039149" strokeWidth={2} />
        <text x={26} y={8} dominantBaseline="middle" fontSize={11} fill="#374151">Available</text>

        <rect x={0} y={24} width={20} height={16} rx={3} fill="#d1d5db" stroke="#9ca3af" strokeWidth={2} />
        <text x={26} y={32} dominantBaseline="middle" fontSize={11} fill="#374151">Reserved</text>

        <rect x={0} y={48} width={20} height={16} rx={3} fill="#fff4df" stroke="#ff9a83" strokeWidth={2.5} />
        <text x={26} y={56} dominantBaseline="middle" fontSize={11} fill="#374151">Your selection</text>
      </g>
    </svg>
  );
}
