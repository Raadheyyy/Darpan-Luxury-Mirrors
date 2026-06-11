import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { Reveal } from "@/components/brand/Reveal";
import {
  getProducts,
  formatProductPrice,
  isShopifyConfigured,
  SHOPIFY_COLLECTION_HANDLE,
  SHAPE_LABEL,
  SHAPE_ORDER,
  type ProductShape,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/shop/")({ component: Shop });

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price · Low to High" },
  { value: "price-desc", label: "Price · High to Low" },
  { value: "name", label: "Name · A-Z" },
];

function Shop() {
  const [filter, setFilter] = useState<ProductShape | "All">("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const productsQuery = useQuery({
    queryKey: ["shopify-products", SHOPIFY_COLLECTION_HANDLE],
    queryFn: () => getProducts(SHOPIFY_COLLECTION_HANDLE),
    enabled: isShopifyConfigured,
  });

  const products = productsQuery.data ?? [];
  const availableShapes = SHAPE_ORDER.filter((shape) => products.some((p) => p.shape === shape));

  const visibleProducts = useMemo(() => {
    const all = filter === "All" ? products : products.filter((p) => p.shape === filter);
    const sortFn = (a: ShopifyProduct, b: ShopifyProduct) => {
      switch (sort) {
        case "price-asc":
          return Number(a.priceRange.minVariantPrice.amount) - Number(b.priceRange.minVariantPrice.amount);
        case "price-desc":
          return Number(b.priceRange.minVariantPrice.amount) - Number(a.priceRange.minVariantPrice.amount);
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    };
    return [...all].sort(sortFn);
  }, [filter, products, sort]);

  const grouped = useMemo(() => {
    const out: { shape: ProductShape; items: ShopifyProduct[] }[] = [];
    SHAPE_ORDER.forEach((shape) => {
      const items = visibleProducts.filter((p) => p.shape === shape);
      if (items.length) out.push({ shape, items });
    });
    return out;
  }, [visibleProducts]);

  const totalCount = visibleProducts.length;

  return (
    <>
      <SiteNav />

      <section className="page-enter mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-10">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl text-[var(--color-brown-deep)] sm:text-6xl">
          Mirrors made to order, in Jaipur.
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-brown)]/80">
          Premium illuminated mirrors and designer statement pieces built with deep profiles,
          sealed electrical channels and rigid wall mounting. Shopify keeps pricing,
          availability and checkout live.
        </p>
        <div className="hairline mt-10 w-32" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <div className="grid gap-4 border-y border-[var(--color-border)] py-6 md:grid-cols-3">
          {[
            {
              label: "Solid Presence",
              desc: "Deep engineered frames and concealed brackets help each mirror sit firmly on the wall.",
            },
            {
              label: "Protected Lighting",
              desc: "LED channels and drivers are kept serviceable, sealed and hidden inside the frame.",
            },
            {
              label: "Secure Checkout",
              desc: "Cart, payment, tax, shipping and order confirmation are handled through Shopify.",
            },
          ].map((item) => (
            <div key={item.label} className="pr-6">
              <p className="eyebrow text-[var(--color-gold)]">{item.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-brown)]/78">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky top-20 z-30 -mt-2 border-y border-[var(--color-border)]/70 bg-[var(--color-ivory)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="eyebrow shrink-0 pr-2 text-[var(--color-taupe)]">Filter</span>
            {(["All", ...availableShapes] as const).map((shape) => {
              const active = filter === shape;
              const label = shape === "All" ? `All · ${products.length}` : SHAPE_LABEL[shape];
              return (
                <button
                  key={shape}
                  onClick={() => setFilter(shape)}
                  className={`eyebrow shrink-0 border px-3.5 py-2 text-[0.62rem] transition-colors ${
                    active
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-ivory)]"
                      : "border-[var(--color-border)] text-[var(--color-brown)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="eyebrow text-[var(--color-taupe)]">Sort</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="eyebrow appearance-none border border-[var(--color-border)] bg-transparent px-4 py-2 pr-9 text-[0.65rem] text-[var(--color-brown)] focus:border-[var(--color-gold)] focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 10 6"
                className="pointer-events-none absolute right-3 top-1/2 h-2 w-2.5 -translate-y-1/2 text-[var(--color-brown)]"
                fill="currentColor"
              >
                <path d="M0 0 L5 6 L10 0 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-32 pt-16 lg:px-10">
        {!isShopifyConfigured && <ShopifySetupNotice />}

        {isShopifyConfigured && productsQuery.isLoading && (
          <p className="py-24 text-center text-sm italic text-[var(--color-taupe)]">
            Loading the Shopify collection...
          </p>
        )}

        {isShopifyConfigured && productsQuery.error && (
          <p className="py-24 text-center text-sm leading-relaxed text-[var(--color-brown)]/80">
            Shopify products could not be loaded. Check the Storefront API credentials and the{" "}
            <span className="font-medium">{SHOPIFY_COLLECTION_HANDLE}</span> collection handle.
          </p>
        )}

        {isShopifyConfigured && !productsQuery.isLoading && !productsQuery.error && totalCount === 0 && (
          <p className="py-24 text-center text-sm italic text-[var(--color-taupe)]">
            No mirrors match this filter yet.
          </p>
        )}

        {isShopifyConfigured && totalCount > 0 && filter === "All" ? (
          <ProductGrid items={visibleProducts} />
        ) : isShopifyConfigured && totalCount > 0 ? (
          <div className="space-y-28">
            {grouped.map((group) => (
              <div key={group.shape} id={group.shape.toLowerCase()}>
                <Reveal className="mb-12 flex items-end justify-between gap-6 border-b border-[var(--color-border)] pb-6">
                  <div>
                    <p className="eyebrow text-[var(--color-gold)]">
                      {String(SHAPE_ORDER.indexOf(group.shape) + 1).padStart(2, "0")} ·{" "}
                      {group.shape}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-[var(--color-brown-deep)] sm:text-4xl">
                      {SHAPE_LABEL[group.shape]}
                    </h2>
                  </div>
                  <p className="eyebrow shrink-0 pb-2 text-[var(--color-taupe)]">
                    {group.items.length} {group.items.length === 1 ? "piece" : "pieces"}
                  </p>
                </Reveal>

                <ProductGrid items={group.items} />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <SiteFooter />
    </>
  );
}

function ShopifySetupNotice() {
  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center sm:p-12">
      <p className="eyebrow text-[var(--color-gold)]">Shopify Setup Required</p>
      <h2 className="mt-4 font-display text-4xl text-[var(--color-brown-deep)]">
        Connect Shopify to show live products.
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--color-brown)]/80">
        Add <code>VITE_SHOPIFY_STORE_DOMAIN</code>,{" "}
        <code>VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN</code>, and optionally{" "}
        <code>VITE_SHOPIFY_COLLECTION_HANDLE</code> to load the live catalog and enable checkout.
      </p>
    </div>
  );
}

function ProductGrid({ items }: { items: ShopifyProduct[] }) {
  return (
    <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.id} delay={i * 80}>
          <Link
            to="/shop/$slug"
            params={{ slug: p.handle }}
            className="group block"
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
                {!p.availableForSale && (
                  <p className="eyebrow mt-3 text-[var(--color-taupe)]">Currently unavailable</p>
                )}
              </div>
              <p className="shrink-0 font-display text-lg text-[var(--color-brown)]">
                {formatProductPrice(p)}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
