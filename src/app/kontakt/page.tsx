import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt & Projektanfrage — SDX Solutions",
  description:
    "Kontaktieren Sie SDX Solutions UG (haftungsbeschränkt) für Websites, Apps, individuelle Software, Tools und Webservices.",
};

export default function ContactPage() {
  return (
    <main className="subpage">
      <header className="page-hero page-hero--compact">
        <div className="container page-hero-inner">
          <Eyebrow>Kontakt</Eyebrow>
          <h1>
            Erzählen Sie uns,
            <br />
            <em>was entstehen soll.</em>
          </h1>
          <p>
            Wir nehmen Projekte von Unternehmen und Privatpersonen an. Eine kurze, klare Beschreibung
            reicht für den ersten Schritt.
          </p>
        </div>
      </header>

      <section id="anfrage" className="section section--subpage">
        <div className="container contact-layout">
          <aside className="contact-aside">
            <Eyebrow>Direkter Kontakt</Eyebrow>
            <a className="contact-email" href="mailto:norman@sdxsolutions.de">
              norman@sdxsolutions.de
            </a>
            <p>
              SDX Solutions UG (haftungsbeschränkt)
              <br />
              Hauptstraße 12 1/2
              <br />
              84416 Taufkirchen (Vils)
            </p>
            <div className="contact-topic-list">
              <span>Websites</span>
              <span>Mobile Apps</span>
              <span>Tools & Automatisierung</span>
              <span>Webservices</span>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
