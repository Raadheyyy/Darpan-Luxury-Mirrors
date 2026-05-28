# Darpan — Luxury LED Mirrors Website Plan

A serene, editorial ecommerce experience that channels Jaipur craftsmanship and the warm glow of a backlit mirror. Built on the brand palette and arched-niche motif from your guidelines.

## Design direction

- **Palette (verbatim from brand guide):** Ivory `#F6F2EA` (canvas), Sandstone `#EBDFCF` (surfaces), Taj Gold `#C8A26A` (accent/CTA), Warm Taupe `#A89A8A` (muted), Deep Brown `#4B3A2A` (footer/contrast bands), Charcoal `#1E1E1E` (text).
- **Typography:** Cormorant / Cormorant Garamond for display (echoes the wide-spaced "DARPAN" wordmark), Inter or Jost for body and UI — wide tracking on small caps labels.
- **Motifs:** Jaipur arched-niche (jharokha) frame used as a recurring container for product imagery and section dividers; subtle gold hairlines; a soft warm glow halo behind mirror photography to evoke the backlight.
- **Tone:** generous whitespace, slow scroll, restrained motion (gentle fades, soft glow pulses), no flashy animations.

## Sitemap

1. **Home** — hero, brand essence, featured collection, craftsmanship strip, Jaipur heritage moment, distributor CTA, newsletter.
2. **Shop** — 4–8 hero mirrors in an arched-frame grid with shape/finish filters.
3. **Product detail** — large gallery (lifestyle + on/off backlight states), specs (size, glow temperature, sensor, defogger, IP rating), variant selector, add-to-cart, "Trade enquiry" secondary CTA, care notes.
4. **About Us** — brand essence, founders' note, values (Heritage · Craftsmanship · Innovation · Reflection).
5. **Journey** — visual timeline from Jaipur ateliers to modern LED engineering.
6. **Distributors** — partner with us / find a distributor (form + list).
7. **Contact** — studio address (Jaipur), enquiry form, social.

## Home page sections

- Hero: full-bleed lifestyle image of a backlit oval mirror, soft glow, wordmark + tagline "Reflecting Beauty. Illuminating Spaces."
- Brand essence band on Deep Brown with the four icons (Heritage, Craftsmanship, Innovation, Reflection).
- Featured Collection — 3–4 mirrors in arched frames.
- Craftsmanship story — split image/text, Jaipur ateliers + modern LED tech.
- Heritage moment — wide editorial image with pull quote.
- Distributor / Trade strip.
- Newsletter + footer.

## Ecommerce (Shopify)

You chose Shopify, which is the right fit for physical mirrors with inventory and shipping. Setup requires a quick choice from you before I can wire it up:

- **Create a new Shopify development store** — free while building; you can claim it later to start a 30-day trial and a paid plan when ready to sell.
- **Connect an existing Shopify store** — provide your Shopify admin link; products/inventory flow from your live store.

Once Shopify is enabled, I'll:
- Seed 4–8 placeholder mirror products (Oval Bloom, Jharokha Arch, Round Halo, etc.) with variants for size and glow temperature.
- Build the storefront against the Shopify catalog (product list, PDP, cart, checkout).
- Add a "Trade / Distributor enquiry" form alongside retail checkout.

## Technical notes

- Tailwind tokens set from the brand palette; Cormorant + Inter via Google Fonts.
- Reusable `ArchFrame` component for the jharokha-shaped image container (SVG mask).
- Reusable `GlowImage` component for the warm backlight halo behind mirror photos.
- All product imagery generated as on-brand placeholders (warm beige rooms, brass fixtures, soft glow) until you provide real photography.
- SEO: title/meta per page, single H1, JSON-LD `Product` on PDPs, alt text on all imagery.
- Responsive, accessible (AA contrast — Taj Gold used as accent, not body text).

## Build order

1. Tokens, fonts, layout shell (nav + footer), home page with placeholder images.
2. About Us, Journey, Distributors, Contact pages.
3. Enable Shopify (your store-type choice), seed catalog, wire Shop + PDP + cart + checkout.
4. Polish pass: motion, image generation, SEO, QA.

Approve to proceed — I'll start with the brand site and prompt you for the Shopify store-type choice when we reach step 3.
