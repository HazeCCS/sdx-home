"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { localeCookie, locales, type Locale } from "@/i18n/config";
import { swapLocaleInPath } from "@/i18n/routing";
import { indicatorSpring } from "@/motion/tokens";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const labels: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
};

export function LanguageSwitcher({
  locale,
  ariaLabel,
}: {
  locale: Locale;
  ariaLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      const btn = btnRefs.current[locale];
      const track = trackRef.current;
      if (!btn || !track) return;
      const b = btn.getBoundingClientRect();
      const t = track.getBoundingClientRect();
      setIndicator({ x: b.left - t.left, width: b.width });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [locale]);

  const spring = reduceMotion ? { duration: 0 } : indicatorSpring;

  const select = (target: Locale) => {
    if (target === locale) return;
    document.cookie = `${localeCookie}=${target}; path=/; max-age=31536000; samesite=lax`;
    router.push(swapLocaleInPath(pathname, target));
  };

  return (
    <div ref={trackRef} className="lang-switch" role="group" aria-label={ariaLabel}>
      {locales.map((code) => {
        const active = locale === code;
        return (
          <motion.button
            key={code}
            ref={(el) => {
              btnRefs.current[code] = el;
            }}
            type="button"
            onClick={() => select(code)}
            aria-pressed={active}
            whileTap={{ scale: reduceMotion ? 1 : 0.92 }}
            className={`lang-switch-btn${active ? " is-active" : ""}`}
          >
            {labels[code]}
          </motion.button>
        );
      })}

      {indicator.width > 0 && (
        <motion.span
          aria-hidden="true"
          className="lang-switch-indicator"
          initial={false}
          animate={{ x: indicator.x, width: indicator.width }}
          transition={spring}
        />
      )}
    </div>
  );
}
