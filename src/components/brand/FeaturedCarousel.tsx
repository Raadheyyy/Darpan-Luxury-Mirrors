import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  formatProductPrice,
  getProducts,
  isShopifyConfigured,
  SHOPIFY_COLLECTION_HANDLE,
} from "@/lib/shopify";

export function FeaturedCarousel() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const productsQuery = useQuery({
    queryKey: ["shopify-products", SHOPIFY_COLLECTION_HANDLE],
    queryFn: () => getProducts(SHOPIFY_COLLECTION_HANDLE),
    enabled: isShopifyConfigured,
  });
  const products = productsQuery.data ?? [];

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 40 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!isShopifyConfigured) {
    return (
      <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center">
        <p className="eyebrow text-[var(--color-gold)]">Shopify Setup Required</p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-brown)]/80">
          Add Storefront API credentials to show live products here.
        </p>
      </div>
    );
  }

  if (productsQuery.isLoading) {
    return <p className="py-12 text-center text-sm text-[var(--color-taupe)]">Loading collection...</p>;
  }

  if (productsQuery.error || products.length === 0) {
    return (
      <p className="py-12 text-center text-sm leading-relaxed text-[var(--color-brown)]/75">
        The featured Shopify collection is not available yet.
      </p>
    );
  }

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth px-6 pb-4 lg:-mx-10 lg:px-10"
      >
        {products.map((p) => (
          <Link
            key={p.id}
            to="/shop/$slug"
            params={{ slug: p.handle }}
            data-card
            className="group block w-[78%] shrink-0 snap-center sm:w-[46%] lg:w-[31%]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-sandstone)] shadow-[0_24px_80px_-45px_rgba(63,47,32,0.55)]">
              {p.image ? (
                <img
                  src={p.image.url}
                  alt={p.image.altText ?? p.title}
                  width={p.image.width ?? 1024}
                  height={p.image.height ?? 1280}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-[var(--color-sandstone)]" />
              )}
              <div className="pointer-events-none absolute inset-0 border border-[var(--color-gold)]/25" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[var(--color-taupe)]">{p.shape}</p>
                <h3 className="mt-2 font-display text-2xl text-[var(--color-brown-deep)]">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm italic text-[var(--color-taupe)]">
                  {p.tagline}
                </p>
              </div>
              <p className="shrink-0 font-display text-lg text-[var(--color-brown)]">
                {formatProductPrice(p)}
              </p>
            </div>
          </Link>
        ))}
      </div>

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
