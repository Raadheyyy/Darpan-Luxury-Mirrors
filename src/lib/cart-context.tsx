import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  addCartLines,
  createCart,
  getCart,
  isInvalidCartError,
  removeCartLines,
  updateCartLines,
  type CartLineInput,
  type ShopifyCart,
} from "@/lib/shopify";

const CART_STORAGE_KEY = "darpan_shopify_cart_id";

type CartContextValue = {
  cart: ShopifyCart | null;
  cartId: string | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  totalQuantity: number;
  addItem: (line: CartLineInput) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persistCart = useCallback((nextCart: ShopifyCart | null) => {
    setCart(nextCart);
    setCartId(nextCart?.id ?? null);
    if (typeof window === "undefined") return;
    if (nextCart) {
      window.localStorage.setItem(CART_STORAGE_KEY, nextCart.id);
    } else {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  const clearCart = useCallback(() => {
    persistCart(null);
    setError(null);
  }, [persistCart]);

  const refreshCart = useCallback(async () => {
    if (!cartId) return;
    setIsLoading(true);
    setError(null);
    try {
      const nextCart = await getCart(cartId);
      persistCart(nextCart);
    } catch (err) {
      if (isInvalidCartError(err)) {
        persistCart(null);
      } else {
        setError(err instanceof Error ? err.message : "Cart could not be loaded.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [cartId, persistCart]);

  const addItem = useCallback(
    async (line: CartLineInput) => {
      setIsUpdating(true);
      setError(null);
      try {
        const nextCart = cartId
          ? await addCartLines(cartId, [line])
          : await createCart([line]);
        persistCart(nextCart);
      } catch (err) {
        if (cartId && isInvalidCartError(err)) {
          const nextCart = await createCart([line]);
          persistCart(nextCart);
        } else {
          setError(err instanceof Error ? err.message : "Item could not be added to cart.");
          throw err;
        }
      } finally {
        setIsUpdating(false);
      }
    },
    [cartId, persistCart],
  );

  const updateLine = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      setIsUpdating(true);
      setError(null);
      try {
        const nextCart =
          quantity <= 0
            ? await removeCartLines(cartId, [lineId])
            : await updateCartLines(cartId, [{ id: lineId, quantity }]);
        persistCart(nextCart);
      } catch (err) {
        if (isInvalidCartError(err)) {
          persistCart(null);
        } else {
          setError(err instanceof Error ? err.message : "Cart could not be updated.");
          throw err;
        }
      } finally {
        setIsUpdating(false);
      }
    },
    [cartId, persistCart],
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setIsUpdating(true);
      setError(null);
      try {
        const nextCart = await removeCartLines(cartId, [lineId]);
        persistCart(nextCart);
      } catch (err) {
        if (isInvalidCartError(err)) {
          persistCart(null);
        } else {
          setError(err instanceof Error ? err.message : "Item could not be removed.");
          throw err;
        }
      } finally {
        setIsUpdating(false);
      }
    },
    [cartId, persistCart],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    const storedCartId = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCartId) {
      setIsLoading(false);
      return;
    }

    setCartId(storedCartId);
    setError(null);
    getCart(storedCartId)
      .then((nextCart) => persistCart(nextCart))
      .catch((err) => {
        if (isInvalidCartError(err)) {
          persistCart(null);
        } else {
          setError(err instanceof Error ? err.message : "Cart could not be loaded.");
        }
      })
      .finally(() => setIsLoading(false));
  }, [persistCart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      cartId,
      isLoading,
      isUpdating,
      error,
      totalQuantity: cart?.totalQuantity ?? 0,
      addItem,
      updateLine,
      removeLine,
      refreshCart,
      clearCart,
    }),
    [addItem, cart, cartId, clearCart, error, isLoading, isUpdating, refreshCart, removeLine, updateLine],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }
  return context;
}
