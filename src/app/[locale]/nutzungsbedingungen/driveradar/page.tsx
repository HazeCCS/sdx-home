import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLegalDocument, type AppLegalSection } from "@/components/legal/AppLegalDocument";
import { LegalNotice } from "@/components/legal/LegalNotice";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";

const sections: AppLegalSection[] = [
  {
    id: "anbieter",
    title: "1. Anbieter und Geltungsbereich",
    paragraphs: [
      "DriveRadar wird von der SDX Solutions UG (haftungsbeschränkt), Hauptstraße 12 1/2, 84416 Taufkirchen (Vils), Deutschland, vertreten durch den Geschäftsführer Norman Tarayan, angeboten. Kontakt: contact@sdxsolutions.de. Diese Bedingungen beschreiben die Nutzung der DriveRadar-iOS-App und des optionalen DriveRadar+-Abonnements. Für den Bezug der App und In-App-Käufe gelten zusätzlich die Bedingungen von Apple. Zwingende gesetzliche Verbraucherrechte bleiben unberührt.",
    ],
    links: [{ label: "Impressum", href: "/de/impressum" }],
  },
  {
    id: "funktionen",
    title: "2. Free und DriveRadar+",
    paragraphs: [
      "DriveRadar Free bietet insbesondere Tankstellensuche, Favoriten, manuelle Tankerfassung und Fahrzeugstatistiken. DriveRadar+ schaltet die in der App vor dem Kauf ausgewiesenen Zusatzfunktionen frei, derzeit einen größeren Suchradius, intelligente Routenplanung, Belegscanner, Preisprognose und Satellitenansicht. Der konkrete Funktionsumfang wird in der App beim Abo-Angebot angezeigt. Funktionen mit dem Hinweis „Coming Soon“, insbesondere Glide, sind nicht Bestandteil einer gegenwärtig verfügbaren Plus-Leistung.",
      "Tankstellen- und Preisdaten sind derzeit auf Deutschland ausgerichtet. Für einzelne Orte, Kraftstoffarten oder Routen können Daten fehlen. Ein Abonnement verspricht keine bestimmte Zahl an Tankstellen, eine flächendeckende Routenabdeckung oder eine dauerhafte Verfügbarkeit eines externen Datenanbieters. Wesentliche Änderungen der bezahlten Leistungen werden wir nach den gesetzlichen und App-Store-Vorgaben behandeln.",
    ],
  },
  {
    id: "preise",
    title: "3. Preise, Prognosen und Fahrtentscheidungen",
    paragraphs: [
      "DriveRadar zeigt Preise und Öffnungsangaben externer Datenquellen beziehungsweise gespeicherte Preisbeobachtungen an. Solche Angaben können verspätet, unvollständig oder fehlerhaft sein und sich zwischen Anzeige und Ankunft ändern. Der an der Tankstelle ausgewiesene Preis ist maßgeblich. Die App kennzeichnet verfügbare Zeitpunkte und Datenlücken; Preisprognosen sind statistische Schätzungen und keine Zusage für einen künftigen Preis oder eine Ersparnis.",
      "Routenvorschläge dienen der Planung. Ob eine Tankstelle erreichbar, geöffnet und für das Fahrzeug geeignet ist, muss vor Ort geprüft werden. Verwenden Sie die App nur, wenn dies verkehrssicher ist. Verkehrsregeln, Beschilderung und eigene Wahrnehmung haben Vorrang. DriveRadar ersetzt weder ein Navigationsgerät noch eine verbindliche Verkehrs- oder Sicherheitsempfehlung.",
    ],
  },
  {
    id: "abo",
    title: "4. Abonnement, Zahlung und Verlängerung",
    paragraphs: [
      "DriveRadar+ wird über Apple als automatisch verlängerndes Monatsabonnement für 2,99 € pro Monat oder Jahresabonnement für 24,99 € pro Jahr angeboten. Diese Preise gelten für Deutschland; der für Ihren Apple-Account im Kaufdialog angezeigte Gesamtpreis ist maßgeblich. Berechtigte Apple-Accounts können ein siebentägiges kostenloses Probeabo erhalten, sofern Apple dieses Angebot im Kaufdialog für das gewählte Abo anzeigt. Danach beginnt die Zahlung zum dort ausgewiesenen Verlängerungspreis, sofern nicht rechtzeitig gekündigt wird. Die Zahlung wird von Apple abgewickelt. Nach einem erfolgreichen, verifizierten Kauf sind die Plus-Funktionen während des aktiven Anspruchs auf unterstützten Geräten mit demselben Apple-Account verfügbar. Eine Internetverbindung kann für Kauf, Statusabgleich und Live-Daten erforderlich sein.",
      "Das Abonnement verlängert sich nach den im Apple-Kaufdialog angezeigten Bedingungen, bis es im Apple-Account gekündigt wird. Durch Löschen der App wird das Abo nicht gekündigt. Nach einer Kündigung bleibt der Zugang grundsätzlich bis zum Ende des bereits bezahlten Zeitraums bestehen. Die App bietet „Käufe wiederherstellen“ und „Abo verwalten“. Fragen zu Abbuchungen, Erstattungen und der Apple-Kaufabwicklung können auch direkt an Apple gerichtet werden. Gesetzliche Rechte bleiben unberührt.",
    ],
    links: [{ label: "Apple-Abonnements verwalten", href: "https://apps.apple.com/account/subscriptions" }],
  },
  {
    id: "daten",
    title: "5. Eigene Einträge und Datenschutz",
    paragraphs: [
      "Sie sind für die Richtigkeit selbst eingegebener Fahrzeug- und Tankdaten verantwortlich. Die Belegerkennung kann Werte falsch lesen; prüfen Sie Angaben vor dem Speichern. Persönliche Tank- und Fahrzeugdaten werden derzeit lokal auf Ihrem Gerät gespeichert und nicht über ein DriveRadar-Konto synchronisiert. Löschen der App oder Verlust des Geräts kann diese Daten entfernen; ein etwaiges iOS-Backup richtet sich nach Ihren Geräteeinstellungen. Informationen zu Standort, Belegscanner, Dienstleistern und Ihren Rechten stehen in der DriveRadar-Datenschutzerklärung.",
    ],
    links: [{ label: "Datenschutz in der DriveRadar-App", href: "/de/datenschutz/driveradar" }],
  },
  {
    id: "verfuegbarkeit",
    title: "6. Verfügbarkeit und Haftung",
    paragraphs: [
      "Wir bemühen uns um einen sicheren und funktionierenden Betrieb. Wartung, Netzausfälle, Störungen bei Apple, Karten- oder Preisdatenanbietern und technische Fehler können die Nutzung zeitweise einschränken. Für die sachliche Richtigkeit externer Live-Daten oder das Eintreten einer Prognose geben wir keine Garantie. Dies schränkt gesetzliche Gewährleistungs- und Haftungsrechte nicht ein. Für Vorsatz und grobe Fahrlässigkeit, Schäden aus der Verletzung von Leben, Körper oder Gesundheit sowie sonstige Fälle zwingender gesetzlicher Haftung gelten die gesetzlichen Regeln.",
      "Sollten bezahlte Funktionen erheblich und dauerhaft nicht vertragsgemäß bereitgestellt werden, können Ihnen gesetzliche Rechte an digitalen Produkten zustehen. Wenden Sie sich an contact@sdxsolutions.de; die Zahlungsabwicklung über Apple bleibt davon unberührt.",
    ],
  },
  {
    id: "aenderungen",
    title: "7. Änderungen und Kontakt",
    paragraphs: [
      "Wir können diese Hinweise bei Änderungen der App, der Anbieter oder der Rechtslage aktualisieren. Änderungen eines bestehenden Abonnements erfolgen nur im Rahmen des geltenden Rechts und der App-Store-Regeln; wesentliche Änderungen werden angemessen mitgeteilt. Für Fragen zur App und zum Abo schreiben Sie an contact@sdxsolutions.de. Es gilt deutsches Recht, soweit dadurch zwingende Verbraucherschutzregeln des Landes Ihres gewöhnlichen Aufenthalts nicht entzogen werden.",
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "driveRadarTerms");
}

export default async function DriveRadarTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale !== "de") {
    return <LegalNotice title="DriveRadar terms of use" body="This legal document is currently available in German. The German version describes use of the DriveRadar app and its optional subscription." viewGermanLabel="View German version" germanHref={href("de", "driveRadarTerms")} />;
  }
  return <AppLegalDocument title="Nutzungs- und Abonnementbedingungen für DriveRadar" intro="Hinweise zu den Funktionen, Daten, Preisen und dem optionalen DriveRadar+-Abonnement." updated="Stand: 14. Oktober 2026" sections={sections} />;
}
