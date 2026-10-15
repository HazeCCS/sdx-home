import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createPageMetadata(locale, "driveRadar") : {};
}

const copy = {
  de: {
    kicker: "DriveRadar · Für iPhone",
    title: <>Tankpreise sehen.<br /><em>Besser entscheiden.</em></>,
    intro: "DriveRadar bringt Tankstellen, aktuelle Preise und deine nächste Fahrt auf eine übersichtliche Karte. Suche nach einem Ort oder schau dich in deiner Nähe um — mit DriveRadar+ auch mit Prognose und Routenplanung.",
    explore: "Funktionen entdecken",
    plans: "Free & Plus vergleichen",
    screenshot: "Echte DriveRadar+ App-Ansicht mit einer Suche nach München und Tankstellen auf der Karte",
    screenshotNote: "App-Ansicht: Ortssuche München · DriveRadar+ · Preise können sich ändern",
    section1Eyebrow: "Ein Blick genügt",
    section1Title: <>Die passende Tankstelle <em>auf deiner Karte.</em></>,
    section1Intro: "Wähle deinen Kraftstoff und sieh verfügbare Stationen mit ihren gemeldeten Preisen. Tippe auf eine Station für weitere Details und öffne die Navigation, wenn du losfahren möchtest.",
    steps: [
      { n: "01", title: "Ort oder Standort", text: "Suche nach einer Stadt wie München oder nutze deinen aktuellen Standort als Ausgangspunkt." },
      { n: "02", title: "Preise vergleichen", text: "Sieh Stationen und gemeldete Preise für Diesel, E5 oder E10 direkt auf der Karte." },
      { n: "03", title: "Weiterfahren", text: "Merke dir interessante Stationen und starte die Navigation zur gewählten Tankstelle." },
    ],
    plusEyebrow: "DriveRadar+",
    plusTitle: <>Mehr Kontext für <em>deine Fahrt.</em></>,
    plusIntro: "Mit Plus wird aus der Kartenansicht ein Planungswerkzeug: größerer Suchradius, Routenplanung, Belegscanner und eine datenbasierte Preisprognose, sofern genügend Verlauf vorliegt.",
    plusFeatures: [
      { title: "Bis zu 25 km Umkreis", text: "Entdecke mehr Stationen rund um deinen Standort oder gesuchten Ort." },
      { title: "Route planen", text: "Finde passende Tankstellen entlang einer berechneten Fahrtstrecke." },
      { title: "Preisprognose", text: "Historische Preise können einen Hinweis auf mögliche Veränderungen geben. Eine Vorhersage ist keine Preisgarantie." },
      { title: "Belege & Satellitenkarte", text: "Erfasse Tankbelege und wechsle bei Bedarf in die Satellitenansicht." },
    ],
    planEyebrow: "Zwei Wege, eine Karte",
    planTitle: <>Starte kostenlos. <em>Plane mit Plus.</em></>,
    free: "DriveRadar Free",
    freePrice: "Kostenlos",
    freeFeatures: ["Tankstellenpreise auf der Karte", "5 km um deinen Standort", "3 km bei der Ortssuche", "Suche und Aktualisierung höchstens einmal pro Minute", "Favoriten und Navigation"],
    plus: "DriveRadar+",
    plusPrice: "2,99 € / Monat",
    plusAlternative: "oder 24,99 € / Jahr",
    plusPlanFeatures: ["Bis zu 25 km sichtbarer Umkreis", "Routenplanung und Preisprognose", "Belegscanner und Satellitenkarte", "7 Tage kostenlos testen, sofern für die Apple-ID verfügbar"],
    planNote: "Geplante Apple-Abos. Abonnements verlängern sich automatisch, bis sie mindestens 24 Stunden vor Ablauf in den Apple-Einstellungen gekündigt werden. Die Verfügbarkeit der Probezeit bestimmt Apple. Der App-Store-Start ist in Vorbereitung.",
    dataEyebrow: "Daten mit Kontext",
    dataTitle: <>Aktuelle Meldungen. <em>Klare Grenzen.</em></>,
    dataText: "Die Tankstellen- und Preisdaten stammen aus der Markttransparenzstelle für Kraftstoffe (MTS-K) über Tankerkönig. Gemeldete Preise können von der Anzeige an der Zapfsäule abweichen oder sich zwischen zwei Aktualisierungen ändern. Prognosen hängen von verfügbaren historischen Daten ab.",
    privacyTitle: "Standort mit Bedacht",
    privacyText: "Für die Abfrage von Tankstellen wird eine Position an unseren Server übermittelt. Dort werden Tankstellen im Umkreis von 25 km verarbeitet. In der kostenlosen Ansicht sind davon nur die Stationen im jeweiligen Free-Radius sichtbar. Details stehen in der Datenschutzerklärung.",
    privacyLink: "Datenschutz für DriveRadar",
    termsLink: "Nutzungs- und Abobedingungen",
    endEyebrow: "Demnächst für iPhone",
    endTitle: <>Dein nächster Tankstopp <em>beginnt hier.</em></>,
    endText: "DriveRadar wird für den App Store vorbereitet. Bis dahin findest du hier alle Funktionen, Pläne und rechtlichen Informationen.",
    contact: "Fragen an SDX Solutions",
  },
  en: {
    kicker: "DriveRadar · For iPhone",
    title: <>See fuel prices.<br /><em>Decide with confidence.</em></>,
    intro: "DriveRadar puts fuel stations, reported prices and your next trip on one clear map. Search a place or explore nearby stations — DriveRadar+ adds forecasts and route planning.",
    explore: "Explore features",
    plans: "Compare Free & Plus",
    screenshot: "Real DriveRadar+ app view showing a Munich search and fuel stations on the map",
    screenshotNote: "App view: Munich search · DriveRadar+ · Prices may change",
    section1Eyebrow: "At a glance",
    section1Title: <>The right station <em>on your map.</em></>,
    section1Intro: "Choose your fuel and view available stations with their reported prices. Tap a station for details and start navigation when you are ready to go.",
    steps: [
      { n: "01", title: "Place or location", text: "Search for a city like Munich or use your current location." },
      { n: "02", title: "Compare prices", text: "See stations and reported diesel, E5 or E10 prices right on the map." },
      { n: "03", title: "Keep moving", text: "Save interesting stations and navigate to your choice." },
    ],
    plusEyebrow: "DriveRadar+",
    plusTitle: <>More context for <em>your trip.</em></>,
    plusIntro: "Plus turns the map into a planning tool: a wider radius, route planning, receipt scanning and data-based price forecasts when enough history is available.",
    plusFeatures: [
      { title: "Up to 25 km", text: "Discover more stations around your location or searched place." },
      { title: "Plan a route", text: "Find suitable stations along a calculated route." },
      { title: "Price forecast", text: "Past prices may suggest possible changes. A forecast never guarantees a price." },
      { title: "Receipts & satellite map", text: "Capture fuel receipts and switch to satellite view when useful." },
    ],
    planEyebrow: "Two ways to explore",
    planTitle: <>Start free. <em>Plan with Plus.</em></>,
    free: "DriveRadar Free",
    freePrice: "Free",
    freeFeatures: ["Fuel prices on the map", "5 km around your location", "3 km for place search", "Search and refresh at most once per minute", "Favourites and navigation"],
    plus: "DriveRadar+",
    plusPrice: "€2.99 / month",
    plusAlternative: "or €24.99 / year",
    plusPlanFeatures: ["Up to 25 km visible radius", "Route planning and price forecasts", "Receipt scanner and satellite map", "7-day free trial if available for your Apple ID"],
    planNote: "Planned Apple subscriptions. They renew automatically unless cancelled in Apple settings at least 24 hours before renewal. Apple determines trial eligibility. The App Store launch is in preparation.",
    dataEyebrow: "Know the source",
    dataTitle: <>Reported prices. <em>Clear limitations.</em></>,
    dataText: "Fuel station and price data originate from Germany’s Market Transparency Unit for Fuels (MTS-K) via Tankerkönig. Reported prices can differ from pump prices or change between updates. Forecasts depend on available history.",
    privacyTitle: "Location used carefully",
    privacyText: "A position is sent to our server to look up stations. Stations within 25 km are processed there. The free view only shows stations within its Free radius. See the privacy policy for details.",
    privacyLink: "DriveRadar privacy policy",
    termsLink: "Terms and subscriptions",
    endEyebrow: "Coming to iPhone",
    endTitle: <>Your next fuel stop <em>starts here.</em></>,
    endText: "DriveRadar is being prepared for the App Store. Explore its features, plans and legal information here in the meantime.",
    contact: "Contact SDX Solutions",
  },
};

