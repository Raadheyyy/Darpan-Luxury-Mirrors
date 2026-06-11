import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { CartLineItems } from "@/components/cart/CartLineItems";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/shopify";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { cart, error, isLoading, isUpdating, updateLine, removeLine } = useCart();
  const hasLines = Boolean(cart?.lines.length);

  return (
    <>
      <SiteNav />

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-28 lg:px-10">
        <p className="eyebrow">Your Cart</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl text-[var(--color-brown-deep)] sm:text-6xl">
          Review your selected mirrors.
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-brown)]/80">
          Final shipping, tax and payment are handled securely by Shopify checkout.
        </p>
        <div className="hairline mt-10 w-32" />

        {isLoading && (
          <p className="py-20 text-sm text-[var(--color-taupe)]">Loading your cart...</p>
        )}

        {!isLoading && error && (
          <div className="mt-12 border border-[var(--color-border)] bg-[var(--color-card)] p-8">
            <p className="font-display text-2xl text-[var(--color-brown-deep)]">
              We could not load your cart.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-brown)]/80">{error}</p>
          </div>
        )}

        {!isLoading && !error && !hasLines && (
          <div className="mt-12 border border-[var(--color-border)] bg-[var(--color-card)] p-8 sm:p-12">
            <p className="font-display text-3xl text-[var(--color-brown-deep)]">
              Your cart is empty.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-brown)]/80">
              Explore the collection and add a premium mirror when you are ready.
            </p>
            <Link
              to="/shop"
              className="eyebrow mt-8 inline-flex bg-[var(--color-brown)] px-7 py-4 text-[var(--color-ivory)] hover:bg-[var(--color-brown-deep)]"
            >
              Browse Collection
            </Link>
          </div>
        )}

        {cart && hasLines && (
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="border-y border-[var(--color-border)]">
              <CartLineItems
                lines={cart.lines}
                isUpdating={isUpdating}
                onUpdateQuantity={(lineId, quantity) => void updateLine(lineId, quantity)}
                onRemove={(lineId) => void removeLine(lineId)}
              />
            </div>

            <aside className="border border-[var(--color-border)] bg-[var(--color-card)] p-7 lg:sticky lg:top-28">
              <p className="eyebrow">Order Summary</p>
              <div className="mt-6 space-y-4 text-sm text-[var(--color-brown)]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-display text-xl">{formatMoney(cart.cost.subtotalAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-[var(--color-taupe)]">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between text-[var(--color-taupe)]">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="hairline mt-6 w-full" />
              <a
                href={cart.checkoutUrl}
                className="eyebrow mt-7 inline-flex w-full justify-center bg-[var(--color-brown)] px-7 py-4 text-[var(--color-ivory)] hover:bg-[var(--color-brown-deep)]"
              >
                Continue to Checkout
              </a>
              <p className="mt-4 text-xs leading-relaxed text-[var(--color-taupe)]">
                You will be redirected to Shopify for secure payment and order confirmation.
              </p>
            </aside>
          </div>
        )}
      </section>

      <SiteFooter />
    </>
  );
}
