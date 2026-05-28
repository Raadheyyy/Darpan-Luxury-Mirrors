import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ArchFrame } from "@/components/brand/ArchFrame";
import { Reveal } from "@/components/brand/Reveal";
import {
  products,
  formatPrice,
  SHAPE_ORDER,
  SHAPE_LABEL,
  type Shape,
} from "@/lib/products";

export const Route = createFileRoute("/shop/")({ component: Shop });

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price · Low to High" },
  { value: "price-desc", label: "Price · High to Low" },
  { value: "name", label: "Name · A–Z" },
];

function Shop() {
  const [filter, setFilter] = useState<Shape | "All">("All");
  const [sort, setSort] = useState<SortKey>("featured");

  const grouped = useMemo(() => {
    const all = filter === "All" ? products : products.filter((p) => p.shape === filter);
    const sortFn = (a: typeof all[number], b: typeof all[number]) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    };
    const out: { shape: Shape; items: typeof all }[] = [];
    SHAPE_ORDER.forEach((s) => {
      const items = all.filter((p) => p.shape === s).sort(sortFn);
      if (items.length) out.push({ shape: s, items });
    });
    return out;
  }, [filter, sort]);

  const totalCount = filter === "All" ? products.length : grouped.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <SiteNav />

      {/* Page intro */}
      <section className="page-enter mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-10">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl text-[var(--color-brown-deep)] sm:text-6xl">
          Mirrors made to order, in Jaipur.
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-brown)]/80">
          Each silhouette is offered in standard and custom sizing, with tunable warm-to-cool
          backlight and a hand-polished finish. Lead time 4–6 weeks.
        </p>
        <div className="hairline mt-10 w-32" />
      </section>

      {/* Sticky filter + sort bar */}
      <div className="sticky top-20 z-30 -mt-2 border-y border-[var(--color-border)]/70 bg-[var(--color-ivory)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="eyebrow shrink-0 pr-2 text-[var(--color-taupe)]">Filter</span>
            {(["All", ...SHAPE_ORDER] as const).map((s) => {
              const active = filter === s;
              const label = s === "All" ? `All · ${products.length}` : SHAPE_LABEL[s as Shape];
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
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

      {/* Grouped product sections */}
      <section className="mx-auto max-w-7xl px-6 pb-32 pt-16 lg:px-10">
        {totalCount === 0 && (
          <p className="py-24 text-center text-sm italic text-[var(--color-taupe)]">
            No mirrors match this filter yet.
          </p>
        )}

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

              <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 80}>
                    <Link
                      to="/shop/$slug"
                      params={{ slug: p.slug }}
                      className="group block"
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
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