export default async function DriveRadarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];

  return <main className="driveradar-page">
    <header className="driveradar-hero">
      <div className="container driveradar-hero-grid">
        <div className="driveradar-hero-copy">
          <span className="driveradar-kicker"><span className="driveradar-kicker-dot" />{t.kicker}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
          <div className="driveradar-actions">
            <a className="button button--primary" href="#funktionen">{t.explore} <span aria-hidden="true">↗</span></a>
            <a className="button driveradar-button-outline" href="#plaene">{t.plans}</a>
          </div>
        </div>
        <figure className="driveradar-visual">
          <div className="driveradar-phone">
            <Image src="/driveradar-muenchen-plus.png" alt={t.screenshot} width={1179} height={2556} priority sizes="(max-width: 900px) 75vw, 390px" />
          </div>
          <figcaption>{t.screenshotNote}</figcaption>
        </figure>
      </div>
    </header>

    <section id="funktionen" className="section driveradar-section">
      <div className="container">
        <div className="driveradar-section-heading"><span className="eyebrow">{t.section1Eyebrow}</span><h2>{t.section1Title}</h2><p>{t.section1Intro}</p></div>
        <div className="driveradar-steps">{t.steps.map(step => <article key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </div>
    </section>

    <section className="section driveradar-plus-section">
      <div className="container driveradar-plus-grid">
        <div className="driveradar-plus-intro"><span className="eyebrow">{t.plusEyebrow}</span><h2>{t.plusTitle}</h2><p>{t.plusIntro}</p></div>
        <div className="driveradar-plus-features">{t.plusFeatures.map((feature, i) => <article key={feature.title}><span>0{i + 1}</span><div><h3>{feature.title}</h3><p>{feature.text}</p></div></article>)}</div>
      </div>
    </section>

    <section id="plaene" className="section driveradar-plans-section">
      <div className="container"><span className="eyebrow">{t.planEyebrow}</span><h2>{t.planTitle}</h2>
        <div className="driveradar-plans">
          <article className="driveradar-plan"><span className="driveradar-plan-name">{t.free}</span><strong>{t.freePrice}</strong><ul>{t.freeFeatures.map(item => <li key={item}>{item}</li>)}</ul></article>
          <article className="driveradar-plan driveradar-plan-plus"><span className="driveradar-plan-name">{t.plus}</span><strong>{t.plusPrice}</strong><span className="driveradar-plan-alt">{t.plusAlternative}</span><ul>{t.plusPlanFeatures.map(item => <li key={item}>{item}</li>)}</ul></article>
        </div>
        <p className="driveradar-plan-note">{t.planNote}</p>
      </div>
    </section>

    <section className="section driveradar-data-section"><div className="container driveradar-data-grid">
      <div><span className="eyebrow">{t.dataEyebrow}</span><h2>{t.dataTitle}</h2><p>{t.dataText}</p><a href="https://creativecommons.tankerkoenig.de/" target="_blank" rel="noopener noreferrer" className="driveradar-source">Tankerkönig · MTS-K · CC BY 4.0 ↗</a></div>
      <aside><h3>{t.privacyTitle}</h3><p>{t.privacyText}</p><Link href={href(locale, "driveRadarPrivacy")}>{t.privacyLink} ↗</Link><Link href={href(locale, "driveRadarTerms")}>{t.termsLink} ↗</Link></aside>
    </div></section>

    <section className="section driveradar-end-section"><div className="container"><span className="eyebrow">{t.endEyebrow}</span><h2>{t.endTitle}</h2><p>{t.endText}</p><Link className="button button--primary" href={href(locale, "contact")}>{t.contact} ↗</Link></div></section>
  </main>;
}
