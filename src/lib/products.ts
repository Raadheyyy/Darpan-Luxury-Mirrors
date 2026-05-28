import heroArch from "@/assets/mirror-hero.png";
import arch from "@/assets/mirror-arch.jpg";
import round from "@/assets/mirror-round.jpg";
import roundedRectangleLed from "@/assets/product-rounded-rectangle-led.jpeg";
import capsuleVanityLed from "@/assets/product-capsule-vanity-led.jpeg";
import linearVanityLed from "@/assets/product-linear-vanity-led.jpeg";
import grandRectangleHalo from "@/assets/product-grand-rectangle-halo.jpeg";
import minimalistFramelessLed from "@/assets/product-minimalist-frameless-led.jpeg";
import warmArchFloorLed from "@/assets/product-warm-arch-floor-led.jpeg";
import ovalFullLengthGold from "@/assets/product-oval-full-length-gold.jpeg";

export type Shape = "Oval" | "Arch" | "Round" | "Rectangle" | "Floor" | "Vanity";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  shape: Shape;
  price: number;
  image: string;
  story: string;
  dimensions: string;
  glow: string;
  features: string[];
};

export const SHAPE_ORDER: Shape[] = [
  "Rectangle",
  "Vanity",
  "Floor",
  "Arch",
  "Oval",
  "Round",
];

export const SHAPE_LABEL: Record<Shape, string> = {
  Rectangle: "Rectangular LED Mirrors",
  Vanity: "Vanity Mirrors",
  Floor: "Full-Length Mirrors",
  Arch: "Darpan Arches",
  Oval: "Ovals",
  Round: "Rounds",
};

