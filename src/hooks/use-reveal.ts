import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook. Attach the returned ref to any element and the boolean
 * flips to true the first time it enters the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      options,
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}
