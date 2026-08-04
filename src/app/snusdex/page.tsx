import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { ContactCta } from "@/components/ui/ContactCta";

export const metadata: Metadata = {
  title: "Snusdex — Produktübersicht von SDX Solutions",
  description:
    "Snusdex ist die mobile Produktplattform für tabakfreie Nikotinbeutel: entdecken, vergleichen und den persönlichen Überblick behalten.",
};

const features = [
  {
    index: "01",
    title: "Entdecken",
    text: "Produkte strukturiert durchsuchen und relevante Varianten schneller finden.",
  },
  {
    index: "02",
    title: "Vergleichen",
    text: "Eigenschaften einordnen und Unterschiede übersichtlich gegenüberstellen.",
  },
  {
    index: "03",
    title: "Sammlung",
    text: "Favoriten und persönliche Einträge an einem Ort im Blick behalten.",
  },
];

export default function SnusdexPage() {
  return (
    <main className="subpage">
      <header className="page-hero product-detail-hero">
        <div className="container product-detail-grid">
          <div className="page-hero-inner page-hero-inner--flush">
            <Eyebrow>Eigenes Produkt · In Entwicklung</Eyebrow>
            <h1>Snusdex</h1>
            <p>
              Eine mobile Produktplattform für tabakfreie Nikotinbeutel – übersichtlich, vergleichbar
              und für den schnellen Einsatz unterwegs gedacht.
            </p>
            <StoreLinks
              className="store-links--hero"
              ariaLabel="Snusdex Downloads"
              items={[
                { label: "iOS App Store", note: "Coming soon" },
                { label: "Google Play", note: "Coming soon" },
              ]}
            />
          </div>
          <div
            className="product-shot product-shot--snusdex"
            role="img"
            aria-label="Ausschnitt aus der Snusdex App"
          />
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container">
          <header className="section-header">
            <div>
              <Eyebrow>Die Idee</Eyebrow>
              <h2>
                Produkte verstehen,
                <br />
                <em>ohne lange zu suchen.</em>
              </h2>
            </div>
            <p>
              Snusdex bündelt Produktinformationen und persönliche Orientierung in einer klaren
              mobilen Oberfläche.
            </p>
          </header>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.index}>
                <span>{feature.index}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split-note">
          <div>
            <Eyebrow>Einordnung</Eyebrow>
            <h2>
              Informationsprodukt,
              <br />
              <em>kein Onlineshop.</em>
            </h2>
          </div>
          <div className="prose-block">
            <p>
              Snusdex dient der Information und persönlichen Organisation. Über die Plattform werden
              keine Nikotinprodukte verkauft.
            </p>
            <p>
              Die Inhalte richten sich an Erwachsene und stellen keine medizinische oder
              gesundheitliche Beratung dar.
            </p>
          </div>
        </div>
      </section>

      <ContactCta
        eyebrow="Produkt & Partnerschaft"
        title="Fragen zu Snusdex?"
        text="Für Produktfragen, Kooperationen oder geschäftliche Anfragen erreichen Sie uns direkt."
        buttonLabel="Kontakt aufnehmen"
        buttonHref="/kontakt"
      />
    </main>
  );
}
