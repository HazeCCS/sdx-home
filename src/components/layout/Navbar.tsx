"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mobileNav, primaryNav } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href;
}

export function Navbar() {
  const pathname = usePathname();
  const isSubpage = pathname !== "/";
  const [scrolled, setScrolled] = useState(isSubpage);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

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
    <nav id="main-nav" className={scrolled ? "is-scrolled" : undefined} aria-label="Hauptnavigation">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="SDX Solutions Startseite">
          SDX <span>Solutions</span>
        </Link>
        <div className="nav-links">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
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
          {open ? "Schließen" : "Menü"}
        </button>
        <Link href="/kontakt#anfrage" className="nav-cta">
          Projekt anfragen
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
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            {mobileNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
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
