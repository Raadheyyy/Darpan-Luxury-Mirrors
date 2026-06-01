import { useEffect, useState } from "react";

export function BrandIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2650);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="brand-intro fixed inset-0 z-[100] flex items-center justify-center bg-[#050403]">
      <div className="brand-intro-glow" />
      <div className="brand-intro-mark relative flex flex-col items-center px-8">
        <img
          src="/logo-loader-mark-transparent.png"
          alt="Darpan"
          className="h-16 w-auto object-contain opacity-90 sm:h-20"
        />
        <img
          src="/logo-nav-wordmark-transparent.png"
          alt="Darpan"
          className="mt-7 w-[220px] max-w-[70vw] object-contain opacity-85 sm:w-[360px]"
        />
        <div className="mt-7 flex items-center gap-4 text-[0.58rem] font-medium uppercase tracking-[0.48em] text-[var(--color-sandstone)]/55 sm:text-[0.64rem]">
          <span>Jaipur</span>
          <span className="h-1 w-1 rounded-full bg-[var(--color-gold)]/60" />
          <span>Luxury Mirrors</span>
        </div>
      </div>
    </div>
  );
}