export const products: Product[] = [
  {
    slug: "darpan-aura-rounded-rectangle",
    name: "Aura Rounded Rectangle",
    tagline: "Soft corners, warm architectural glow.",
    shape: "Rectangle",
    price: 52000,
    image: roundedRectangleLed,
    story:
      "A rounded rectangular LED mirror for modern bathrooms and powder rooms. The rear halo washes stone and tile evenly, while the slim black edge keeps the profile quiet and contemporary.",
    dimensions: '36" x 24" (custom sizes on request)',
    glow: "Warm 3000K rear halo, dimmable on request",
    features: [
      "Rounded-corner silhouette",
      "Rear LED halo",
      "Anti-fog option",
      "Black slim-edge frame",
    ],
  },
  {
    slug: "darpan-capsule-vanity",
    name: "Capsule Vanity",
    tagline: "A compact halo for refined bathrooms.",
    shape: "Vanity",
    price: 44000,
    image: capsuleVanityLed,
    story:
      "Designed for apartment bathrooms, guest vanities and compact wash areas, Capsule Vanity pairs a soft rectangular form with a clean perimeter glow.",
    dimensions: '32" x 20" (custom sizes on request)',
    glow: "Neutral 3500K rear glow",
    features: [
      "Slim capsule profile",
      "Soft perimeter backlight",
      "Wall-mounted concealed bracket",
      "Touch dimmer option",
    ],
  },
  {
    slug: "darpan-linear-vanity",
    name: "Linear Vanity",
    tagline: "Tall, precise and quietly dramatic.",
    shape: "Vanity",
    price: 58000,
    image: linearVanityLed,
    story:
      "A tall vanity mirror made for textured wall panels, fluted stone and dark bath palettes. The vertical LED edge creates a hotel-suite effect without glare.",
    dimensions: '48" x 24" (custom sizes on request)',
    glow: "Warm-to-neutral 3000K-4000K vertical edge glow",
    features: [
      "Tall rectangular profile",
      "Vertical edge illumination",
      "Hardwired installation",
      "Anti-fog upgrade available",
    ],
  },
  {
    slug: "darpan-grand-rectangle-halo",
    name: "Grand Rectangle Halo",
    tagline: "A full-height mirror for entryways and suites.",
    shape: "Rectangle",
    price: 72000,
    image: grandRectangleHalo,
    story:
      "A statement rectangular LED mirror with a soft wall wash, suited to dressing zones, foyers and luxury bedroom suites.",
    dimensions: '72" x 30" (custom heights to 84")',
    glow: "Warm 3000K full perimeter halo",
    features: [
      "Full-height rectangular format",
      "Continuous rear halo",
      "Concealed driver",
      "White-glove installation available",
    ],
  },
  {
    slug: "darpan-minimalist-frameless",
    name: "Minimalist Frameless",
    tagline: "A luminous line around pure reflection.",
    shape: "Floor",
    price: 64000,
    image: minimalistFramelessLed,
    story:
      "A frameless full-length LED mirror with rounded corners and a clean front glow. Built for dressing rooms, walk-in wardrobes and modern living spaces.",
    dimensions: '53" x 22" (custom sizes on request)',
    glow: "Warm 3000K front edge + rear halo",
    features: [
      "Frameless rounded rectangle",
      "Full-length wall mount",
      "Warm LED outline",
      "Memory dimmer option",
    ],
  },
  {
    slug: "darpan-warm-arch-floor",
    name: "Warm Arch Floor",
    tagline: "An arched doorway of amber light.",
    shape: "Floor",
    price: 82000,
    image: warmArchFloorLed,
    story:
      "A floor-length arched mirror for lounges, bedrooms and dressing corners. The warm LED outline turns the piece into both mirror and ambient light source.",
    dimensions: '72" x 28" (custom sizes on request)',
    glow: "Amber 2700K perimeter line + rear wall glow",
    features: [
      "Arched full-length silhouette",
      "Warm perimeter LED",
      "Floor-leaning or wall-mounted",
      "Anti-tip fixing included",
    ],
  },
  {
    slug: "darpan-oval-full-length-gold",
    name: "Oval Full-Length Gold",
    tagline: "Soft oval proportion with a slim gold frame.",
    shape: "Oval",
    price: 56000,
    image: ovalFullLengthGold,
    story:
      "A calm full-length oval mirror for bedrooms and dressing rooms. The gold metal frame brings warmth without overpowering softer interiors.",
    dimensions: '65" x 22"',
    glow: "Non-lit mirror; LED upgrade available",
    features: [
      "Full-length oval shape",
      "Slim gold metal frame",
      "Wall-mounted installation",
      "Ultra-clear mirror glass",
    ],
  },
  {
    slug: "darpan-jharokha-halo",
    name: "Jharokha Halo",
    tagline: "The hero silhouette, made for the wall.",
    shape: "Arch",
    price: 94000,
    image: heroArch,
    story:
      "Inspired by Darpan's hero mirror, this jharokha silhouette brings Jaipur architecture into a contemporary LED piece with a warm architectural halo.",
    dimensions: '42" x 28" (custom sizes on request)',
    glow: "Warm 2700K-3500K rear halo",
    features: [
      "Jharokha-inspired silhouette",
      "Decorative heritage frame",
      "Rear LED wall wash",
      "Made to order",
    ],
  },
  {
    slug: "darpan-jaipur-arch",
    name: "Jaipur Arch",
    tagline: "Heritage shape, modern illumination.",
    shape: "Arch",
    price: 68000,
    image: arch,
    story:
      "A simpler arched LED mirror for clients who want Darpan's Indian architectural language in a cleaner, more versatile form.",
    dimensions: '36" x 24" (custom sizes on request)',
    glow: "Tunable 2700K-4500K rear halo",
    features: [
      "Arched silhouette",
      "Warm-to-neutral LED",
      "Touch dimmer option",
      "Hardwired or plug-in",
    ],
  },
  {
    slug: "darpan-round-halo",
    name: "Round Halo",
    tagline: "Pure geometry with a quiet glow.",
    shape: "Round",
    price: 42000,
    image: round,
    story:
      "A compact round LED mirror for powder rooms, narrow vanities and soft contemporary spaces.",
    dimensions: '28" diameter (custom sizes on request)',
    glow: "Warm 3000K ring backlight",
    features: [
      "Round frameless profile",
      "Hidden wall mount",
      "Memory dimmer option",
      "5-year LED warranty",
    ],
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const productsByShape = (): Record<Shape, Product[]> => {
  const out = {} as Record<Shape, Product[]>;
  SHAPE_ORDER.forEach((s) => (out[s] = []));
  products.forEach((p) => out[p.shape].push(p));
  return out;
};
