"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/motion/tokens";

let hasNavigated = false;

export function MotionRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const firstRender = useRef(!hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  useEffect(() => {
    const fallback = (window as unknown as { __revealFallback?: number }).__revealFallback;
    if (fallback) window.clearTimeout(fallback);

    const revealAll = () =>
      document.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-revealed"));

    if (reduce || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeWithin = (root: ParentNode) => {
      root
        .querySelectorAll?.("[data-reveal]:not(.is-revealed)")
        .forEach((node) => io.observe(node));
    };

    observeWithin(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const element = node as Element;
          if (element.matches?.("[data-reveal]")) io.observe(element);
          observeWithin(element);
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [reduce]);

  return (
    <motion.div
      key={pathname}
      className="page-shell"
      initial={firstRender.current || reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : duration.base, ease: easing.out }}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}
