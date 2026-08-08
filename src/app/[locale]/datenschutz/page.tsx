import type { Metadata } from "next";
import Link from "next/link";
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
  return createPageMetadata(locale, "privacy");
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  if (locale !== "de") {
    return (
      <LegalNotice
        title={dict.legalNotice.privacyTitle}
        body={dict.legalNotice.body}
        viewGermanLabel={dict.legalNotice.viewGerman}
        germanHref={href("de", "privacy")}
      />
    );
  }

  return (
    <main className="subpage">
      <header className="page-hero page-hero--legal">
        <div className="container page-hero-inner" {...reveal(0)}>
          <h1>Datenschutz</h1>
          <p>
            Informationen zur Verarbeitung personenbezogener Daten auf dieser Website. Für die
            Snusdex-App gilt eine eigene, ergänzende Datenschutzerklärung. Stand: 8. August 2026.
          </p>
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container legal-layout">
          <aside className="legal-toc" aria-label="Inhalt" {...revealFade(0)}>
            <span>Auf dieser Seite</span>
            <a href="#verantwortlicher">Verantwortlicher</a>
            <a href="#snusdex-app">Snusdex-App</a>
            <a href="#hosting">Hosting</a>
            <a href="#kontaktformular">Kontakt</a>
            <a href="#fonts">Google Fonts</a>
            <a href="#cookies">Cookies &amp; Analyse</a>
            <a href="#rechte">Ihre Rechte</a>
          </aside>
          <div className="legal-content">
            <section id="verantwortlicher" className="legal-section" {...reveal(0)}>
              <h2>Verantwortlicher</h2>
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
                Vertreten durch den Geschäftsführer Norman Tarayan
                <br />
                E-Mail: <a href="mailto:contact@sdxsolutions.de">contact@sdxsolutions.de</a>
              </p>
            </section>

            <section id="snusdex-app" className="legal-section" {...reveal(0)}>
              <h2>Datenschutz in der Snusdex-App</h2>
              <p>
                Die Snusdex-App verarbeitet insbesondere Konto-, Profil-, Sammlungs-, Bewertungs-,
                Nutzungs-, Social- und – nur bei Aktivierung – MouTrack- und Push-Daten. Für diese
                Datenverarbeitung, die eingesetzten App-Dienstleister, freiwillige Einwilligungen und
                die Kontolöschung gilt unsere gesonderte App-Datenschutzerklärung.
              </p>
              <p>
                <Link href={href("de", "snusdexPrivacy")}>
                  Datenschutzerklärung für die Snusdex-App öffnen
                </Link>
              </p>
            </section>

            <section id="hosting" className="legal-section" {...reveal(0)}>
              <h2>Hosting über Vercel</h2>
              <p>
                Diese Website wird über Vercel bereitgestellt. Anbieter ist Vercel Inc., 440 N
                Barranca Ave #4133, Covina, CA 91723, USA.
              </p>
              <p>
                Beim Aufruf der Website verarbeitet Vercel technisch erforderliche Verbindungs- und
                Protokolldaten. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
                aufgerufene Datei, Referrer, Browsertyp, Betriebssystem und übertragene Datenmenge
                gehören. Die Verarbeitung ist erforderlich, um die Website sicher, stabil und
                effizient auszuliefern.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im
                sicheren und zuverlässigen Betrieb unseres Internetauftritts. Soweit Daten in die USA
                übermittelt werden, erfolgt dies auf Grundlage der von Vercel eingesetzten Garantien
                für Drittlandübermittlungen, insbesondere der EU-Standardvertragsklauseln. Weitere
                Informationen finden Sie in den{" "}
                <a href="https://vercel.com/legal/privacy-policy" rel="noreferrer">
                  Datenschutzhinweisen von Vercel
                </a>
                .
              </p>
              <p>
                Technische Protokolldaten werden nur so lange gespeichert, wie dies für Betrieb,
                Sicherheit und Fehleranalyse erforderlich ist oder gesetzliche Pflichten bestehen.
                Die konkrete Speicherdauer richtet sich im Übrigen nach den Einstellungen und Vorgaben
                des Hostinganbieters.
              </p>
            </section>

            <section id="kontaktformular" className="legal-section" {...reveal(0)}>
              <h2>Kontaktformular und E-Mail</h2>
              <p>
                Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir
                Ihre Angaben zur Bearbeitung Ihrer Anfrage. Im Formular sind dies Name, E-Mail-Adresse,
                Nachricht sowie – sofern freiwillig angegeben – das Unternehmen. Zusätzlich können
                technisch erforderliche Verbindungsdaten beim Versand verarbeitet werden.
              </p>
              <p>
                Das Formular wird über eine serverseitige Funktion bei Vercel verarbeitet und als
                E-Mail über IONOS SE, Elgendorfer Straße 57, 56410 Montabaur, an uns übermittelt. Eine
                darüber hinausgehende Datenbank oder ein separates Kundenprofil wird durch das Formular
                nicht angelegt.
              </p>
              <p>
                Bezieht sich Ihre Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen, ist Art. 6
                Abs. 1 lit. b DSGVO die Rechtsgrundlage. Bei sonstigen Anfragen erfolgt die
                Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse
                liegt in der sachgerechten Beantwortung Ihrer Nachricht.
              </p>
              <p>
                Wir löschen die Daten, sobald die Anfrage abschließend bearbeitet ist und keine
                gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere
                Speicherung bestehen. Handels- und steuerrechtliche Unterlagen können gesetzlichen
                Aufbewahrungsfristen unterliegen.
              </p>
            </section>

            <section id="fonts" className="legal-section" {...reveal(0)}>
              <h2>Google Fonts</h2>
              <p>
                Wir verwenden Google Fonts, einen Dienst der Google Ireland Limited, Gordon House,
                Barrow Street, Dublin 4, Irland. Die Schriftdateien werden beim Aufruf einer Seite von
                Servern von Google geladen. Dabei wird insbesondere Ihre IP-Adresse zusammen mit
                technischen Browserinformationen an Google übermittelt. Eine Verarbeitung durch Google
                LLC in den USA kann nicht ausgeschlossen werden.
              </p>
              <p>
                Die Einbindung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
                Interesse liegt in einer einheitlichen, gut lesbaren und technisch effizienten
                Darstellung der Website. Weitere Informationen finden Sie in den{" "}
                <a href="https://developers.google.com/fonts/faq/privacy" rel="noreferrer">
                  Datenschutzhinweisen zu Google Fonts
                </a>{" "}
                und der{" "}
                <a href="https://policies.google.com/privacy?hl=de" rel="noreferrer">
                  Datenschutzerklärung von Google
                </a>
                .
              </p>
            </section>

            <section id="cookies" className="legal-section" {...reveal(0)}>
              <h2>Cookies, Analyse und Marketing</h2>
              <p>
                Diese Website setzt zur Speicherung Ihrer Sprachwahl ein technisch notwendiges Cookie
                (Sprachpräferenz) ein. Analyse-, Marketing- oder Trackingdienste werden nicht
                eingesetzt. Insbesondere verwenden wir weder Vercel Web Analytics noch Werbetracker
                und setzen keine nicht technisch erforderlichen Cookies.
              </p>
            </section>

            <section id="empfaenger" className="legal-section" {...reveal(0)}>
              <h2>Empfänger und Datensicherheit</h2>
              <p>
                Personenbezogene Daten erhalten nur die Stellen, die sie für die beschriebenen Zwecke
                benötigen. Hierzu zählen insbesondere unsere Hosting- und E-Mail-Dienstleister.
                Personenbezogene Daten werden nicht für fremde Werbung bereitgestellt und nicht zu
                eigenständigen Zwecken an Dritte überlassen.
              </p>
              <p>
                Die Website wird verschlüsselt über HTTPS übertragen. Wir setzen angemessene technische
                und organisatorische Maßnahmen ein, um Daten vor Verlust, Manipulation und
                unberechtigtem Zugriff zu schützen.
              </p>
            </section>

            <section id="rechte" className="legal-section" {...reveal(0)}>
              <h2>Ihre Rechte</h2>
              <p>
                Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf Auskunft (Art. 15
                DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der
                Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch
                gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO).
              </p>
              <p>
                Zur Ausübung Ihrer Rechte genügt eine Nachricht an{" "}
                <a href="mailto:contact@sdxsolutions.de">contact@sdxsolutions.de</a>. Sie haben außerdem
                das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für uns zuständig
                ist:
              </p>
              <address>
                Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
                <br />
                Promenade 18
                <br />
                91522 Ansbach
                <br />
                <a href="https://www.lda.bayern.de" rel="noreferrer">
                  www.lda.bayern.de
                </a>
              </address>
            </section>

            <p className="legal-note">
              Wir passen diese Datenschutzerklärung an, wenn sich unsere Website, die eingesetzten
              Dienste oder die rechtlichen Anforderungen ändern.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
