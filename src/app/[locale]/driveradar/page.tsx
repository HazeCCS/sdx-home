import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";
import { driveRadarAppStoreId, driveRadarAppStoreUrl, siteUrl } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#080d0b",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const base = createPageMetadata(locale, "driveRadar");
  return {
    ...base,
    itunes: { appId: driveRadarAppStoreId },
    openGraph: {
      ...base.openGraph,
      title: base.title ?? undefined,
      description: base.description ?? undefined,
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
      images: [{ url: "/driveradar/store-1.webp", width: 600, height: 1334, alt: copy[locale].galleryTitles[0] }],
    },
  };
}

const copy = {
  de: {
    kicker: "DriveRadar · Für iPhone",
    title: <>Tankpreise in deiner Nähe.<br /><em>Kostenlos vergleichen.</em></>,
    intro: "Vergleiche gemeldete Preise für E5, E10 und Diesel auf der Karte. Suche nach einem Ort oder nutze deinen Standort und öffne die Navigation zur passenden Tankstelle.",
    download: "Kostenlos im App Store laden",
    availability: "Für iPhone · Tankstellen in Deutschland",
    gallery: "DriveRadar in der App",
    galleryTitles: ["Tankstellenkarte und Preisprognose", "Tankstopps entlang der Route", "Tankstellendetails mit Kraftstoffpreisen"],
    plans: "Free & Plus vergleichen",
    screenshot: "Echte DriveRadar+ App-Ansicht mit einer Suche nach München und Tankstellen auf der Karte",
    screenshotNote: "App-Ansicht: Ortssuche München · DriveRadar+ · Preise können sich ändern",
    section1Eyebrow: "Ein Blick genügt",
    section1Title: <>Die passende Tankstelle <em>auf deiner Karte.</em></>,
    section1Intro: "Wähle deinen Kraftstoff und sieh verfügbare Stationen mit ihren gemeldeten Preisen. Tippe auf eine Station für weitere Details und öffne die Navigation, wenn du losfahren möchtest.",
    steps: [
      { title: "Ort oder Standort", text: "Suche nach einer Stadt wie München oder nutze deinen aktuellen Standort als Ausgangspunkt." },
      { title: "Preise vergleichen", text: "Sieh Stationen und gemeldete Preise für Diesel, E5 oder E10 direkt auf der Karte." },
      { title: "Weiterfahren", text: "Merke dir interessante Stationen und starte die Navigation zur gewählten Tankstelle." },
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
    freeFeatures: ["Tankstellenpreise auf der Karte", "5 km um deinen Standort", "3 km bei der Ortssuche", "Suche und Aktualisierung höchstens einmal pro Minute", "Favoriten und Navigation", "Manuelle Tankerfassung und Tankstatistiken"],
    plus: "DriveRadar+",
    plusPrice: "24,99 € / Jahr",
    plusAlternative: "oder 2,99 € / Monat",
    plusPlanFeatures: ["Bis zu 25 km sichtbarer Umkreis", "Routenplanung und Preisprognose", "Belegscanner und Satellitenkarte"],
    planNote: "Preise im deutschen App Store. Maßgeblich ist der Preis vor dem Kauf in der App. Abos verlängern sich automatisch, sofern du sie mindestens 24 Stunden vor Ablauf über deinen Apple-Account kündigst.",
    dataEyebrow: "Daten mit Kontext",
    dataTitle: <>Aktuelle Meldungen. <em>Klare Grenzen.</em></>,
    dataText: "Die Tankstellen- und Preisdaten stammen aus der Markttransparenzstelle für Kraftstoffe (MTS-K) über Tankerkönig. Gemeldete Preise können von der Anzeige an der Zapfsäule abweichen oder sich zwischen zwei Aktualisierungen ändern. Prognosen hängen von verfügbaren historischen Daten ab.",
    privacyTitle: "Standort mit Bedacht",
    privacyText: "Für die Abfrage von Tankstellen wird eine Position an unseren Server übermittelt. Dort werden Tankstellen im Umkreis von 25 km verarbeitet. In der kostenlosen Ansicht sind davon nur die Stationen im jeweiligen Free-Radius sichtbar. Details stehen in der Datenschutzerklärung.",
    privacyLink: "Datenschutz für DriveRadar",
    termsLink: "Nutzungs- und Abobedingungen",
    endEyebrow: "Für iPhone verfügbar",
    endTitle: <>Dein nächster Tankstopp <em>beginnt hier.</em></>,
    endText: "Lade DriveRadar kostenlos und vergleiche Tankpreise in deiner Nähe.",
    contact: "Fragen an SDX Solutions",
  },
  en: {
    kicker: "DriveRadar · For iPhone",
    title: <>Fuel prices near you.<br /><em>Compare for free.</em></>,
    intro: "Compare reported prices for E5, E10 and diesel on the map. Search for a place or use your location, then open directions to the station you choose.",
    download: "Download free on the App Store",
    availability: "For iPhone · Fuel stations in Germany",
    gallery: "See DriveRadar in action",
    galleryTitles: ["Fuel station map and price forecast", "Fuel stops along a route", "Station details and fuel prices"],
    plans: "Compare Free & Plus",
    screenshot: "Real DriveRadar+ app view showing a Munich search and fuel stations on the map",
    screenshotNote: "App view: Munich search · DriveRadar+ · Prices may change",
    section1Eyebrow: "At a glance",
    section1Title: <>The right station <em>on your map.</em></>,
    section1Intro: "Choose your fuel and view available stations with their reported prices. Tap a station for details and start navigation when you are ready to go.",
    steps: [
      { title: "Place or location", text: "Search for a city like Munich or use your current location." },
      { title: "Compare prices", text: "See stations and reported diesel, E5 or E10 prices right on the map." },
      { title: "Keep moving", text: "Save interesting stations and navigate to your choice." },
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
    freeFeatures: ["Fuel prices on the map", "5 km around your location", "3 km for place search", "Search and refresh at most once per minute", "Favourites and navigation", "Manual fill-up logging and fuel statistics"],
    plus: "DriveRadar+",
    plusPrice: "€24.99 / year",
    plusAlternative: "or €2.99 / month",
    plusPlanFeatures: ["Up to 25 km visible radius", "Route planning and price forecasts", "Receipt scanner and satellite map"],
    planNote: "Prices for the German App Store. The price shown in the app before purchase applies. Subscriptions renew automatically unless cancelled in your Apple Account at least 24 hours before the end of the current period.",
    dataEyebrow: "Know the source",
    dataTitle: <>Reported prices. <em>Clear limitations.</em></>,
    dataText: "Fuel station and price data originate from Germany’s Market Transparency Unit for Fuels (MTS-K) via Tankerkönig. Reported prices can differ from pump prices or change between updates. Forecasts depend on available history.",
    privacyTitle: "Location used carefully",
    privacyText: "A position is sent to our server to look up stations. Stations within 25 km are processed there. The free view only shows stations within its Free radius. See the privacy policy for details.",
    privacyLink: "DriveRadar privacy policy",
    termsLink: "Terms and subscriptions",
    endEyebrow: "Available for iPhone",
    endTitle: <>Your next fuel stop <em>starts here.</em></>,
    endText: "Download DriveRadar free and compare fuel prices near you.",
    contact: "Contact SDX Solutions",
  },
};

export default async function DriveRadarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DriveRadar",
    description: t.intro,
    applicationCategory: "NavigationApplication",
    operatingSystem: "iOS",
    url: `${siteUrl}${href(locale, "driveRadar")}`,
    downloadUrl: driveRadarAppStoreUrl,
    inLanguage: locale,
    screenshot: `${siteUrl}/driveradar/map.webp`,
    offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
  };

  return <main className="driveradar-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <header className="driveradar-hero">
      <div className="container driveradar-hero-grid">
        <div className="driveradar-hero-copy">
          <span className="driveradar-kicker"><span className="driveradar-kicker-dot" />{t.kicker}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
          <div className="driveradar-actions">
            <a className="button button--primary" href={driveRadarAppStoreUrl}>{t.download}</a>
            <a className="button driveradar-button-outline" href="#plaene">{t.plans}</a>
          </div>
          <p className="driveradar-availability">{t.availability}</p>
        </div>
        <figure className="driveradar-visual">
          <div className="driveradar-phone">
            <Image src="/driveradar/map.webp" alt={t.screenshot} width={850} height={1848} priority sizes="(max-width: 900px) 75vw, 390px" />
          </div>
          <figcaption>{t.screenshotNote}</figcaption>
        </figure>
      </div>
    </header>

    <section id="funktionen" className="section driveradar-section">
      <div className="container">
        <div className="driveradar-section-heading"><span className="eyebrow">{t.section1Eyebrow}</span><h2>{t.section1Title}</h2><p>{t.section1Intro}</p></div>
        <div className="driveradar-steps">{t.steps.map(step => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </div>
    </section>

    <section className="section driveradar-gallery" aria-labelledby="driveradar-gallery-title">
      <div className="container">
        <h2 id="driveradar-gallery-title">{t.gallery}</h2>
        <div className="driveradar-gallery-grid">
          {t.galleryTitles.map((title, index) => <figure key={title}>
            <Image src={`/driveradar/store-${index + 1}.webp`} alt={title} width={600} height={1334}
              sizes="(max-width: 620px) 72vw, (max-width: 900px) 28vw, 300px" />
            <figcaption>{title}</figcaption>
          </figure>)}
        </div>
      </div>
    </section>

    <section className="section driveradar-plus-section">
      <div className="container driveradar-plus-grid">
        <div className="driveradar-plus-intro"><span className="eyebrow">{t.plusEyebrow}</span><h2>{t.plusTitle}</h2><p>{t.plusIntro}</p></div>
        <div className="driveradar-plus-features">{t.plusFeatures.map(feature => <article key={feature.title}><div><h3>{feature.title}</h3><p>{feature.text}</p></div></article>)}</div>
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

    <section className="section driveradar-end-section"><div className="container"><span className="eyebrow">{t.endEyebrow}</span><h2>{t.endTitle}</h2><p>{t.endText}</p><div className="driveradar-actions"><a className="button button--primary" href={driveRadarAppStoreUrl}>{t.download}</a><Link className="button driveradar-button-outline" href={href(locale, "contact")}>{t.contact}</Link></div></div></section>
  </main>;
}
