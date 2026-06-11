import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { useCart } from "@/lib/cart-context";
import {
  formatMoney,
  getProduct,
  isShopifyConfigured,
  variantTitle,
  type ShopifyProductVariant,
} from "@/lib/shopify";

export const Route = createFileRoute("/shop/$slug")({ component: ProductPage });

function ProductPage() {
  const { slug } = Route.useParams();
  const { addItem, isUpdating, error: cartError } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const productQuery = useQuery({
    queryKey: ["shopify-product", slug],
    queryFn: () => getProduct(slug),
    enabled: isShopifyConfigured,
  });

  const product = productQuery.data;
  const selectedVariant = useMemo(
    () => product?.variants.find((variant) => variant.id === selectedVariantId) ?? product?.variants[0],
    [product, selectedVariantId],
  );

  useEffect(() => {
    if (product?.variants.length) {
      const firstAvailable = product.variants.find((variant) => variant.availableForSale) ?? product.variants[0];
      setSelectedVariantId(firstAvailable.id);
    }
  }, [product]);

  const addToCart = async () => {
    if (!selectedVariant) return;
    await addItem({ merchandiseId: selectedVariant.id, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <>
      <SiteNav />

      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-10">
        <nav className="eyebrow mb-10 text-[var(--color-taupe)]">
          <Link to="/shop" className="hover:text-[var(--color-gold)]">Collection</Link>
          <span className="mx-3">/</span>
          <span className="text-[var(--color-brown)]">{product?.title ?? "Mirror"}</span>
        </nav>

        {!isShopifyConfigured && <ShopifySetupNotice />}

        {isShopifyConfigured && productQuery.isLoading && (
          <p className="py-24 text-sm text-[var(--color-taupe)]">Loading product...</p>
        )}

        {isShopifyConfigured && productQuery.error && (
          <p className="py-24 text-sm leading-relaxed text-[var(--color-brown)]/80">
            This Shopify product could not be loaded. Check the product handle and Storefront API access.
          </p>
        )}

        {isShopifyConfigured && !productQuery.isLoading && !productQuery.error && !product && (
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-8">
            <p className="font-display text-3xl text-[var(--color-brown-deep)]">
              Product not found.
            </p>
            <Link
              to="/shop"
              className="eyebrow mt-8 inline-flex bg-[var(--color-brown)] px-7 py-4 text-[var(--color-ivory)]"
            >
              Back to Collection
            </Link>
          </div>
        )}

        {product && (
          <div className="grid gap-16 md:grid-cols-2 md:items-start">
            <div className="md:sticky md:top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-sandstone)] shadow-[0_30px_100px_-55px_rgba(63,47,32,0.65)]">
                {product.image ? (
                  <img
                    src={product.image.url}
                    alt={product.image.altText ?? product.title}
                    width={product.image.width ?? 1024}
                    height={product.image.height ?? 1280}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-[var(--color-sandstone)]" />
                )}
                <div className="pointer-events-none absolute inset-0 border border-[var(--color-gold)]/30" />
              </div>
            </div>

            <div>
              <p className="eyebrow text-[var(--color-taupe)]">{product.shape}</p>
              <h1 className="mt-3 font-display text-5xl leading-tight text-[var(--color-brown-deep)] sm:text-6xl">
                {product.title}
              </h1>
              <p className="mt-3 font-display text-xl italic text-[var(--color-taupe)]">
                {product.tagline}
              </p>
              <div className="hairline mt-8 w-24" />
              <p className="mt-8 text-base leading-relaxed text-[var(--color-brown)]/85">
                {product.description}
              </p>

              <div className="mt-10 flex items-baseline gap-4">
                <span className="font-display text-3xl text-[var(--color-brown)]">
                  {formatMoney(selectedVariant?.price ?? product.priceRange.minVariantPrice)}
                </span>
                <span className="text-xs text-[var(--color-taupe)]">
                  Incl. GST · Premium packing · Shopify checkout
                </span>
              </div>

              <div className="mt-8 space-y-6">
                {product.variants.length > 1 && (
                  <VariantSelector
                    variants={product.variants}
                    selectedVariantId={selectedVariant?.id ?? ""}
                    onChange={setSelectedVariantId}
                  />
                )}

                <div>
                  <p className="eyebrow text-[var(--color-taupe)]">Quantity</p>
                  <div className="mt-3 inline-grid grid-cols-[42px_56px_42px] border border-[var(--color-border)] text-[var(--color-brown)]">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      className="grid h-11 place-items-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="grid h-11 place-items-center border-x border-[var(--color-border)]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((value) => value + 1)}
                      className="grid h-11 place-items-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  disabled={!selectedVariant?.availableForSale || isUpdating}
                  onClick={() => void addToCart()}
                  className="eyebrow inline-flex items-center gap-2 bg-[var(--color-brown)] px-8 py-4 text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-brown-deep)] disabled:opacity-50"
                >
                  {selectedVariant?.availableForSale ? "Add to Cart" : "Unavailable"}
                </button>
                <Link
                  to="/contact"
                  className="eyebrow inline-flex items-center gap-2 border border-[var(--color-brown)]/40 px-8 py-4 text-[var(--color-brown)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                >
                  Trade Enquiry
                </Link>
              </div>

              {added && (
                <p className="mt-4 text-sm text-[var(--color-brown)]">Added to cart.</p>
              )}
              {cartError && (
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-brown)]">{cartError}</p>
              )}

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
                  <dd className="col-span-2 text-[var(--color-brown)]">4-6 weeks, made to order</dd>
                </div>
                <div className="grid grid-cols-3 gap-6 py-5">
                  <dt className="eyebrow text-[var(--color-taupe)]">Origin</dt>
                  <dd className="col-span-2 text-[var(--color-brown)]">Handcrafted in Jaipur, India</dd>
                </div>
              </dl>

              <div className="mt-10 border border-[var(--color-gold)]/35 bg-[var(--color-sandstone)]/35 p-6">
                <p className="eyebrow text-[var(--color-gold)]">Built to Last</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-brown)]/85">
                  Each mirror is specified as a mounted fixture, not a fragile decor panel:
                  a rigid frame, concealed bracket, protected LED channel and serviceable driver
                  are planned before production.
                </p>
              </div>

              <div className="mt-10">
                <p className="eyebrow">Features</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-brown)]/90">
                  {product.features.map((feature) => (
                    <li key={feature}>· {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </>
  );
}

function VariantSelector({
  variants,
  selectedVariantId,
  onChange,
}: {
  variants: ShopifyProductVariant[];
  selectedVariantId: string;
  onChange: (variantId: string) => void;
}) {
  return (
    <div>
      <p className="eyebrow text-[var(--color-taupe)]">Options</p>
      <div className="mt-3 grid gap-3">
        {variants.map((variant) => {
          const active = selectedVariantId === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              disabled={!variant.availableForSale}
              onClick={() => onChange(variant.id)}
              className={`flex items-center justify-between gap-4 border px-4 py-3 text-left transition-colors ${
                active
                  ? "border-[var(--color-gold)] bg-[var(--color-sandstone)]/40"
                  : "border-[var(--color-border)] hover:border-[var(--color-gold)]"
              } disabled:opacity-45`}
            >
              <span className="text-sm text-[var(--color-brown)]">{variantTitle(variant)}</span>
              <span className="font-display text-lg text-[var(--color-brown)]">
                {formatMoney(variant.price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ShopifySetupNotice() {
  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center sm:p-12">
      <p className="eyebrow text-[var(--color-gold)]">Shopify Setup Required</p>
      <h1 className="mt-4 font-display text-4xl text-[var(--color-brown-deep)]">
        Connect Shopify to load this product.
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--color-brown)]/80">
        Add Storefront API credentials and create products in Shopify using matching handles.
      </p>
    </div>
  );
}
