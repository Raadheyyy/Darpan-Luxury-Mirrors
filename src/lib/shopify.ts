export type ProductShape = "Designer" | "Rectangle" | "Vanity" | "Oval" | "Round" | "Other";

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ShopifySelectedOption = {
  name: string;
  value: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  selectedOptions: ShopifySelectedOption[];
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tagline: string;
  shape: ProductShape;
  dimensions: string;
  glow: string;
  features: string[];
  image: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  availableForSale: boolean;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: ShopifyProductVariant & {
    product: {
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: ShopifyCartLine[];
};

type GraphQlError = {
  message: string;
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: GraphQlError[];
};

type ProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: ShopifyProduct["priceRange"];
  variants: { nodes: ShopifyProductVariant[] };
  tagline?: { value: string } | null;
  shape?: { value: string } | null;
  dimensions?: { value: string } | null;
  glow?: { value: string } | null;
  features?: { value: string } | null;
};

type CartNode = Omit<ShopifyCart, "lines"> & {
  lines: { nodes: ShopifyCartLine[] };
};

type UserError = {
  field: string[] | null;
  message: string;
};

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

export const SHAPE_ORDER: ProductShape[] = ["Designer", "Rectangle", "Vanity", "Oval", "Round", "Other"];

export const SHAPE_LABEL: Record<ProductShape, string> = {
  Designer: "Designer Statement Mirrors",
  Rectangle: "Rectangular LED Mirrors",
  Vanity: "Vanity Mirrors",
  Oval: "Oval LED Mirrors",
  Round: "Round LED Mirrors",
  Other: "Other Mirrors",
};

export const SHOPIFY_COLLECTION_HANDLE =
  import.meta.env.VITE_SHOPIFY_COLLECTION_HANDLE ?? "mirrors";

const shopifyStoreDomain =
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN ?? import.meta.env.SHOPIFY_STORE_DOMAIN ?? "";
const storefrontAccessToken =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
  import.meta.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
  "";
const shopifyApiVersion =
  import.meta.env.VITE_SHOPIFY_API_VERSION ?? import.meta.env.SHOPIFY_API_VERSION ?? "2026-01";

export const isShopifyConfigured = Boolean(shopifyStoreDomain && storefrontAccessToken);

const PRODUCT_FRAGMENT = `#graphql
  fragment ProductFields on Product {
    id
    handle
    title
    description
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 8) {
      nodes {
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    tagline: metafield(namespace: "custom", key: "tagline") {
      value
    }
    shape: metafield(namespace: "custom", key: "shape") {
      value
    }
    dimensions: metafield(namespace: "custom", key: "dimensions") {
      value
    }
    glow: metafield(namespace: "custom", key: "glow") {
      value
    }
    features: metafield(namespace: "custom", key: "features") {
      value
    }
    variants(first: 50) {
      nodes {
        id
        title
        availableForSale
        quantityAvailable
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

const CART_FRAGMENT = `#graphql
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            product {
              handle
              title
              featuredImage {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export function formatMoney(money: ShopifyMoney | undefined): string {
  if (!money) return "";
  const amount = Number(money.amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatProductPrice(product: ShopifyProduct): string {
  const min = product.priceRange.minVariantPrice;
  const max = product.priceRange.maxVariantPrice;
  if (min.amount === max.amount && min.currencyCode === max.currencyCode) {
    return formatMoney(min);
  }
  return `From ${formatMoney(min)}`;
}

export function variantTitle(variant: ShopifyProductVariant): string {
  if (!variant.selectedOptions.length || variant.title === "Default Title") {
    return "Standard";
  }
  return variant.selectedOptions.map((option) => `${option.name}: ${option.value}`).join(" · ");
}

export function isInvalidCartError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return (
    message.includes("cart") &&
    (message.includes("invalid") || message.includes("not found") || message.includes("does not exist"))
  );
}

export async function getProducts(collectionHandle = SHOPIFY_COLLECTION_HANDLE): Promise<ShopifyProduct[]> {
  const data = await shopifyRequest<{
    collection: { products: { nodes: ProductNode[] } } | null;
  }>(
    `#graphql
      ${PRODUCT_FRAGMENT}
      query ProductsByCollection($handle: String!) {
        collection(handle: $handle) {
          products(first: 50, sortKey: MANUAL) {
            nodes {
              ...ProductFields
            }
          }
        }
      }
    `,
    { handle: collectionHandle },
  );

  return (data.collection?.products.nodes ?? []).map(mapProduct);
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyRequest<{ product: ProductNode | null }>(
    `#graphql
      ${PRODUCT_FRAGMENT}
      query ProductByHandle($handle: String!) {
        product(handle: $handle) {
          ...ProductFields
        }
      }
    `,
    { handle },
  );

  return data.product ? mapProduct(data.product) : null;
}

export async function createCart(lines: CartLineInput[]): Promise<ShopifyCart> {
  const data = await shopifyRequest<{
    cartCreate: { cart: CartNode | null; userErrors: UserError[] };
  }>(
    `#graphql
      ${CART_FRAGMENT}
      mutation CreateCart($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    { lines },
  );

  return unwrapCartMutation(data.cartCreate.cart, data.cartCreate.userErrors);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyRequest<{ cart: CartNode | null }>(
    `#graphql
      ${CART_FRAGMENT}
      query Cart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
    `,
    { cartId },
  );

  return data.cart ? mapCart(data.cart) : null;
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<ShopifyCart> {
  const data = await shopifyRequest<{
    cartLinesAdd: { cart: CartNode | null; userErrors: UserError[] };
  }>(
    `#graphql
      ${CART_FRAGMENT}
      mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    { cartId, lines },
  );

  return unwrapCartMutation(data.cartLinesAdd.cart, data.cartLinesAdd.userErrors);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<ShopifyCart> {
  const data = await shopifyRequest<{
    cartLinesUpdate: { cart: CartNode | null; userErrors: UserError[] };
  }>(
    `#graphql
      ${CART_FRAGMENT}
      mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    { cartId, lines },
  );

  return unwrapCartMutation(data.cartLinesUpdate.cart, data.cartLinesUpdate.userErrors);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyRequest<{
    cartLinesRemove: { cart: CartNode | null; userErrors: UserError[] };
  }>(
    `#graphql
      ${CART_FRAGMENT}
      mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    { cartId, lineIds },
  );

  return unwrapCartMutation(data.cartLinesRemove.cart, data.cartLinesRemove.userErrors);
}

async function shopifyRequest<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error(
      "Shopify is not configured. Add VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }

  const response = await fetch(
    `https://${shopifyStoreDomain}/api/${shopifyApiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-shopify-storefront-access-token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify request failed with ${response.status}`);
  }

  const payload = (await response.json()) as ShopifyResponse<T>;
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }
  if (!payload.data) {
    throw new Error("Shopify returned no data.");
  }

  return payload.data;
}

function unwrapCartMutation(cart: CartNode | null, userErrors: UserError[]): ShopifyCart {
  if (userErrors.length) {
    throw new Error(userErrors.map((error) => error.message).join("; "));
  }
  if (!cart) {
    throw new Error("Shopify did not return a cart.");
  }
  return mapCart(cart);
}

function mapCart(cart: CartNode): ShopifyCart {
  return {
    ...cart,
    lines: cart.lines.nodes,
  };
}

function mapProduct(product: ProductNode): ShopifyProduct {
  const features = parseFeatures(product.features?.value);
  const images = product.images.nodes;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    availableForSale: product.availableForSale,
    tagline: product.tagline?.value ?? "Premium illuminated mirror, made to order.",
    shape: normalizeShape(product.shape?.value),
    dimensions: product.dimensions?.value ?? "Custom sizing available",
    glow: product.glow?.value ?? "Warm LED glow, configured by variant",
    features:
      features.length > 0
        ? features
        : [
            "Moisture-resistant sealed electrical channels",
            "Copper-free mirror glass with polished safety edges",
            "Rigid wall bracket system for stable installation",
            "Serviceable LED driver and concealed wiring",
          ],
    image: product.featuredImage ?? images[0] ?? null,
    images,
    variants: product.variants.nodes,
    priceRange: product.priceRange,
  };
}

function normalizeShape(value: string | undefined): ProductShape {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "designer") return "Designer";
  if (normalized === "rectangle" || normalized === "rectangular") return "Rectangle";
  if (normalized === "vanity") return "Vanity";
  if (normalized === "oval") return "Oval";
  if (normalized === "round" || normalized === "circular") return "Round";
  return "Other";
}

function parseFeatures(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map(String).filter(Boolean);
    }
  } catch {
    // Plain text metafields are supported below.
  }
  return value
    .split(/\n|,/)
    .map((feature) => feature.trim())
    .filter(Boolean);
}
