import { useEffect, useState } from "react";

export function BrandIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1350);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="brand-intro fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-brown)]">
      <div className="brand-intro-mark flex flex-col items-center">
        <img
          src="/logo-loader-mark-transparent.png"
          alt="Darpan"
          className="h-40 w-auto object-contain opacity-95 sm:h-52"
        />
        <div className="mt-9 h-px w-20 bg-[var(--color-gold-soft)]/55" />
      </div>
    </div>
  );
}
