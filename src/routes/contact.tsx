import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-24 pb-24 lg:px-10">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-6 font-display text-5xl leading-tight text-[var(--color-brown-deep)] sm:text-6xl">
              Visit the atelier.
            </h1>
            <div className="hairline mt-8 w-24" />
            <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--color-brown)]/85">
              <div>
                <p className="eyebrow text-[var(--color-gold)]">Studio</p>
                <address className="mt-3 not-italic font-display text-xl text-[var(--color-brown-deep)]">
                  Darpan Atelier<br />
                  C-Scheme, Jaipur<br />
                  Rajasthan, India 302001
                </address>
              </div>
              <div>
                <p className="eyebrow text-[var(--color-gold)]">Hours</p>
                <p className="mt-3">Tuesday – Saturday · 11am to 7pm IST</p>
              </div>
              <div>
                <p className="eyebrow text-[var(--color-gold)]">Reach us</p>
                <p className="mt-3">
                  <a href="mailto:hello@darpan.studio" className="hover:text-[var(--color-gold)]">hello@darpan.studio</a><br />
                  <a href="tel:+919999999999" className="hover:text-[var(--color-gold)]">+91 99999 99999</a>
                </p>
              </div>
            </div>
          </div>

          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-8 sm:p-12">
            <p className="eyebrow text-[var(--color-taupe)]">Send a Message</p>
            {sent ? (
              <p className="mt-10 font-display text-2xl text-[var(--color-brown)]">
                Thank you — we'll reply within two working days.
              </p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="mt-8 grid gap-5"
              >
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Subject" name="subject" />
                <Field label="Message" name="message" textarea />
                <button className="eyebrow mt-4 inline-flex w-fit items-center gap-2 bg-[var(--color-brown)] px-7 py-3.5 text-[var(--color-ivory)] hover:bg-[var(--color-brown-deep)]">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function Field({
  label, name, type = "text", textarea = false,
}: { label: string; name: string; type?: string; textarea?: boolean }) {
  const cls = "mt-2 w-full border-0 border-b border-[var(--color-brown)]/30 bg-transparent py-3 text-[var(--color-brown-deep)] focus:border-[var(--color-gold)] focus:outline-none";
  return (
    <label>
      <span className="eyebrow text-[var(--color-taupe)]">{label}</span>
      {textarea ? (
        <textarea name={name} required rows={5} className={cls} />
      ) : (
        <input name={name} type={type} required className={cls} />
      )}
    </label>
  );
}
