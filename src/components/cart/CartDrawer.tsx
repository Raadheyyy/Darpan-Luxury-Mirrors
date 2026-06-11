import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { CartLineItems } from "@/components/cart/CartLineItems";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/shopify";

export function CartDrawer() {
  const { cart, error, isLoading, isUpdating, totalQuantity, updateLine, removeLine } = useCart();
  const hasLines = Boolean(cart?.lines.length);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Open cart${totalQuantity ? `, ${totalQuantity} item${totalQuantity === 1 ? "" : "s"}` : ""}`}
          className="relative grid h-10 w-10 place-items-center border border-[var(--color-gold)]/50 text-[var(--color-brown)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
        >
          <ShoppingBag className="h-4 w-4" />
          {totalQuantity > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--color-gold)] px-1 text-[0.62rem] font-semibold text-[var(--color-ivory)]">
              {totalQuantity}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-[92vw] flex-col bg-[var(--color-ivory)] p-0 sm:max-w-md">
        <SheetHeader className="border-b border-[var(--color-border)] px-6 py-5 text-left">
          <SheetTitle className="font-display text-3xl font-normal text-[var(--color-brown-deep)]">
            Cart
          </SheetTitle>
          <SheetDescription>
            Review your mirrors before continuing to secure Shopify checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {isLoading && (
            <p className="py-12 text-sm text-[var(--color-taupe)]">Loading your cart...</p>
          )}

          {!isLoading && error && (
            <p className="py-12 text-sm leading-relaxed text-[var(--color-brown)]">{error}</p>
          )}

          {!isLoading && !error && !hasLines && (
            <div className="py-16">
              <p className="font-display text-2xl text-[var(--color-brown-deep)]">
                Your cart is empty.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-brown)]/75">
                Add a made-to-order mirror from the collection.
              </p>
              <Link
                to="/shop"
                className="eyebrow mt-8 inline-flex bg-[var(--color-brown)] px-6 py-3 text-[var(--color-ivory)]"
              >
                Browse Collection
              </Link>
            </div>
          )}

          {hasLines && (
            <CartLineItems
              lines={cart!.lines}
              isUpdating={isUpdating}
              onUpdateQuantity={(lineId, quantity) => void updateLine(lineId, quantity)}
              onRemove={(lineId) => void removeLine(lineId)}
            />
          )}
        </div>

        {cart && hasLines && (
          <div className="border-t border-[var(--color-border)] p-6">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[var(--color-taupe)]">Subtotal</span>
              <span className="font-display text-2xl text-[var(--color-brown)]">
                {formatMoney(cart.cost.subtotalAmount)}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[var(--color-taupe)]">
              Shipping, tax and any discounts are calculated in Shopify checkout.
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href={cart.checkoutUrl}
                className="eyebrow inline-flex justify-center bg-[var(--color-brown)] px-7 py-4 text-[var(--color-ivory)] hover:bg-[var(--color-brown-deep)]"
              >
                Checkout
              </a>
              <Link
                to="/cart"
                className="eyebrow inline-flex justify-center border border-[var(--color-brown)]/35 px-7 py-4 text-[var(--color-brown)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
