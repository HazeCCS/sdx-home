import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Impressum — SDX Solutions UG (haftungsbeschränkt)",
  description: "Impressum und Anbieterkennzeichnung der SDX Solutions UG (haftungsbeschränkt).",
};

export default function ImprintPage() {
  return (
    <main className="subpage">
      <header className="page-hero page-hero--legal">
        <div className="container page-hero-inner">
          <Eyebrow>Rechtliches</Eyebrow>
          <h1>Impressum</h1>
          <p>Anbieterkennzeichnung nach § 5 Digitale-Dienste-Gesetz (DDG).</p>
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container legal-layout">
          <aside className="legal-toc" aria-label="Inhalt">
            <span>Auf dieser Seite</span>
            <a href="#anbieter">Anbieter</a>
            <a href="#register">Registereintrag</a>
            <a href="#kontakt">Kontakt</a>
            <a href="#streitbeilegung">Streitbeilegung</a>
          </aside>
          <div className="legal-content">
            <section id="anbieter" className="legal-section">
              <span className="legal-index">01</span>
              <h2>Anbieter</h2>
              <address>
                SDX Solutions UG (haftungsbeschränkt)
                <br />
                Hauptstraße 12 1/2
                <br />
                84416 Taufkirchen (Vils)
                <br />
                Deutschland
              </address>
              <p>
                Vertreten durch den Geschäftsführer:
                <br />
                <strong>Norman Tarayan</strong>
              </p>
            </section>
            <section id="register" className="legal-section">
              <span className="legal-index">02</span>
              <h2>Registereintrag</h2>
              <p>
                Registergericht: Amtsgericht München
                <br />
                Handelsregister: HRB 314880
              </p>
            </section>
            <section id="kontakt" className="legal-section">
              <span className="legal-index">03</span>
              <h2>Kontakt</h2>
              <p>
                E-Mail: <a href="mailto:norman@sdxsolutions.de">norman@sdxsolutions.de</a>
              </p>
              <p>
                Für Projektanfragen steht außerdem unser{" "}
                <a href="/kontakt#anfrage">Kontaktformular</a> zur Verfügung.
              </p>
            </section>
            <section id="streitbeilegung" className="legal-section">
              <span className="legal-index">04</span>
              <h2>Verbraucherstreitbeilegung</h2>
              <p>
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
