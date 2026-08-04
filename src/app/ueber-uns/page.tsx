import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactCta } from "@/components/ui/ContactCta";

export const metadata: Metadata = {
  title: "Über SDX Solutions — SDX Solutions UG (haftungsbeschränkt)",
  description:
    "Erfahren Sie mehr über SDX Solutions UG (haftungsbeschränkt), unsere Arbeitsweise und unsere Leistungen in Softwareentwicklung, Apps, Websites und Webservices.",
};

const facts = [
  { label: "Sitz", value: "Taufkirchen (Vils)", note: "Bayern, Deutschland" },
  { label: "Geschäftsführung", value: "Norman Tarayan", note: "Direkter Ansprechpartner" },
  { label: "Fokus", value: "Software & IT", note: "Eigene Produkte und Auftragsentwicklung" },
];

const work = [
  {
    index: "01",
    title: "Websites & Webauftritte",
    text: "Konzeption und Umsetzung schneller, responsiver Unternehmensseiten und Landingpages.",
  },
  {
    index: "02",
    title: "Mobile Apps",
    text: "Produktentwicklung für iOS und Android – von der Logik bis zur Veröffentlichung.",
  },
  {
    index: "03",
    title: "Individuelle Tools",
    text: "Dashboards, interne Anwendungen und Automatisierungen für konkrete Arbeitsabläufe.",
  },
  {
    index: "04",
    title: "Webservices & Backends",
    text: "Schnittstellen, Datenflüsse und technische Grundlagen für stabile digitale Produkte.",
  },
];

export default function AboutPage() {
  return (
    <main className="subpage">
      <header className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Über SDX Solutions</Eyebrow>
          <h1>
            Software ist unser Produkt.
            <br />
            <em>Umsetzung unser Handwerk.</em>
          </h1>
          <p>
            SDX Solutions UG (haftungsbeschränkt) entwickelt eigene digitale Produkte und realisiert
            Softwareprojekte für Unternehmen und Privatpersonen.
          </p>
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container about-layout">
          <div className="about-lead">
            <Eyebrow>Das Unternehmen</Eyebrow>
            <h2>
              Von Taufkirchen aus
              <br />
              <em>digital gedacht.</em>
            </h2>
          </div>
          <div className="prose-block">
            <p>
              Wir verbinden Produktentwicklung mit direkter IT-Dienstleistung. Eigene Apps wie
              Snusdex und FuelPilot geben uns täglich praktische Erfahrung mit Konzeption,
              Entwicklung, Veröffentlichung und laufendem Betrieb.
            </p>
            <p>
              Diese Erfahrung bringen wir in Kundenprojekte ein – von einer klaren
              Unternehmenswebsite über ein internes Tool bis zur mobilen Anwendung oder einem
              individuellen Webservice.
            </p>
          </div>
        </div>

        <div className="container company-facts" role="list" aria-label="Unternehmensdaten">
          {facts.map((fact) => (
            <article role="listitem" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
              <p>{fact.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="work-title">
        <div className="container">
          <header className="section-header">
            <div>
              <Eyebrow>Was wir umsetzen</Eyebrow>
              <h2 id="work-title">
                Ein Partner für
                <br />
                <em>digitale Vorhaben.</em>
              </h2>
            </div>
            <p>
              Wir übernehmen klar definierte Einzelprojekte ebenso wie den Weg von der ersten Idee
              bis zur Veröffentlichung.
            </p>
          </header>
          <div className="service-list">
            {work.map((item) => (
              <article key={item.index}>
                <span>{item.index}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        eyebrow="Zusammenarbeiten"
        title="Ein Projekt beginnt mit einer klaren Anfrage."
        text="Beschreiben Sie kurz, was entstehen soll. Wir melden uns mit einer realistischen Einschätzung."
        buttonLabel="Projekt anfragen"
        buttonHref="/kontakt#anfrage"
      />
    </main>
  );
}
