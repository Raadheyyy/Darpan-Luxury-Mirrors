import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArchFrame } from "@/components/brand/ArchFrame";
import { products, formatPrice } from "@/lib/products";

export function FeaturedCarousel() {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 40 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth px-6 pb-4 lg:-mx-10 lg:px-10"
      >
        {products.map((p) => (
          <Link
            key={p.slug}
            to="/shop/$slug"
            params={{ slug: p.slug }}
            data-card
            className="group block w-[78%] shrink-0 snap-center sm:w-[46%] lg:w-[31%]"
          >
            <ArchFrame
              variant={p.shape === "Round" ? "round" : p.shape === "Arch" ? "arch" : "rect"}
              className={`w-full bg-[var(--color-sandstone)] ${
                p.shape === "Round" ? "aspect-square" : "aspect-[3/4]"
              }`}
            >
              <img
                src={p.image}
                alt={p.name}
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
            </ArchFrame>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[var(--color-taupe)]">{p.shape}</p>
                <h3 className="mt-2 font-display text-2xl text-[var(--color-brown-deep)]">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-sm italic text-[var(--color-taupe)]">
                  {p.tagline}
                </p>
              </div>
              <p className="shrink-0 font-display text-lg text-[var(--color-brown)]">
                {formatPrice(p.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-between gap-6">
        <p className="eyebrow text-[var(--color-taupe)]">
          {products.length} pieces · scroll or use the arrows
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            className="grid h-11 w-11 place-items-center border border-[var(--color-border)] text-[var(--color-brown)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M15 6 L9 12 L15 18" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollBy(1)}
            className="grid h-11 w-11 place-items-center border border-[var(--color-border)] text-[var(--color-brown)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M9 6 L15 12 L9 18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
