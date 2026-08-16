"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { company } from "@/lib/site";
import { href, localizedPath, routes, type RouteKey } from "@/i18n/routing";
import { easing, menuStateEvent } from "@/motion/tokens";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

const EASE = easing.inOut;
const EXPO = easing.expo;

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

type MenuItemProps = {
  href: string;
  eyebrow: string;
  title: string;
  index: number;
  current: boolean;
  reduce: boolean;
  onNavigate: () => void;
};

function MenuItem({ href: to, eyebrow, title, index, current, reduce, onNavigate }: MenuItemProps) {
  const [lit, setLit] = useState(false);

  const entrance = reduce
    ? { duration: 0 }
    : { duration: 0.55, delay: 0.25 + 0.07 * index, ease: EASE };

  const tween = (duration: number, ease: typeof EXPO | "easeOut") =>
    reduce ? { duration: 0 } : { duration, ease };

  return (
    <motion.div
      className="menu-item-shell"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={entrance}
    >
      <motion.div initial="rest" animate={lit ? "hover" : "rest"} variants={{}}>
        <Link
          className="menu-item"
          href={to}
          aria-current={current ? "page" : undefined}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setLit(true);
          }}
          onPointerLeave={() => setLit(false)}
          onFocus={(event) => {
            if (event.currentTarget.matches(":focus-visible")) setLit(true);
          }}
          onBlur={() => setLit(false)}
          onClick={onNavigate}
        >
          <motion.span
            className="menu-item-glow"
            aria-hidden="true"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={tween(0.45, "easeOut")}
          />
          <motion.span
            className="menu-item-bar"
            aria-hidden="true"
            variants={{
              rest: { scaleY: current ? 1 : 0, opacity: current ? 0.45 : 1 },
              hover: { scaleY: 1, opacity: 1 },
            }}
            transition={tween(0.5, EXPO)}
          />
          <motion.span
            className="menu-item-rule"
            aria-hidden="true"
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={tween(0.55, EXPO)}
          />
          <span className="menu-item-row">
            <motion.span
              className="menu-item-text"
              variants={{ rest: { y: 0, x: 0 }, hover: { y: -4, x: 6 } }}
              transition={tween(0.45, EXPO)}
            >
              <span className="menu-item-eyebrow">{eyebrow}</span>
              <span className="menu-item-title">{title}</span>
            </motion.span>
            <motion.span
              className="menu-item-arrow"
              aria-hidden="true"
              variants={{
                rest: { opacity: 0, x: -8, y: 8 },
                hover: { opacity: 1, x: 0, y: 0 },
              }}
              transition={tween(0.35, EXPO)}
            >
              <ArrowIcon />
            </motion.span>
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

type AsideLinkProps = {
  index: number;
  reduce: boolean;
  icon: ReactNode;
  label: string;
  children: (inner: ReactNode) => ReactNode;
};

