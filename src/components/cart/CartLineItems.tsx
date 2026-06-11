import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatMoney, variantTitle, type ShopifyCartLine } from "@/lib/shopify";

type Props = {
  lines: ShopifyCartLine[];
  isUpdating: boolean;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
};

export function CartLineItems({ lines, isUpdating, onUpdateQuantity, onRemove }: Props) {
  return (
    <div className="divide-y divide-[var(--color-border)]">
      {lines.map((line) => {
        const image = line.merchandise.product.featuredImage;
        return (
          <div key={line.id} className="grid grid-cols-[86px_1fr] gap-4 py-5">
            <Link
              to="/shop/$slug"
              params={{ slug: line.merchandise.product.handle }}
              className="block overflow-hidden bg-[var(--color-sandstone)]"
            >
              {image ? (
                <img
                  src={image.url}
                  alt={image.altText ?? line.merchandise.product.title}
                  className="aspect-[4/5] h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[4/5] w-full bg-[var(--color-sandstone)]" />
              )}
            </Link>

            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    to="/shop/$slug"
                    params={{ slug: line.merchandise.product.handle }}
                    className="font-display text-xl leading-tight text-[var(--color-brown-deep)] hover:text-[var(--color-gold)]"
                  >
                    {line.merchandise.product.title}
                  </Link>
                  <p className="mt-1 text-xs text-[var(--color-taupe)]">
                    {variantTitle(line.merchandise)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${line.merchandise.product.title}`}
                  disabled={isUpdating}
                  onClick={() => onRemove(line.id)}
                  className="p-1 text-[var(--color-taupe)] transition-colors hover:text-[var(--color-brown)] disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="grid grid-cols-[34px_42px_34px] border border-[var(--color-border)] text-sm text-[var(--color-brown)]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={isUpdating}
                    onClick={() => onUpdateQuantity(line.id, line.quantity - 1)}
                    className="grid h-9 place-items-center disabled:opacity-50"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="grid h-9 place-items-center border-x border-[var(--color-border)]">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={isUpdating}
                    onClick={() => onUpdateQuantity(line.id, line.quantity + 1)}
                    className="grid h-9 place-items-center disabled:opacity-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="font-display text-lg text-[var(--color-brown)]">
                  {formatMoney(line.cost.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
