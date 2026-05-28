import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ArchFrame } from "@/components/brand/ArchFrame";
import { products, formatPrice, type Product } from "@/lib/products";

export const Route = createFileRoute("/shop/$slug")({
  component: ProductPage,
  loader: ({ params }): { product: Product } => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
});

function ProductPage() {
  const { product } = Route.useLoaderData();


  return (
    <>
      <SiteNav />

      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-10">
        <nav className="eyebrow mb-10 text-[var(--color-taupe)]">
          <Link to="/shop" className="hover:text-[var(--color-gold)]">Collection</Link>
          <span className="mx-3">/</span>
          <span className="text-[var(--color-brown)]">{product.name}</span>
        </nav>

        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <div className="md:sticky md:top-28">
            <ArchFrame
              variant={product.shape === "Round" ? "round" : product.shape === "Arch" ? "arch" : "rect"}
              className={`w-full bg-[var(--color-sandstone)] ${
                product.shape === "Round" ? "aspect-square" : "aspect-[3/4]"
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
            </ArchFrame>
          </div>

          <div>
            <p className="eyebrow text-[var(--color-taupe)]">{product.shape}</p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-[var(--color-brown-deep)] sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-3 font-display text-xl italic text-[var(--color-taupe)]">
              {product.tagline}
            </p>
            <div className="hairline mt-8 w-24" />
            <p className="mt-8 text-base leading-relaxed text-[var(--color-brown)]/85">
              {product.story}
            </p>

            <div className="mt-10 flex items-baseline gap-4">
              <span className="font-display text-3xl text-[var(--color-brown)]">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-[var(--color-taupe)]">Incl. GST · Free India shipping</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                disabled
                className="eyebrow inline-flex items-center gap-2 bg-[var(--color-brown)] px-8 py-4 text-[var(--color-ivory)] opacity-90"
                title="Online checkout opens shortly"
              >
                Add to Cart — Coming soon
              </button>
              <Link
                to="/contact"
                className="eyebrow inline-flex items-center gap-2 border border-[var(--color-brown)]/40 px-8 py-4 text-[var(--color-brown)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                Trade Enquiry
              </Link>
            </div>

            <dl className="mt-14 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] text-sm">
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="eyebrow text-[var(--color-taupe)]">Dimensions</dt>
                <dd className="col-span-2 text-[var(--color-brown)]">{product.dimensions}</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="eyebrow text-[var(--color-taupe)]">Light</dt>
                <dd className="col-span-2 text-[var(--color-brown)]">{product.glow}</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="eyebrow text-[var(--color-taupe)]">Lead Time</dt>
                <dd className="col-span-2 text-[var(--color-brown)]">4–6 weeks, made to order</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="eyebrow text-[var(--color-taupe)]">Origin</dt>
                <dd className="col-span-2 text-[var(--color-brown)]">Handcrafted in Jaipur, India</dd>
              </div>
            </dl>

            <div className="mt-10">
              <p className="eyebrow">Features</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-brown)]/90">
                {product.features.map((f: string) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
