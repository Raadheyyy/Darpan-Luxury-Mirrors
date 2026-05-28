import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";

import { Reveal } from "@/components/brand/Reveal";
import { FeaturedCarousel } from "@/components/brand/FeaturedCarousel";

import heroMirror from "@/assets/mirror-hero.png";
import craft from "@/assets/craftsmanship.jpg";
import heritage from "@/assets/heritage.jpg";

export const Route = createFileRoute("/")({ component: Home });

function Home() {

  return (
    <>
      <SiteNav />


      {/* Hero — cinematic backlit reveal */}
      <section className="relative overflow-hidden bg-[#06050a] text-[var(--color-ivory)]">
        <div className="relative h-[100svh] min-h-[680px] w-full">
          {/* The room — starts pitch dark, lights up via mirror backlight */}
          <img
            src={heroMirror}
            alt="A Darpan jharokha mirror glowing in a quiet Jaipur haveli room"
            width={1920}
            height={1088}
            className="hero-mirror-reveal absolute inset-0 h-full w-full object-cover"
          />

          {/* Initial black veil that lifts as the backlight grows */}
          <div
            aria-hidden
            className="hero-veil-lift pointer-events-none absolute inset-0 bg-[#06050a]"
          />

          {/* Slow ambient breathing layer */}
          <div
            aria-hidden
            className="hero-glow-breathe pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(closest-side at 50% 48%, rgba(255,190,110,0.10) 0%, rgba(0,0,0,0) 55%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Editorial frame — corner marks + meta, fades in late */}
          <div className="hero-frame-fade pointer-events-none absolute inset-0">
            <div className="absolute left-6 top-6 h-6 w-6 border-l border-t border-[var(--color-gold)]/40 sm:left-10 sm:top-10" />
            <div className="absolute right-6 top-6 h-6 w-6 border-r border-t border-[var(--color-gold)]/40 sm:right-10 sm:top-10" />
            <div className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-[var(--color-gold)]/40 sm:bottom-10 sm:left-10" />
            <div className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[var(--color-gold)]/40 sm:bottom-10 sm:right-10" />

            <p className="eyebrow absolute left-1/2 top-10 -translate-x-1/2 text-[0.6rem] text-[var(--color-gold-soft)]/80">
              Chapter 01 — The Halo
            </p>
            <p className="eyebrow absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.55rem] text-[var(--color-taupe)]/70">
              Hand-lit in Jaipur · Made to order
            </p>
          </div>

          {/* CTAs — appear once the room is fully lit */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-24">
            <div className="hero-cta-rise flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/shop"
                className="eyebrow inline-flex items-center gap-3 bg-[var(--color-ivory)] px-9 py-4 text-[var(--color-brown-deep)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-ivory)]"
              >
                <span className="h-px w-6 bg-[var(--color-gold)]" />
                Explore the Collection
              </Link>
              <Link
                to="/journey"
                className="eyebrow inline-flex items-center gap-3 border border-[var(--color-ivory)]/50 px-9 py-4 text-[var(--color-ivory)] backdrop-blur-sm transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                Our Journey
                <span className="h-px w-6 bg-[var(--color-ivory)]/50" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Essence band */}
      <section className="bg-[var(--color-brown)] text-[var(--color-ivory)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-4 lg:px-10">
          {[
            { label: "Heritage", desc: "Rooted in Jaipur's living craft." },
            { label: "Craftsmanship", desc: "Hand-finished, made-to-order." },
            { label: "Innovation", desc: "Tunable warm-to-cool LED light." },
            { label: "Reflection", desc: "Designed for slow, daily rituals." },
          ].map((p) => (
            <div key={p.label}>
              <p className="eyebrow text-[var(--color-gold-soft)]">{p.label}</p>
              <p className="mt-3 font-display text-xl leading-snug">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collection — carousel */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <p className="eyebrow">The Collection</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl text-[var(--color-brown-deep)] sm:text-5xl">
            Modern silhouettes, infinite light.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--color-brown)]/75">
            Hand-finished in brass, teak, marble and enamel. Each piece is made to
            order, with custom sizing and tunable light.
          </p>
          <div className="hairline mt-8 w-32" />
        </Reveal>

        <Reveal delay={120} className="mt-16">
          <FeaturedCarousel />
        </Reveal>

        <Reveal className="mt-16 text-center">
          <Link
            to="/shop"
            className="eyebrow inline-block border-b border-[var(--color-gold)] pb-1 text-[var(--color-brown)] hover:text-[var(--color-gold)]"
          >
            View the full collection →
          </Link>
        </Reveal>
      </section>


      {/* Craftsmanship split */}
      <section className="bg-[var(--color-sandstone)]/60">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-2 md:items-center lg:px-10">
          <Reveal className="relative aspect-[3/4] w-full overflow-hidden">
            <img
              src={craft}
              alt="An artisan polishing a brass mirror frame in Jaipur"
              width={1400}
              height={1600}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 border border-[var(--color-gold)]/40" />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Craftsmanship</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--color-brown-deep)] sm:text-5xl">
              Hands that have shaped brass for generations.
            </h2>
            <div className="hairline mt-8 w-24" />
            <p className="mt-8 text-base leading-relaxed text-[var(--color-brown)]/85">
              Every Darpan mirror begins in a small Jaipur workshop, where master
              artisans cut, polish and finish each brass bezel by hand. We pair their
              centuries-old craft with quietly engineered LED panels — warm, tunable,
              and built to last a generation.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[var(--color-brown)]/90">
              <li>· Hand-finished brass, polished to a soft sheen.</li>
              <li>· Tunable warm-to-cool LED, 2700K – 5000K.</li>
              <li>· Made-to-order in 4–6 weeks.</li>
              <li>· White-glove delivery across India.</li>
            </ul>
            <Link
              to="/journey"
              className="eyebrow mt-10 inline-block border-b border-[var(--color-gold)] pb-1 text-[var(--color-brown)]"
            >
              Follow our journey →
            </Link>
          </Reveal>
        </div>

      </section>

      {/* Heritage editorial */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heritage}
          alt="A Jaipur haveli courtyard at golden hour"
          width={1920}
          height={1080}
          loading="lazy"
          className="h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-brown-deep)]/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Reveal as="figure" className="max-w-3xl text-center text-[var(--color-ivory)]">
            <p className="font-display text-3xl italic leading-snug sm:text-4xl">
              "A mirror is the quietest object in a home — and the most honest.
              We design ours to return your gaze with warmth."
            </p>
            <figcaption className="eyebrow mt-6 text-[var(--color-gold-soft)]">
              — The Darpan Atelier, Jaipur
            </figcaption>
          </Reveal>
        </div>

      </section>

      {/* Trade strip */}
      <Reveal as="section" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-10 rounded-sm border border-[var(--color-gold)]/40 bg-[var(--color-card)] p-10 md:grid-cols-[1.2fr_1fr] md:p-16">
          <div>
            <p className="eyebrow">For Architects & Distributors</p>
            <h2 className="mt-4 font-display text-3xl text-[var(--color-brown-deep)] sm:text-4xl">
              Specify Darpan for your project.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--color-brown)]/80">
              We partner with leading interior studios and select distributors across
              India and the GCC. Trade pricing, custom finishes and project-scale
              lead times available on request.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-4 md:justify-end">
            <Link
              to="/distributors"
              className="eyebrow inline-flex items-center gap-2 bg-[var(--color-brown)] px-7 py-3.5 text-[var(--color-ivory)] hover:bg-[var(--color-brown-deep)]"
            >
              Become a Partner
            </Link>
            <Link
              to="/contact"
              className="eyebrow inline-flex items-center gap-2 border border-[var(--color-brown)]/40 px-7 py-3.5 text-[var(--color-brown)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            >
              Project Enquiry
            </Link>
          </div>
        </div>
      </Reveal>


      <SiteFooter />
    </>
  );
}
