import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { reveal } from "@/motion/reveal";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons: ReactNode[] = [
  <svg key="web" {...iconProps}>
    <rect x="3" y="4" width="18" height="13" rx="2.5" />
    <path d="M8 21h8M12 17v4" />
  </svg>,
  <svg key="app" {...iconProps}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>,
  <svg key="tools" {...iconProps}>
    <path d="M4 7l4 4-4 4M11 17h9" />
    <rect x="2.5" y="3.5" width="19" height="17" rx="2.5" />
  </svg>,
  <svg key="services" {...iconProps}>
    <rect x="3" y="3.5" width="18" height="7" rx="2" />
    <rect x="3" y="13.5" width="18" height="7" rx="2" />
    <path d="M7 7h.01M7 17h.01" />
  </svg>,
];

export function Services({ dict }: { dict: Dictionary }) {
  const t = dict.services;

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <header className="section-heading" {...reveal(0)}>
          <h2 id="services-title">
            {t.titleLine1}
            <br />
            <em>{t.titleEm}</em>
          </h2>
        </header>

        <div className="service-grid">
          {t.items.map((service, index) => (
            <article key={service.title} {...reveal(index)}>
              <span className="service-icon">{icons[index]}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
