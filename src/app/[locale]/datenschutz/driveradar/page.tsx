import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLegalDocument, type AppLegalSection } from "@/components/legal/AppLegalDocument";
import { LegalNotice } from "@/components/legal/LegalNotice";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";

const sections: AppLegalSection[] = [
  {
    id: "verantwortlicher",
    title: "1. Verantwortlicher und Kontakt",
    paragraphs: [
      "Verantwortlicher für DriveRadar ist die SDX Solutions UG (haftungsbeschränkt), Hauptstraße 12 1/2, 84416 Taufkirchen (Vils), Deutschland, vertreten durch den Geschäftsführer Norman Tarayan. Datenschutzanfragen können an contact@sdxsolutions.de gerichtet werden.",
    ],
    links: [{ label: "contact@sdxsolutions.de", href: "mailto:contact@sdxsolutions.de" }],
  },
  {
    id: "geltungsbereich",
    title: "2. Geltungsbereich",
    paragraphs: [
      "Diese Erklärung gilt für die DriveRadar-iOS-App und die von ihr verwendeten DriveRadar-Schnittstellen. Die allgemeine Datenschutzerklärung auf sdxsolutions.de beschreibt zusätzlich den Besuch unserer Website. DriveRadar kann ohne eigenes Benutzerkonto verwendet werden. Wir setzen in der App keine Werbe-SDKs und kein anbieterübergreifendes Werbetracking ein.",
    ],
    links: [{ label: "Datenschutz auf der Website", href: "/de/datenschutz" }],
  },
  {
    id: "standort",
    title: "3. Standort, Suche und Routen",
    paragraphs: [
      "Nach Ihrer iOS-Freigabe verwendet DriveRadar Ihren aktuellen Standort, um Tankstellen und Preise in Ihrer Nähe zu suchen. Bei einer Ortssuche wird stattdessen der gewählte Suchort verwendet. Für jede Tankstellenabfrage überträgt die App die Koordinaten dieses Suchmittelpunkts verschlüsselt an unsere Supabase-Edge-Funktion. Diese fragt bei Tankerkönig Tankstellen in einem Umkreis von 25 km ab, auch wenn DriveRadar Free in der App nur die Tankstellen innerhalb von 5 km um den aktuellen Standort beziehungsweise 3 km um einen gesuchten Ort anzeigt. Tankerkönig erhält die Suchkoordinaten, den 25-km-Radius und technisch notwendige Verbindungsdaten unseres Servers. Der Suchmittelpunkt kann bei einer Suche am aktuellen Standort Ihrem genauen Gerätestandort entsprechen. Er wird für die Anfrage verarbeitet, aber nicht als Standortdatensatz in unserer Tankstellen- und Preisdatenbank gespeichert. Dort speichern wir die vom Anbieter zurückgegebenen Tankstellen im 25-km-Umkreis einschließlich ihrer Koordinaten, Stammdaten und Preisbeobachtungen. Diese Datensätze erhalten keine DriveRadar-Nutzerkennung und bilden kein nutzerbezogenes Suchprofil.",
      "Bei der Routenfunktion verarbeitet unsere Schnittstelle angefragte Routenpunkte, um passende Tankstellen aus der Preisdatenbank zu ermitteln. Die Routenpunkte werden nicht als Route in dieser Datenbank gespeichert. Unabhängig von der Preisdatenbank können bei Serveranfragen technische Betriebsprotokolle entstehen; dazu informieren wir in Abschnitt 7.",
      "Für Karten, Adresssuche, Fahrstrecken und die Navigation zu Tankstellen verwendet die App Apple MapKit. Dabei können Suchbegriffe, Standort- und Routeninformationen an Apple übertragen werden. Google Maps wird nur geöffnet, wenn Sie die entsprechende Schaltfläche wählen; dann werden die für die Navigation nötigen Koordinaten an Google übergeben. Die Datenschutzbedingungen dieser Anbieter gelten ergänzend. Ohne Standortfreigabe sind standortabhängige Funktionen nicht verfügbar; Sie können eine Ortssuche verwenden, soweit die App diese anbietet.",
      "Die Verarbeitung zur Bereitstellung der angeforderten Tankstellen-, Such- und Routenfunktionen erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die iOS-Standortfreigabe können Sie jederzeit in den Geräteeinstellungen ändern.",
    ],
    links: [
      { label: "Datenschutz bei Supabase", href: "https://supabase.com/privacy" },
      { label: "Datenschutz bei Apple", href: "https://www.apple.com/legal/privacy/" },
      { label: "Datenschutz bei Google", href: "https://policies.google.com/privacy" },
      { label: "Tankerkönig", href: "https://creativecommons.tankerkoenig.de/" },
    ],
  },
  {
    id: "lokale-daten",
    title: "4. Fahrzeug, Tankhistorie und Belegscanner",
    paragraphs: [
      "Fahrzeugangaben, Favoriten, App-Einstellungen, manuell erfasste Tankvorgänge, daraus berechnete Statistiken und eine lokale Preishistorie werden auf Ihrem Gerät gespeichert. DriveRadar synchronisiert diese persönlichen Angaben derzeit nicht mit einem DriveRadar-Server. Je nach Ihren iOS-Einstellungen können lokale App-Daten Teil eines Geräte-Backups sein.",
      "Wenn Sie den Belegscanner verwenden, verarbeitet die App das Kamerabild mit Apples Vision-Texterkennung auf dem Gerät. Das Belegfoto wird nicht an unseren Server hochgeladen und nach der Auswertung nicht als Foto in der Tankhistorie gespeichert. Die erkannten Werte können Sie prüfen und bearbeiten; erst nach dem Speichern entsteht ein lokaler Tankeintrag. Die Kamera wird nur nach iOS-Freigabe verwendet. Die Bewegungssensoren dienen während des Scans allein dem Hinweis, das Gerät ruhig zu halten.",
      "Diese lokale Verarbeitung dient den von Ihnen gewählten App-Funktionen (Art. 6 Abs. 1 lit. b DSGVO). Einzelne Tankeinträge können Sie in der App löschen. Alle lokalen DriveRadar-Daten entfernen Sie durch Löschen der App; gegebenenfalls vorhandene Geräte-Backups verwalten Sie über iOS beziehungsweise Ihren Backup-Anbieter.",
    ],
  },
  {
    id: "abo",
    title: "5. App-Store-Abonnement",
    paragraphs: [
      "DriveRadar+ wird über Apple In-App-Käufe angeboten. Apple verarbeitet die Zahlungs- und Vertragsdaten nach seinen eigenen Datenschutzregeln. Die App fragt bei Apple den verifizierten Abo-Status ab, damit Plus-Funktionen freigeschaltet oder nach Ende des Anspruchs wieder gesperrt werden. Wir erhalten über diesen App-Prozess keine vollständigen Zahlungsdaten und legen derzeit kein eigenes Abo-Kundenkonto in der DriveRadar-Datenbank an. Käufe und Kündigungen verwalten Sie im Apple-Account.",
      "Die Prüfung des Abo-Anspruchs ist zur Erfüllung des Abonnements erforderlich (Art. 6 Abs. 1 lit. b DSGVO). Für Abrechnungs- und Aufbewahrungspflichten bei Apple gelten dessen Hinweise und die gesetzlichen Vorgaben.",
    ],
    links: [{ label: "Apple Abonnements verwalten", href: "https://apps.apple.com/account/subscriptions" }],
  },
  {
    id: "mitteilungen",
    title: "6. Mitteilungen",
    paragraphs: [
      "Wenn Sie iOS-Mitteilungen erlauben, kann DriveRadar bei einer in der App erkannten Preissenkung eine lokale Benachrichtigung auf Ihrem Gerät auslösen. Dafür ist derzeit kein Push-Token auf unserem Server hinterlegt. Sie können Mitteilungen jederzeit in den iOS-Einstellungen deaktivieren. Die optionale Benachrichtigung erfolgt auf Grundlage Ihrer Freigabe (Art. 6 Abs. 1 lit. a DSGVO); ein Widerruf gilt für die Zukunft.",
    ],
  },
  {
    id: "technik",
    title: "7. Technische Daten, Empfänger und Drittlandübermittlung",
    paragraphs: [
      "Bei Anfragen an unsere Schnittstellen können technisch notwendige Verbindungs- und Betriebsdaten anfallen, insbesondere IP-Adresse, Zeitpunkt, angefragter Endpunkt, Statuscode und Fehlerangaben. Je nach Protokollierung können auch Angaben zur Anfrage erfasst werden. Diese Daten dienen dem sicheren Betrieb, der Fehleranalyse und dem Schutz vor Missbrauch (Art. 6 Abs. 1 lit. f DSGVO). Wir erstellen daraus kein Werbeprofil. Supabase betreibt das DriveRadar-Projekt derzeit in der Region EU West (Irland). Technische Anbieter und Unterauftragnehmer können Daten auch außerhalb des Europäischen Wirtschaftsraums verarbeiten; hierfür gelten die gesetzlichen Anforderungen der Art. 44 ff. DSGVO und die jeweiligen vertraglichen Garantien.",
      "Empfänger sind, soweit für die jeweilige Funktion erforderlich, Supabase, Tankerkönig und Apple sowie Google nur bei bewusstem Öffnen von Google Maps. Tankstellen, aktuelle Preise und Preisbeobachtungen werden in unserer Datenbank für höchstens 90 Tage seit ihrer letzten Erfassung vorgehalten; eine tägliche automatische Bereinigung entfernt ältere Datensätze. Sie enthalten keine DriveRadar-Konto-ID. Für technische Plattformprotokolle von Supabase gelten dessen tarifabhängige Aufbewahrungsfristen. Eine 90-tägige Speicherung dieser Plattformprotokolle ist derzeit nicht eingerichtet.",
    ],
  },
  {
    id: "rechte",
    title: "8. Ihre Rechte und Änderungen",
    paragraphs: [
      "Nach Maßgabe der DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie auf Widerruf einer Einwilligung mit Wirkung für die Zukunft. Schreiben Sie dafür an contact@sdxsolutions.de. Da DriveRadar kein eigenes Benutzerkonto verwendet, können wir lokale Daten auf Ihrem Gerät nicht aus der Ferne einsehen oder löschen. Zur Bearbeitung einer Anfrage können wir eine Identitätsprüfung verlangen.",
      "Sie können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren. Für uns zuständig ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach. Wir aktualisieren diese Erklärung, wenn sich App-Funktionen, Datenflüsse oder Rechtsanforderungen ändern. Neue optionale Zwecke werden dadurch nicht ohne erforderliche Rechtsgrundlage aktiviert.",
    ],
    links: [{ label: "Bayerisches Landesamt für Datenschutzaufsicht", href: "https://www.lda.bayern.de/" }],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "driveRadarPrivacy");
}

export default async function DriveRadarPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale !== "de") {
    return <LegalNotice title="DriveRadar app privacy" body="This legal document is currently available in German. The German version describes how the DriveRadar app processes data." viewGermanLabel="View German version" germanHref={href("de", "driveRadarPrivacy")} />;
  }
  return <AppLegalDocument title="Datenschutz in der DriveRadar-App" intro="Informationen zur Verarbeitung personenbezogener Daten in DriveRadar." updated="Stand: 14. Oktober 2026" sections={sections} />;
}
