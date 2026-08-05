"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href, localizedPath, routes, type RouteKey } from "@/i18n/routing";
import { menuTransition } from "@/motion/tokens";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const isSubpage = pathname !== localizedPath(locale);
  const [scrolled, setScrolled] = useState(isSubpage);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const primaryLinks: { key: RouteKey; label: string }[] = [
    { key: "home", label: dict.nav.home },
    { key: "about", label: dict.nav.about },
    { key: "snusdex", label: dict.nav.snusdex },
    { key: "contact", label: dict.nav.contact },
  ];

  const mobileLinks: { key: RouteKey; label: string }[] = [
    ...primaryLinks,
    { key: "imprint", label: dict.footer.imprintLink },
    { key: "privacy", label: dict.footer.privacyLink },
  ];

  const isActive = (key: RouteKey) => pathname === localizedPath(locale, routes[key]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth > 980) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <nav id="main-nav" className={scrolled ? "is-scrolled" : undefined} aria-label={dict.nav.ariaLabel}>
      <div className="nav-inner">
        <Link href={localizedPath(locale)} className="nav-logo" aria-label={dict.nav.logoAria}>
          SDX <span>Solutions</span>
        </Link>
        <div className="nav-links">
          {primaryLinks.map((link) => (
            <Link
              key={link.key}
              href={href(locale, link.key)}
              aria-current={isActive(link.key) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className="nav-menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? dict.nav.menuClose : dict.nav.menuOpen}
        </button>
        <Link href={href(locale, "contact", "anfrage")} className="nav-cta">
          {dict.nav.cta}
        </Link>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="mobile-nav"
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : menuTransition}
            style={{ overflow: "hidden" }}
          >
            {mobileLinks.map((link) => (
              <Link
                key={link.key}
                href={href(locale, link.key)}
                aria-current={isActive(link.key) ? "page" : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