function AsideLink({ index, reduce, icon, label, children }: AsideLinkProps) {
  return (
    <motion.div
      className="menu-aside-row"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={reduce ? { duration: 0 } : { delay: 0.65 + 0.06 * index, duration: 0.4 }}
      whileHover={reduce ? undefined : { x: 4 }}
    >
      {children(
        <>
          {icon}
          <span>{label}</span>
          <span className="menu-aside-arrow">
            <ArrowIcon size={11} />
          </span>
        </>,
      )}
    </motion.div>
  );
}

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);

  const items: { key: RouteKey; eyebrow: string; title: string }[] = [
    { key: "home", eyebrow: dict.nav.eyebrowHome, title: dict.nav.home },
    { key: "about", eyebrow: dict.nav.eyebrowAbout, title: dict.nav.about },
    { key: "snusdex", eyebrow: dict.nav.eyebrowSnusdex, title: dict.nav.snusdex },
    { key: "contact", eyebrow: dict.nav.eyebrowContact, title: dict.nav.contact },
  ];

  const legalLinks: { key: RouteKey; label: string; icon: ReactNode }[] = [
    { key: "imprint", label: dict.footer.imprintLink, icon: <DocIcon /> },
    { key: "privacy", label: dict.footer.privacyLink, icon: <ShieldIcon /> },
    { key: "snusdexPrivacy", label: dict.footer.snusdexPrivacyLink, icon: <ShieldIcon /> },
  ];

  const isActive = (key: RouteKey) => pathname === localizedPath(locale, routes[key]);

  const closeMenu = useCallback(() => setOpen(false), []);

  const emitMenuState = useCallback((value: boolean) => {
    window.dispatchEvent(new CustomEvent(menuStateEvent, { detail: { open: value } }));
  }, []);

  useEffect(() => {
    if (open) emitMenuState(true);
  }, [open, emitMenuState]);

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

    const scrollable = (target: EventTarget | null) =>
      target instanceof Node && Boolean((target as Element).closest?.(".menu-list"));

    const blockWheel = (event: Event) => {
      if (!scrollable(event.target)) event.preventDefault();
    };

    const blockKeys = (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown", "Home", "End"].includes(event.code) &&
        !scrollable(event.target)
      ) {
        event.preventDefault();
      }
    };

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

    window.addEventListener("wheel", blockWheel, { passive: false });
    window.addEventListener("touchmove", blockWheel, { passive: false });
    window.addEventListener("keydown", blockKeys);
    document.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", blockWheel);
      window.removeEventListener("touchmove", blockWheel);
      window.removeEventListener("keydown", blockKeys);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  const panelTransition = reduce ? { duration: 0 } : { duration: 0.65, ease: EASE };

  return (
    <>
      <nav
        id="main-nav"
        className={open ? "is-menu-open" : undefined}
        aria-label={dict.nav.ariaLabel}
      >
        <div className="nav-inner">
          <Link href={localizedPath(locale)} className="nav-logo" aria-label={dict.nav.logoAria}>
            SDX <span>Solutions</span>
          </Link>
          <motion.button
            ref={toggleRef}
            className="nav-menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
            onClick={() => setOpen((value) => !value)}
            whileHover={reduce ? undefined : { scale: 1.1 }}
            whileTap={reduce ? undefined : { scale: 0.9 }}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            />
          </motion.button>
        </div>
      </nav>

      <AnimatePresence mode="wait" onExitComplete={() => emitMenuState(false)}>
        {open && (
          <div className="menu-overlay" id="main-menu">
            <motion.div
              className="menu-scrim"
              initial={false}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
              aria-hidden="true"
            />
            <motion.div
              className="menu-tint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
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
                initial={{ x: reduce ? 0 : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: reduce ? 0 : "100%" }}
                transition={panelTransition}
              >
                <div className="menu-list">
                  {items.map((item, index) => (
                    <MenuItem
                      key={item.key}
                      href={href(locale, item.key)}
                      eyebrow={item.eyebrow}
                      title={item.title}
                      index={index}
                      current={isActive(item.key)}
                      reduce={reduce}
                      onNavigate={closeMenu}
                    />
                  ))}

                  <motion.div
                    className="menu-foot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={reduce ? { duration: 0 } : { delay: 0.7, duration: 0.4 }}
                  >
                    <Link
                      className="menu-foot-cta"
                      href={href(locale, "contact", "anfrage")}
                      onClick={closeMenu}
                    >
                      {dict.nav.cta}
                      <ArrowIcon size={14} />
                    </Link>
                    <span>{dict.footer.copyright}</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="menu-aside"
                initial={{ x: reduce ? 0 : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: reduce ? 0 : "-100%" }}
                transition={panelTransition}
              >
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { delay: 0.55, duration: 0.5 }}
                >
                  <div className="menu-aside-group">
                    <span className="menu-aside-label">{dict.footer.directGroup}</span>
                    <div className="menu-aside-list">
                      <AsideLink
                        index={0}
                        reduce={reduce}
                        icon={<MailIcon />}
                        label={company.email}
                      >
                        {(inner) => <a href={`mailto:${company.email}`}>{inner}</a>}
                      </AsideLink>
                    </div>
                  </div>
                  <div className="menu-aside-group">
                    <span className="menu-aside-label">{dict.footer.legalGroup}</span>
                    <div className="menu-aside-list">
                      {legalLinks.map((link, index) => (
                        <AsideLink
                          key={link.key}
                          index={index + 1}
                          reduce={reduce}
                          icon={link.icon}
                          label={link.label}
                        >
                          {(inner) => (
                            <Link
                              href={href(locale, link.key)}
                              aria-current={isActive(link.key) ? "page" : undefined}
                              onClick={closeMenu}
                            >
                              {inner}
                            </Link>
                          )}
                        </AsideLink>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="menu-mobile-links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.7, duration: 0.5 }}
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
