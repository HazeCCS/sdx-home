import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";
import { LegalNotice } from "@/components/legal/LegalNotice";
import { reveal, revealFade } from "@/motion/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "imprint");
}

export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  if (locale !== "de") {
    return (
      <LegalNotice
        title={dict.legalNotice.imprintTitle}
        body={dict.legalNotice.body}
        viewGermanLabel={dict.legalNotice.viewGerman}
        germanHref={href("de", "imprint")}
      />
    );
  }

  return (
    <main className="subpage">
      <header className="page-hero page-hero--legal">
        <div className="container page-hero-inner" {...reveal(0)}>
          <h1>Impressum</h1>
          <p>Anbieterkennzeichnung nach § 5 Digitale-Dienste-Gesetz (DDG).</p>
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container legal-layout">
          <aside className="legal-toc" aria-label="Inhalt" {...revealFade(0)}>
            <span>Auf dieser Seite</span>
            <a href="#anbieter">Anbieter</a>
            <a href="#register">Registereintrag</a>
            <a href="#kontakt">Kontakt</a>
            <a href="#streitbeilegung">Streitbeilegung</a>
          </aside>
          <div className="legal-content">
            <section id="anbieter" className="legal-section" {...reveal(0)}>
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
            <section id="register" className="legal-section" {...reveal(0)}>
              <h2>Registereintrag</h2>
              <p>
                Registergericht: Amtsgericht München
                <br />
                Handelsregister: HRB 314880
              </p>
            </section>
            <section id="kontakt" className="legal-section" {...reveal(0)}>
              <h2>Kontakt</h2>
              <p>
                E-Mail: <a href="mailto:contact@sdxsolutions.de">contact@sdxsolutions.de</a>
              </p>
              <p>
                Für Projektanfragen steht außerdem unser{" "}
                <a href={href("de", "contact", "anfrage")}>Kontaktformular</a> zur Verfügung.
              </p>
            </section>
            <section id="streitbeilegung" className="legal-section" {...reveal(0)}>
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
