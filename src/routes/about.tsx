import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ArchFrame } from "@/components/brand/ArchFrame";
import craft from "@/assets/craftsmanship.jpg";
import heritage from "@/assets/heritage.jpg";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <>
      <SiteNav />

      <section className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center lg:px-10">
        <p className="eyebrow">About Darpan</p>
        <h1 className="mt-6 font-display text-5xl leading-tight text-[var(--color-brown-deep)] sm:text-6xl">
          A modern atelier, an old Jaipur soul.
        </h1>
        <div className="hairline mx-auto mt-10 w-32" />
        <p className="mt-10 text-lg leading-relaxed text-[var(--color-brown)]/85">
          Darpan was founded in Jaipur with one quiet conviction — that a mirror,
          the most honest object in a home, deserves the same care as any heirloom.
          We make luxury LED mirrors for premium residences, each piece hand-finished
          by Rajasthani artisans and engineered with tunable, skin-flattering light.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <ArchFrame className="aspect-[3/4] w-full bg-[var(--color-sandstone)]">
            <img src={craft} alt="Darpan artisan at work" width={1400} height={1600} loading="lazy" className="h-full w-full object-cover" />
          </ArchFrame>
          <div>
            <p className="eyebrow">The Brand Essence</p>
            <h2 className="mt-4 font-display text-4xl text-[var(--color-brown-deep)]">
              Luxury LED mirrors that blend timeless Indian craftsmanship with modern innovation.
            </h2>
            <div className="hairline mt-8 w-20" />
            <p className="mt-8 text-base leading-relaxed text-[var(--color-brown)]/85">
              Every Darpan mirror is built around four values — heritage, craftsmanship,
              innovation, and reflection. They show up in the brass we hand-polish,
              the warm halo we tune to your morning, and the slow, considered way we
              ship each piece, made to order, in 4–6 weeks.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-brown)] text-[var(--color-ivory)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:grid-cols-2 md:grid-cols-4 lg:px-10">
          {[
            { t: "Heritage", d: "Drawn from the jharokha arches and palace courtyards of Rajasthan." },
            { t: "Craftsmanship", d: "Hand-finished by Jaipur artisans — every bezel, every weld." },
            { t: "Innovation", d: "Tunable 2700K–5000K LED, anti-fog, touch and wave sensors." },
            { t: "Reflection", d: "Made for the slow morning ritual — to be looked into, daily, for years." },
          ].map((v) => (
            <div key={v.t}>
              <p className="eyebrow text-[var(--color-gold-soft)]">{v.t}</p>
              <p className="mt-4 font-display text-2xl leading-snug">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={heritage} alt="Jaipur haveli at golden hour" width={1920} height={1080} loading="lazy" className="h-[55vh] w-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-brown-deep)]/55" />
        <figure className="absolute inset-0 mx-auto flex max-w-3xl items-center justify-center px-6 text-center text-[var(--color-ivory)]">
          <p className="font-display text-3xl italic leading-snug sm:text-4xl">
            "Made in Jaipur — for the way light looks at home."
          </p>
        </figure>
      </section>

      <SiteFooter />
    </>
  );
}
