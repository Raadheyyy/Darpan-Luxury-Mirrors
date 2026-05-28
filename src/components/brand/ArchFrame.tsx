import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "arch" | "round" | "rect";
};

// Jharokha arched frame using CSS clip-path
export function ArchFrame({ children, className = "", variant = "arch" }: Props) {
  if (variant === "rect") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {children}
        <div className="pointer-events-none absolute inset-0 border border-[var(--color-gold)]/30" />
      </div>
    );
  }

  const clip =
    variant === "round"
      ? "circle(50% at 50% 50%)"
      : "path('M 0 100 Q 0 0 50 0 Q 100 0 100 100 L 100 100 L 0 100 Z')";

  if (variant === "round") {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 rounded-full" style={{ clipPath: clip }}>
          {children}
        </div>
      </div>
    );
  }

  // Use SVG mask for jharokha arch (pointed top)
  return (
    <div className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="jharokha-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0 C 0.72 0 0.92 0.08 0.96 0.22 L 1 0.4 L 1 1 L 0 1 L 0 0.4 L 0.04 0.22 C 0.08 0.08 0.28 0 0.5 0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ clipPath: "url(#jharokha-clip)" }}>
        {children}
      </div>
      {/* Gold hairline border traced along clip */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M 50 0.5 C 72 0.5 92 8 96 22 L 99.5 40 L 99.5 99.5 L 0.5 99.5 L 0.5 40 L 4 22 C 8 8 28 0.5 50 0.5 Z"
          fill="none"
          stroke="#c8a26a"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
