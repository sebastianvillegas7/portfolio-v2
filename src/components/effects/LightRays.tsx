"use client";

interface LightRaysProps {
  color?: string;
  intensity?: number;
  className?: string;
}

function hexToRgb(hex: string) {
  const match =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return match
    ? {
        r: Number.parseInt(match[1], 16),
        g: Number.parseInt(match[2], 16),
        b: Number.parseInt(match[3], 16),
      }
    : {
        r: 255,
        g: 255,
        b: 255,
      };
}

export function LightRays({
  color = "#ffffff",
  intensity = 1,
  className = "",
}: LightRaysProps) {
  const rgb = hexToRgb(color);

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="absolute inset-0 animate-[hero-light-pulse_5.5s_ease-in-out_infinite]"
        style={{
          opacity: intensity,
          background: `
            radial-gradient(
              ellipse 68% 46% at 100% 0%,
              rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.34) 0%,
              rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18) 26%,
              rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.065) 44%,
              transparent 66%
            )
          `,
        }}
      />

      <style>{`
        @keyframes hero-light-pulse {
          0%, 100% {
            opacity: ${Math.max(0, Math.min(1, intensity * 0.88))};
          }

          50% {
            opacity: ${Math.max(0, Math.min(1, intensity))};
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[hero-light-pulse_5\\.5s_ease-in-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
