"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { company } from "@/lib/site";
import { href, localizedPath, routes, type RouteKey } from "@/i18n/routing";
import { easing } from "@/motion/tokens";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

const ArrowIcon = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const DocIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v5h6" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const visibleFocusables = (root: HTMLElement | null) =>
  root
    ? Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.getClientRects().length > 0,
      )
    : [];

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);

  const items: { key: RouteKey; eyebrow: string; title: string }[] = [
    { key: "home", eyebrow: dict.nav.eyebrowHome, title: dict.nav.home },
    { key: "about", eyebrow: dict.nav.eyebrowAbout, title: dict.nav.about },
    { key: "snusdex", eyebrow: dict.nav.eyebrowSnusdex, title: dict.nav.snusdex },
    { key: "contact", eyebrow: dict.nav.eyebrowContact, title: dict.nav.contact },
  ];

  const legalLinks: { key: RouteKey; label: string; icon: React.ReactNode }[] = [
    { key: "imprint", label: dict.footer.imprintLink, icon: <DocIcon /> },
    { key: "privacy", label: dict.footer.privacyLink, icon: <ShieldIcon /> },
    { key: "snusdexPrivacy", label: dict.footer.snusdexPrivacyLink, icon: <ShieldIcon /> },
  ];

  const isActive = (key: RouteKey) => pathname === localizedPath(locale, routes[key]);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) {
      if (restoreFocus.current) {
        restoreFocus.current = false;
        toggleRef.current?.focus();
      }
      return;
    }

    restoreFocus.current = true;
    visibleFocusables(overlayRef.current)[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const overlayNodes = visibleFocusables(overlayRef.current);
      const nodes = toggleRef.current ? [toggleRef.current, ...overlayNodes] : overlayNodes;
      if (nodes.length === 0) return;

      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === firstNode) {
        event.preventDefault();
        lastNode.focus();
      } else if (!event.shiftKey && active === lastNode) {
        event.preventDefault();
        firstNode.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const ease = easing.out;
  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.62, ease };
  const scrimTransition = reduceMotion ? { duration: 0 } : { duration: 0.4, ease };

  const itemMotion = (index: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 }, exit: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease, delay: 0.18 + index * 0.06 },
          },
          exit: { opacity: 0, transition: { duration: 0.16 } },
        };

  return (
    <>
      <nav id="main-nav" aria-label={dict.nav.ariaLabel}>
        <div className="nav-inner">
          <Link href={localizedPath(locale)} className="nav-logo" aria-label={dict.nav.logoAria}>
            SDX <span>Solutions</span>
          </Link>
          <button
            ref={toggleRef}
            className="nav-menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <div className="menu-overlay" id="main-menu">
            <motion.div
              className="menu-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={scrimTransition}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div
              className="menu-panels"
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              aria-label={dict.nav.menuAria}
            >
              <motion.div
                className="menu-main"
                initial={{ x: reduceMotion ? 0 : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: reduceMotion ? 0 : "100%" }}
                transition={panelTransition}
              >
                <div className="menu-list">
                  {items.map((item, index) => (
                    <motion.div key={item.key} {...itemMotion(index)}>
                      <Link
                        className="menu-item"
                        href={href(locale, item.key)}
                        aria-current={isActive(item.key) ? "page" : undefined}
                        onClick={closeMenu}
                      >
                        <span className="menu-item-glow" aria-hidden="true" />
                        <span className="menu-item-bar" aria-hidden="true" />
                        <span className="menu-item-rule" aria-hidden="true" />
                        <span className="menu-item-row">
                          <span className="menu-item-text">
                            <span className="menu-item-eyebrow">{item.eyebrow}</span>
                            <span className="menu-item-title">{item.title}</span>
                          </span>
                          <span className="menu-item-arrow">
                            <ArrowIcon />
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="menu-foot"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.4, ease, delay: 0.5 } }}
                  exit={{ opacity: 0, transition: { duration: 0.16 } }}
                >
                  <Link className="menu-foot-cta" href={href(locale, "contact", "anfrage")} onClick={closeMenu}>
                    {dict.nav.cta}
                    <ArrowIcon size={14} />
                  </Link>
                  <span>{dict.footer.copyright}</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="menu-aside"
                initial={{ x: reduceMotion ? 0 : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: reduceMotion ? 0 : "-100%" }}
                transition={panelTransition}
              >
                <div className="menu-aside-group">
                  <span className="menu-aside-label">{dict.footer.directGroup}</span>
                  <div className="menu-aside-list">
                    <a href={`mailto:${company.email}`}>
                      <MailIcon />
                      <span>{company.email}</span>
                      <span className="menu-aside-arrow">
                        <ArrowIcon size={11} />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="menu-aside-group">
                  <span className="menu-aside-label">{dict.footer.legalGroup}</span>
                  <div className="menu-aside-list">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.key}
                        href={href(locale, link.key)}
                        aria-current={isActive(link.key) ? "page" : undefined}
                        onClick={closeMenu}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                        <span className="menu-aside-arrow">
                          <ArrowIcon size={11} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="menu-mobile-links"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4, ease, delay: 0.54 } }}
                exit={{ opacity: 0, transition: { duration: 0.16 } }}
              >
                {legalLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={href(locale, link.key)}
                    aria-current={isActive(link.key) ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <a href={`mailto:${company.email}`}>
                  <MailIcon />
                  {company.email}
                </a>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
