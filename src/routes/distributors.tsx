import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";

export const Route = createFileRoute("/distributors")({ component: Distributors });

const partners = [
  { city: "Jaipur", name: "Darpan Atelier (Flagship)", region: "Rajasthan" },
  { city: "New Delhi", name: "Atelier 14, Mehrauli", region: "NCR" },
  { city: "Mumbai", name: "House of Form, Bandra West", region: "Maharashtra" },
  { city: "Bengaluru", name: "Studio Sūtra, Indiranagar", region: "Karnataka" },
  { city: "Hyderabad", name: "Mira Living, Jubilee Hills", region: "Telangana" },
  { city: "Dubai", name: "Maison Lumière, Al Quoz", region: "UAE" },
];

function Distributors() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <SiteNav />

      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-10">
        <p className="eyebrow">Distributors & Trade</p>
        <h1 className="mt-6 font-display text-5xl leading-tight text-[var(--color-brown-deep)] sm:text-6xl">
          Find Darpan, or partner with us.
        </h1>
        <div className="hairline mx-auto mt-10 w-32" />
        <p className="mt-10 text-base leading-relaxed text-[var(--color-brown)]/85">
          Visit a Darpan stockist near you, or apply to carry the collection in your
          studio. We work with a small, considered set of partners across India and
          the GCC.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
        <p className="eyebrow text-center">Stockists</p>
        <div className="mt-10 grid gap-px overflow-hidden border border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div key={p.name} className="bg-[var(--color-card)] p-8">
              <p className="eyebrow text-[var(--color-gold)]">{p.city}</p>
              <p className="mt-3 font-display text-2xl text-[var(--color-brown-deep)]">{p.name}</p>
              <p className="mt-2 text-sm text-[var(--color-taupe)]">{p.region}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-sandstone)]/60">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
          <p className="eyebrow text-center">Partner With Us</p>
          <h2 className="mt-4 text-center font-display text-4xl text-[var(--color-brown-deep)]">
            Carry Darpan in your studio.
          </h2>
          <div className="hairline mx-auto mt-8 w-24" />

          {sent ? (
            <p className="mt-12 text-center font-display text-2xl text-[var(--color-brown)]">
              Thank you — we'll be in touch within two working days.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-12 grid gap-6 sm:grid-cols-2"
            >
              <Field label="Studio / Showroom" name="studio" />
              <Field label="Contact name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="City" name="city" />
              <Field label="Tell us about your space" name="message" textarea full />
              <div className="sm:col-span-2">
                <button className="eyebrow inline-flex items-center gap-2 bg-[var(--color-brown)] px-7 py-3.5 text-[var(--color-ivory)] hover:bg-[var(--color-brown-deep)]">
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function Field({
  label, name, type = "text", textarea = false, full = false,
}: { label: string; name: string; type?: string; textarea?: boolean; full?: boolean }) {
  const cls = "mt-2 w-full border-0 border-b border-[var(--color-brown)]/30 bg-transparent py-3 text-[var(--color-brown-deep)] focus:border-[var(--color-gold)] focus:outline-none";
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="eyebrow text-[var(--color-taupe)]">{label}</span>
      {textarea ? (
        <textarea name={name} required rows={4} className={cls} />
      ) : (
        <input name={name} type={type} required className={cls} />
      )}
    </label>
  );
}
