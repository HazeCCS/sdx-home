import { Eyebrow } from "@/components/ui/Eyebrow";

const services = [
  {
    index: "01",
    title: "Websites",
    text: "Seriöse Unternehmensseiten und fokussierte Landingpages, die auf jedem Gerät funktionieren.",
  },
  {
    index: "02",
    title: "Apps",
    text: "Mobile Anwendungen von der Produktidee über die Entwicklung bis zur Veröffentlichung.",
  },
  {
    index: "03",
    title: "Tools & Software",
    text: "Individuelle Tools, Dashboards und Automatisierungen für konkrete Arbeitsabläufe.",
  },
  {
    index: "04",
    title: "Webservices",
    text: "Backends, Schnittstellen und technische Grundlagen für stabile digitale Produkte.",
  },
];

export function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <header className="section-header section-header--services">
          <div>
            <Eyebrow>SDX Solutions UG</Eyebrow>
            <h2 id="services-title">
              Digitale Lösungen,
              <br />
              <em>sauber umgesetzt.</em>
            </h2>
          </div>
          <p>
            Von der ersten Idee bis zum veröffentlichten Produkt. Wir übernehmen klar abgegrenzte
            Projekte ebenso wie die vollständige technische Umsetzung.
          </p>
        </header>

        <div className="purpose-panel">
          <span className="purpose-label">Unternehmensgegenstand</span>
          <p>
            Entwicklung, Publishing und Vertrieb von Software, mobilen Applikationen und Webservices
            sowie Erbringung von IT-Dienstleistungen.
          </p>
          <span className="purpose-mark" aria-hidden="true">
            SDX
          </span>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article key={service.index}>
              <span>{service.index}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
