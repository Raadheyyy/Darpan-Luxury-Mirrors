import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-brown)] text-[var(--color-ivory)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <img
                src="/logo-footer-transparent.png"
                alt="Darpan"
                className="h-auto w-[190px] object-contain opacity-95 sm:w-[240px]"
              />
            </div>
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-[var(--color-ivory)]/90">
              Reflecting beauty. Illuminating spaces.
            </p>
            <p className="mt-4 max-w-sm text-sm text-[var(--color-ivory)]/65">
              Luxury LED mirrors crafted in Jaipur — where timeless Indian
              craftsmanship meets modern innovation.
            </p>
          </div>

          <div>
            <p className="eyebrow text-[var(--color-gold-soft)]">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/shop" className="hover:text-[var(--color-gold-soft)]">Collection</Link></li>
              <li><Link to="/about" className="hover:text-[var(--color-gold-soft)]">About</Link></li>
              <li><Link to="/journey" className="hover:text-[var(--color-gold-soft)]">Journey</Link></li>
              <li><Link to="/distributors" className="hover:text-[var(--color-gold-soft)]">Distributors</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-gold-soft)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[var(--color-gold-soft)]">Studio</p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-[var(--color-ivory)]/75">
              Darpan Atelier<br />
              C-Scheme, Jaipur<br />
              Rajasthan, India 302001<br />
              <a href="mailto:hello@darpan.studio" className="mt-3 inline-block hover:text-[var(--color-gold-soft)]">
                hello@darpan.studio
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-ivory)]/15 pt-8 text-xs text-[var(--color-ivory)]/55 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Darpan. Made in Jaipur.</span>
          <span className="eyebrow text-[var(--color-gold-soft)]">Heritage · Craftsmanship · Innovation · Reflection</span>
        </div>
      </div>
    </footer>
  );
}
