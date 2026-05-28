import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/shop", label: "Collection" },
  { to: "/about", label: "About" },
  { to: "/journey", label: "Journey" },
  { to: "/distributors", label: "Trade" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)]/70 bg-[var(--color-ivory)]/92 shadow-[0_1px_0_rgba(91,70,48,0.03)] backdrop-blur-xl">
      <div className="mx-auto grid h-[76px] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-5 px-5 lg:h-20 lg:px-10">
        <Link to="/" className="flex items-center shrink-0" aria-label="Darpan home">
          <img
            src="/logo-nav-wordmark-transparent.png"
            alt="Darpan"
            className="h-auto w-[128px] object-contain opacity-90 mix-blend-multiply sm:w-[146px]"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-7 lg:flex xl:gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="eyebrow text-[0.62rem] text-[var(--color-brown)]/82 transition-colors hover:text-[var(--color-gold)]"
              activeProps={{ style: { color: "var(--color-gold)" } }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <Link
            to="/shop"
            className="eyebrow inline-flex items-center gap-2 border border-[var(--color-gold)]/70 px-5 py-2.5 text-[0.62rem] text-[var(--color-brown)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-ivory)]"
          >
            Shop Mirrors
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="justify-self-end p-2 text-[var(--color-brown)] lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            {open ? (
              <path d="M6 6 L18 18 M18 6 L6 18" />
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-ivory)]/96 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col px-6 py-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="eyebrow border-b border-[var(--color-border)]/55 py-3.5 text-[var(--color-brown)] last:border-b-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
