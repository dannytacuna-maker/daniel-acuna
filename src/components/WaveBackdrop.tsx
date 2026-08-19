"use client";

const WIDTH = 1920;
const HEIGHT = 360;
const LINES = 16;

function wavePath(index: number): string {
  const offset = (index - LINES / 2) * 5.4;
  const amp = 58 + Math.abs(index - LINES / 2) * 2.2;
  const phase = index * 0.34;
  const parts: string[] = [];

  for (let x = 0; x <= WIDTH; x += 6) {
    const t = x / WIDTH;
    const y =
      HEIGHT * 0.5 +
      offset +
      Math.sin(t * Math.PI * 2.05 + phase) * amp +
      Math.sin(t * Math.PI * 4.1 + phase * 0.6) * amp * 0.22;

    parts.push(`${x === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(2)}`);
  }

  return parts.join(" ");
}

export function WaveBackdrop() {
  return (
    <div className="wave-backdrop" aria-hidden="true">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none">
        {Array.from({ length: LINES }, (_, i) => (
          <path
            key={i}
            d={wavePath(i)}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            opacity={0.55 + (i / LINES) * 0.28}
          />
        ))}
      </svg>
    </div>
  );
}
