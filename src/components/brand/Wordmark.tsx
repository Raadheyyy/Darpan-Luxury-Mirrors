type Props = { className?: string; tagline?: boolean };

export function Wordmark({ className = "", tagline = false }: Props) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <span className="wordmark text-[1.35rem] sm:text-2xl text-[var(--color-brown)]">
        Darpan
      </span>
      {tagline && (
        <span className="mt-1 eyebrow text-[0.6rem] text-[var(--color-taupe)]">
          Jaipur
        </span>
      )}
    </div>
  );
}

export function ArchMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} fill="none" aria-hidden>
      <path
        d="M32 4 C50 4 60 14 60 32 L60 76 L4 76 L4 32 C4 14 14 4 32 4 Z"
        stroke="#c8a26a"
        strokeWidth="1.2"
      />
      <circle cx="32" cy="10" r="0.9" fill="#c8a26a" />
      {/* small floral inside */}
      <g stroke="#c8a26a" strokeWidth="0.9" strokeLinecap="round">
        <line x1="32" y1="58" x2="32" y2="36" />
        <path d="M32 36 c -3 -2 -5 -6 -3 -9 c 2 -2 5 -1 5 2" />
        <path d="M32 36 c 3 -2 5 -6 3 -9 c -2 -2 -5 -1 -5 2" />
        <path d="M27 48 c -4 0 -6 -3 -5 -6 c 1 -2 4 -2 5 1" />
        <path d="M37 48 c 4 0 6 -3 5 -6 c -1 -2 -4 -2 -5 1" />
      </g>
    </svg>
  );
}
