import type { Dictionary } from "@/i18n/dictionaries";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Services({ dict }: { dict: Dictionary }) {
  const t = dict.services;

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <header className="section-header section-header--services">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 id="services-title">
              {t.titleLine1}
              <br />
              <em>{t.titleEm}</em>
            </h2>
          </div>
          <p>{t.intro}</p>
        </header>

        <div className="purpose-panel">
          <span className="purpose-label">{t.purposeLabel}</span>
          <p>{t.purposeText}</p>
          <span className="purpose-mark" aria-hidden="true">
            SDX
          </span>
        </div>

        <div className="service-grid">
          {t.items.map((service, index) => (
            <article key={service.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
