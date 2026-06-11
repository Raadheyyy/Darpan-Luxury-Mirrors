import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";

export const Route = createFileRoute("/journey")({ component: Journey });

const chapters = [
  {
    year: "2023",
    title: "A workshop in Jaipur.",
    body: "Founder Aarav grew up between his grandfather's brass workshop in the old city and an architecture practice in Mumbai. The two worlds met on a single sketch — a backlit jharokha mirror.",
  },
  {
    year: "2024",
    title: "First halo.",
    body: "Months of prototyping with Jaipur artisans and a lighting engineer in Bengaluru produced our first warm halo — a tunable LED ring hidden behind hand-polished brass.",
  },
  {
    year: "2025",
    title: "Darpan opens its doors.",
    body: "Our atelier in C-Scheme, Jaipur, opens to architects and private clients. The first collection brings together designer statement mirrors, warm vanity halos and solid framed LED pieces, all made to order.",
  },
  {
    year: "Today",
    title: "Crafted, one mirror at a time.",
    body: "We deliver across India and partner with select distributors in the GCC. Every mirror still carries the hand of its maker — and a small Darpan seal at the back.",
  },
];

function Journey() {
  return (
    <>
      <SiteNav />

      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-10">
        <p className="eyebrow">Our Journey</p>
        <h1 className="mt-6 font-display text-5xl leading-tight text-[var(--color-brown-deep)] sm:text-6xl">
          From a Jaipur workshop to your wall.
        </h1>
        <div className="hairline mx-auto mt-10 w-32" />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-32 lg:px-10">
        <ol className="relative border-l border-[var(--color-gold)]/40">
          {chapters.map((c, i) => (
            <li key={c.year} className="relative pl-10 pb-16 last:pb-0">
              <span className="absolute -left-[7px] top-1 inline-block h-3 w-3 rounded-full border border-[var(--color-gold)] bg-[var(--color-ivory)]" />
              <p className="eyebrow text-[var(--color-gold)]">{c.year}</p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-brown-deep)] sm:text-4xl">
                {c.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-brown)]/85">
                {c.body}
              </p>
              {i < chapters.length - 1 && <div className="hairline mt-10 w-20" />}
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </>
  );
}
