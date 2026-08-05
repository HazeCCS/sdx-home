import type { Dictionary } from "@/i18n/dictionaries";
import { reveal, revealFade } from "@/motion/reveal";

export function Services({ dict }: { dict: Dictionary }) {
  const t = dict.services;

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <header className="section-header section-header--services" {...reveal(0)}>
          <div>
            <h2 id="services-title">
              {t.titleLine1}
              <br />
              <em>{t.titleEm}</em>
            </h2>
          </div>
          <p>{t.intro}</p>
        </header>

        <div className="purpose-panel" {...revealFade(0)}>
          <p>{t.purposeText}</p>
          <span className="purpose-mark" aria-hidden="true">
            SDX
          </span>
        </div>

        <div className="service-grid">
          {t.items.map((service, index) => (
            <article key={service.title} {...reveal(index)}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
