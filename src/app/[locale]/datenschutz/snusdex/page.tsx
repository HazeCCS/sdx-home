import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { reveal, revealFade } from "@/motion/reveal";

type Group = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  groups?: Group[];
  links?: { label: string; href: string }[];
};

type PrivacyCopy = {
  title: string;
  intro: string;
  updated: string;
  tocLabel: string;
  sections: Section[];
  closingNote: string;
};

const copies: Record<Locale, PrivacyCopy> = {
  de: {
    title: "Datenschutz in der Snusdex-App",
    intro:
      "Diese Datenschutzerklärung beschreibt, wie die Snusdex-App und die zugehörigen Backend-Dienste personenbezogene Daten verarbeiten.",
    updated: "Version 1.0 · Stand: 8. August 2026",
    tocLabel: "Auf dieser Seite",
    sections: [
      {
        id: "verantwortlicher",
        title: "1. Verantwortlicher und Kontakt",
        paragraphs: [
          "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist die SDX Solutions UG (haftungsbeschränkt), Hauptstraße 12 1/2, 84416 Taufkirchen (Vils), Deutschland, vertreten durch den Geschäftsführer Norman Tarayan.",
          "Datenschutzanfragen können mit dem Betreff „Datenschutzanfrage Snusdex“ an contact@sdxsolutions.de gesendet werden.",
        ],
        links: [{ label: "contact@sdxsolutions.de", href: "mailto:contact@sdxsolutions.de" }],
      },
      {
        id: "geltungsbereich",
        title: "2. Geltungsbereich und Kurzüberblick",
        paragraphs: [
          "Diese Erklärung gilt für die native Snusdex-iOS-App, die zugehörigen Schnittstellen, Datenbanken, Cloud-Funktionen und Speicherbereiche sowie Support-, Moderations-, Einwilligungs- und Kontolöschprozesse.",
          "Snusdex ist ein Informations-, Sammlungs-, Bewertungs-, Statistik- und Community-Angebot für tabakfreie Nikotinbeutel. Die App verkauft selbst keine Nikotinprodukte und richtet sich ausschließlich an volljährige Nutzer.",
          "Wir setzen in der App keine Werbe-SDKs ein und betreiben kein anbieterübergreifendes Werbetracking. Direkte Kennungen wie E-Mail-Adresse, Benutzername, Konto-ID, Authentifizierungs- oder Push-Token sowie MouTrack-Positionen werden nicht für Auswertungen mit externen Geschäftspartnern verwendet oder an diese offengelegt.",
        ],
      },
      {
        id: "datenkategorien",
        title: "3. Welche Daten wir verarbeiten",
        groups: [
          {
            title: "Konto und Authentifizierung",
            items: [
              "interne Nutzer-ID, E-Mail-Adresse, Bestätigungsstatus und Anmeldeanbieter",
              "verschlüsselt beziehungsweise gehasht verarbeitete Authentifizierungsdaten",
              "Session-, Access- und Refresh-Token sowie Registrierungs- und Anmeldezeitpunkte",
              "bei Apple-Anmeldung gegebenenfalls Name und von Apple bereitgestellte Relay-E-Mail-Adresse",
            ],
          },
          {
            title: "Alter, Profil und Darstellung",
            items: [
              "Geburtsdatum und daraus abgeleiteter Volljährigkeitsstatus",
              "Benutzername, optionales Profilbild, Profil- und Creator-Angaben",
              "XP, Level, Streaks, Badges, Collector-Card-Darstellung und Creator-Code-Einlösungen",
              "Sprache, Design, Haptik, Tracking-Modus und weitere App-Einstellungen",
            ],
          },
          {
            title: "Sammlung, Bewertungen und Nutzung",
            items: [
              "gescannte oder ausgewählte Produkte, Barcodes, Sammlungszeitpunkte und Favoriten",
              "Bewertungen zu Geschmack, Geruch, Bite, Drip, Aussehen und Stärke sowie gegebenenfalls Freitexte",
              "geöffnete und beendete Dosen, entnommene Pouches, Zeitpunkte und produktbezogene Nikotinwerte",
              "daraus berechnete Tages-, Wochen- und Monatsstatistiken, Streaks, Badges und Trends",
              "Produktvorschläge und damit verbundene Angaben",
            ],
          },
          {
            title: "Social- und Community-Daten",
            items: [
              "Follow-Anfragen und Verbindungen, Blockierungen und sichtbare Profildaten",
              "für bestätigte Verbindungen freigegebene Sammlungseinträge",
              "Community-Durchschnittswerte, Rankings und Creator-Inhalte",
            ],
          },
          {
            title: "MouTrack",
            paragraphs: [
              "Wenn MouTrack ausdrücklich aktiviert wird, speichern wir die gewählte Mundposition, Datum, Nutzungsanzahl, Korrekturen und die daraus vorgeschlagene nächste Position. MouTrack-Daten werden strikt von Markt-, Trend- und B2B-Auswertungen ausgeschlossen und nicht an Hersteller, Händler oder Datenpartner weitergegeben.",
            ],
          },
          {
            title: "Push-Mitteilungen",
            items: [
              "APNs-Gerätetoken, Installations-ID, Bundle-ID und technische Umgebung",
              "App-Sprache und gewählte Benachrichtigungseinstellungen",
              "technische Zustellinformationen zu Social- und Bestandsbenachrichtigungen",
            ],
          },
          {
            title: "Lokale und technische Daten",
            paragraphs: [
              "Anmeldesitzungen werden im iOS-Schlüsselbund gespeichert. Einstellungen, Favoriten und Einwilligungsstatus können lokal in UserDefaults liegen. Geschützte App-Caches enthalten Katalog-, Profil-, Sammlungs-, Nutzungs- und Social-Daten und werden je nach Inhalt nach 7 bis 30 Tagen als veraltet behandelt. Profilbilder können bis zum Upload vorübergehend lokal gespeichert werden.",
              "Bei App-, API-, Bild- und Authentifizierungsaufrufen fallen technisch insbesondere IP-Adresse, Zeitpunkt, angefragter Endpunkt oder Inhalt, Geräte- und App-Version, Statuscode und Fehlerdaten bei den jeweiligen Anbietern an.",
            ],
          },
          {
            title: "Grobe Region bei Bewertungen",
            paragraphs: [
              "Für regionale Bewertungsstatistiken kann aus der bei einem Aufruf anfallenden IP-Adresse über ip-api.com eine grobe Angabe wie Land, Region, Stadt und Zeitzone abgeleitet und am Bewertungseintrag gespeichert werden. Eine genaue GPS-Position wird nicht abgefragt.",
            ],
          },
        ],
      },
      {
        id: "zwecke",
        title: "4. Zwecke und Rechtsgrundlagen",
        groups: [
          {
            title: "Konto und Kernfunktionen",
            paragraphs: [
              "Wir verarbeiten die erforderlichen Konto-, Profil-, Sammlungs-, Bewertungs-, Nutzungs- und Social-Daten, um das Nutzerkonto und die aktiv gewählten App-Funktionen bereitzustellen, Inhalte geräteübergreifend zu synchronisieren und Support sowie Kontolöschung zu ermöglichen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.",
            ],
          },
          {
            title: "Jugendschutz",
            paragraphs: [
              "Geburtsdatum und Volljährigkeitsstatus werden verarbeitet, um den Zugang auf Erwachsene zu begrenzen. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b, c und f DSGVO, abhängig von der konkreten Anforderung.",
            ],
          },
          {
            title: "Sicherheit und Missbrauchsabwehr",
            paragraphs: [
              "Technische Protokolle und Sicherheitssignale dienen dem Schutz von Konten und Systemen, der Fehleranalyse sowie der Verhinderung von Spam, Manipulation und Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist ein sicherer und zuverlässiger App-Betrieb.",
            ],
          },
          {
            title: "Freiwillige Funktionen und Einwilligungen",
            paragraphs: [
              "Die Analyse geeigneter App-Daten zur Erstellung und Nutzung aggregierter, anonymisierter Produkt-, Markt- und Trendauswertungen wird als ein freiwilliger Zweck aktiviert. Diese Auswertungen können intern für Snusdex und mit ausgewählten externen Geschäftspartnern genutzt werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO und, soweit Konsumdaten im Einzelfall einen Gesundheitsbezug erkennen lassen, vorsorglich Art. 9 Abs. 2 lit. a DSGVO. Die Einwilligung kann jederzeit mit Wirkung für die Zukunft in der App widerrufen werden.",
              "MouTrack und Push-Mitteilungen werden aufgrund ihrer jeweils eigenständigen Funktion separat aktiviert und können unabhängig von der Analyse deaktiviert werden.",
              "Technisch notwendige lokale Speicherung und Gerätezugriffe stützen wir ergänzend auf § 25 Abs. 2 TDDDG; nicht notwendige Zugriffe erfolgen nur nach Einwilligung gemäß § 25 Abs. 1 TDDDG.",
            ],
          },
        ],
      },
      {
        id: "analyse",
        title: "5. Optionale Analyse und Nutzung aggregierter Erkenntnisse",
        paragraphs: [
          "Wenn der Nutzer freiwillig einwilligt, dürfen geeignete Bewertungs-, Scan-, Sammlungs- und Konsummusterdaten innerhalb von Snusdex verbunden werden, um aggregierte Produkt-, Markt- und Trendauswertungen zu erstellen. Dieser Analysezweck umfasst die interne Nutzung zur Produktverbesserung und für Empfehlungen sowie die nachfolgend beschriebene Nutzung anonymisierter Erkenntnisse mit ausgewählten externen Geschäftspartnern. MouTrack ist davon immer ausgeschlossen.",
          "Daten vieler volljähriger Nutzer dürfen hierzu zusammengeführt und nach einer Prüfung auf Re-Identifikationsrisiken anonymisiert werden. SDX Solutions kann die daraus erzeugten aggregierten Dashboards, Reports und Trends Herstellern, Marken, Händlern oder Marktforschungsunternehmen für deren Markt- und Produktanalyse bereitstellen. Dies kann im Rahmen einer entgeltlichen geschäftlichen Zusammenarbeit erfolgen.",
          "Solche Ausgaben dürfen keine E-Mail-Adressen, Benutzernamen, Konto-IDs, exakten Geburtsdaten, rohen IP-Adressen, Authentifizierungs- oder Push-Token, rohe Freitexte, Blockierungsdaten oder MouTrack-Positionen enthalten. Kleine Gruppen und seltene Merkmalskombinationen müssen unterdrückt oder vergröbert werden.",
          "Nach einem Widerruf werden die personenbezogenen Ausgangsdaten nicht mehr für neue optionale Analysen oder Reports verwendet. Bereits wirksam und irreversibel anonymisierte Gruppenwerte lassen sich keiner Person mehr zuordnen und können deshalb nicht individuell gelöscht werden.",
        ],
      },
      {
        id: "berechtigungen",
        title: "6. Geräteberechtigungen und lokale Speicherung",
        paragraphs: [
          "Die Kamera wird nur nach iOS-Freigabe zur Barcode-Erkennung verwendet. Kamerabilder werden dabei nicht als Foto an Snusdex hochgeladen. Die Fotoauswahl wird nur geöffnet, wenn ein Profilbild gewählt wird. Push-Mitteilungen werden nur nach einer gesonderten iOS-Freigabe versendet.",
          "Favoriten, Darstellungs- und Haptikeinstellungen sowie bestimmte technische Zustände verbleiben lokal auf dem Gerät. Leistungsdiagnosen werden durch iOS MetricKit bereitgestellt und von Snusdex derzeit nur lokal protokolliert; ein eigenes externes Analyse-SDK ist nicht eingebunden.",
        ],
      },
      {
        id: "empfaenger",
        title: "7. Dienstleister und Empfänger",
        groups: [
          {
            title: "Supabase",
            paragraphs: [
              "Supabase wird für Authentifizierung, Datenbank, Dateispeicher und Cloud-Funktionen eingesetzt. Das Snusdex-Projekt ist derzeit in der Region EU West (Irland) angelegt. Supabase verarbeitet je nach Funktion Konto-, Profil-, Sammlungs-, Bewertungs-, Nutzungs-, Social-, Einwilligungs-, Push- und MouTrack-Daten als technischer Dienstleister.",
            ],
          },
          {
            title: "Apple und Google",
            paragraphs: [
              "Apple verarbeitet Daten, wenn „Mit Apple anmelden“, Apple Push Notification Service oder App-Store-Dienste genutzt werden. Google verarbeitet Authentifizierungsdaten nur, wenn die Google-Anmeldung aktiv gewählt wird. Für diese Dienste gelten ergänzend die Datenschutzbedingungen des jeweiligen Anbieters.",
            ],
          },
          {
            title: "GitHub, ip-api.com und externe Anbieter",
            paragraphs: [
              "Produkt- und Badge-Bilder können über GitHub beziehungsweise raw.githubusercontent.com geladen werden. Bei einer regionalen Bewertungsauswertung kann ip-api.com die IP-Adresse zur Ableitung einer groben Region verarbeiten. Beim aktiven Öffnen eines externen Shops oder Social-Media-Angebots verarbeitet der jeweilige Anbieter die technisch erforderlichen Aufrufdaten in eigener Verantwortung.",
            ],
          },
        ],
        links: [
          { label: "Datenschutz bei Supabase", href: "https://supabase.com/privacy" },
          { label: "Datenschutz bei Apple", href: "https://www.apple.com/legal/privacy/" },
          { label: "Datenschutz bei Google", href: "https://policies.google.com/privacy" },
          {
            label: "Datenschutz bei GitHub",
            href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
          },
          { label: "Datenschutz bei ip-api.com", href: "https://members.ip-api.com/privacy" },
        ],
      },
      {
        id: "drittland",
        title: "8. Drittlandübermittlungen",
        paragraphs: [
          "Einige Anbieter oder Unterauftragnehmer können Daten außerhalb des Europäischen Wirtschaftsraums, insbesondere in den USA, verarbeiten. Solche Übermittlungen erfolgen nur unter den Voraussetzungen der Art. 44 ff. DSGVO, etwa auf Grundlage eines Angemessenheitsbeschlusses, des EU-US Data Privacy Framework oder von EU-Standardvertragsklauseln mit erforderlichen zusätzlichen Schutzmaßnahmen.",
        ],
      },
      {
        id: "speicherdauer",
        title: "9. Speicherdauer und Löschung",
        groups: [
          {
            title: "Konto- und App-Daten",
            paragraphs: [
              "Konto-, Profil-, Sammlungs-, Bewertungs-, Nutzungs-, Social- und MouTrack-Daten werden grundsätzlich für die Dauer des Kontos beziehungsweise bis zur Löschung der jeweiligen Inhalte oder zum Widerruf einer optionalen Verarbeitung gespeichert.",
            ],
          },
          {
            title: "Push, Sitzungen und lokale Caches",
            paragraphs: [
              "Push-Token werden bei Deaktivierung, Abmeldung, technischer Ungültigkeit oder Kontolöschung entfernt. Sitzungsdaten gelten bis zu Ablauf, Erneuerung, Abmeldung oder Kontolöschung. Lokale App-Caches werden je nach Datenbereich nach 7 bis 30 Tagen als veraltet behandelt und bei Abmeldung oder Kontolöschung entfernt.",
            ],
          },
          {
            title: "Protokolle, Nachweise und Backups",
            paragraphs: [
              "Technische Protokolle, Sicherheitsnachweise, Supportvorgänge und Einwilligungsnachweise werden nur so lange aufbewahrt, wie dies für Betrieb, Rechenschaft, Missbrauchsabwehr oder gesetzliche Ansprüche erforderlich ist. Gelöschte Daten können bis zur routinemäßigen Überschreibung noch in gesicherten Backups vorhanden sein und werden dort nicht für neue Zwecke verwendet. Irreversibel anonymisierte Gruppenstatistiken können länger gespeichert werden.",
            ],
          },
        ],
      },
      {
        id: "kontoloeschung",
        title: "10. Kontolöschung, Datenexport und Widerruf",
        paragraphs: [
          "Das Konto kann direkt in der App unter Einstellungen → Daten & Einwilligungen → Konto und Daten löschen gelöscht werden. Dabei werden das Authentifizierungskonto, Profil, Profilbilder, Sammlungs- und Bewertungsdaten, Nutzungsprotokolle, Social-Verbindungen, Creator-Daten, MouTrack-Daten, Push-Token und Einwilligungsdatensätze aus den aktiven Systemen entfernt, soweit keine gesetzliche Pflicht eine begrenzte weitere Speicherung verlangt.",
          "Die Einwilligung für die optionale Analyse und Nutzung aggregierter Erkenntnisse kann unter Einstellungen → Daten & Einwilligungen widerrufen werden. MouTrack und Push-Mitteilungen lassen sich dort beziehungsweise in den iOS-Einstellungen unabhängig davon deaktivieren. Der Widerruf wirkt für die Zukunft und beeinträchtigt die Kern-App nicht; lediglich die betreffende optionale Funktion oder Datenverwendung endet.",
          "Für Auskunft, Datenübertragung oder Unterstützung bei der Löschung genügt eine Nachricht an contact@sdxsolutions.de. Zum Schutz des Kontos kann eine Identitätsprüfung erforderlich sein.",
        ],
      },
      {
        id: "sicherheit",
        title: "11. Datensicherheit",
        paragraphs: [
          "Wir setzen angemessene technische und organisatorische Maßnahmen ein. Dazu gehören die verschlüsselte Übertragung zwischen der App und unseren Hauptdiensten, geschützte Sitzungsspeicherung im iOS-Schlüsselbund, Datei-Schutz für lokale Nutzercaches, rollen- und datensatzbezogene Zugriffsregeln, getrennte Servergeheimnisse sowie begrenzte Berechtigungen. Kein technisches System kann jedoch absolute Sicherheit garantieren.",
        ],
      },
      {
        id: "rechte",
        title: "12. Rechte betroffener Personen",
        paragraphs: [
          "Nach Maßgabe der gesetzlichen Voraussetzungen bestehen insbesondere Rechte auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO), Widerspruch (Art. 21 DSGVO) sowie Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft.",
          "Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde. Für uns zuständig ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.",
        ],
        links: [{ label: "www.lda.bayern.de", href: "https://www.lda.bayern.de" }],
      },
      {
        id: "minderjaehrige",
        title: "13. Minderjährige und Änderungen",
        paragraphs: [
          "Snusdex richtet sich ausschließlich an Personen ab 18 Jahren. Wenn wir erfahren, dass ein Konto einer minderjährigen Person gehört, können wir den Zugang sperren und die Daten nach Prüfung löschen. Eltern oder Sorgeberechtigte können sich an contact@sdxsolutions.de wenden.",
          "Wir aktualisieren diese Erklärung, wenn sich Funktionen, Datenverarbeitungen, Dienstleister oder rechtliche Anforderungen ändern. Wesentliche Änderungen werden in der App kenntlich gemacht. Neue optionale Zwecke oder Empfänger werden nicht allein durch eine Textänderung legitimiert; soweit erforderlich, holen wir eine neue Einwilligung ein.",
        ],
      },
    ],
    closingNote:
      "Diese App-Datenschutzerklärung ergänzt die allgemeine Datenschutzerklärung der SDX-Solutions-Website. Maßgeblich für die Snusdex-App ist diese app-spezifische Fassung.",
  },
  en: {
    title: "Privacy in the Snusdex app",
    intro:
      "This privacy policy explains how the Snusdex app and its associated backend services process personal data.",
    updated: "Version 1.0 · Last updated: 8 August 2026",
    tocLabel: "On this page",
    sections: [
      {
        id: "controller",
        title: "1. Controller and contact",
        paragraphs: [
          "The controller under the General Data Protection Regulation (GDPR) is SDX Solutions UG (haftungsbeschränkt), Hauptstraße 12 1/2, 84416 Taufkirchen (Vils), Germany, represented by managing director Norman Tarayan.",
          "Privacy requests may be sent to contact@sdxsolutions.de with the subject “Snusdex privacy request”.",
        ],
        links: [{ label: "contact@sdxsolutions.de", href: "mailto:contact@sdxsolutions.de" }],
      },
      {
        id: "scope",
        title: "2. Scope and overview",
        paragraphs: [
          "This policy applies to the native Snusdex iOS app, its APIs, databases, cloud functions and storage, and the related support, moderation, consent and account-deletion processes.",
          "Snusdex is an information, collection, rating, statistics and community service for tobacco-free nicotine pouches. The app does not sell nicotine products and is intended only for adults.",
          "We do not integrate advertising SDKs or perform cross-company advertising tracking in the app. Direct identifiers such as email address, username, account ID, authentication or push tokens, and MouTrack positions are not used for reports involving external business partners or disclosed to them.",
        ],
      },
      {
        id: "data",
        title: "3. Data we process",
        groups: [
          {
            title: "Account and authentication",
            items: [
              "internal user ID, email address, verification status and sign-in provider",
              "encrypted or hashed authentication data",
              "session, access and refresh tokens and registration or sign-in timestamps",
              "for Sign in with Apple, a name and Apple relay email address where provided",
            ],
          },
          {
            title: "Age, profile and appearance",
            items: [
              "date of birth and the derived adult-status result",
              "username, optional profile image, profile and creator details",
              "XP, levels, streaks, badges, Collector Card appearance and creator-code redemptions",
              "language, theme, haptics, tracking mode and other app preferences",
            ],
          },
          {
            title: "Collection, ratings and usage",
            items: [
              "scanned or selected products, barcodes, collection timestamps and favourites",
              "taste, smell, bite, drip, visual and strength ratings and optional text",
              "opened and completed cans, pouches taken, timestamps and product nicotine values",
              "derived daily, weekly and monthly statistics, streaks, badges and trends",
              "product suggestions and related information",
            ],
          },
          {
            title: "Social and community data",
            items: [
              "follow requests and connections, blocks and visible profile details",
              "collection entries shared with confirmed connections",
              "community averages, rankings and creator content",
            ],
          },
          {
            title: "MouTrack",
            paragraphs: [
              "If MouTrack is expressly enabled, we store the selected mouth position, date, usage count, corrections and the suggested next position. MouTrack data is strictly excluded from market, trend and B2B analysis and is not disclosed to manufacturers, retailers or data partners.",
            ],
          },
          {
            title: "Push notifications",
            items: [
              "APNs device token, installation ID, bundle ID and technical environment",
              "app language and selected notification preferences",
              "technical delivery data for social and low-stock notifications",
            ],
          },
          {
            title: "Local and technical data",
            paragraphs: [
              "Sign-in sessions are stored in the iOS Keychain. Preferences, favourites and consent status may be stored in UserDefaults. Protected app caches contain catalogue, profile, collection, usage and social data and are treated as stale after 7 to 30 days depending on the content. Profile images may be stored temporarily before upload.",
              "App, API, image and authentication requests necessarily expose data such as IP address, time, requested endpoint or content, device and app version, status code and error information to the relevant provider.",
            ],
          },
          {
            title: "Approximate rating region",
            paragraphs: [
              "For regional rating statistics, the IP address visible during a request may be sent to ip-api.com to derive an approximate country, region, city and time zone that is stored with the rating entry. Precise GPS location is not requested.",
            ],
          },
        ],
      },
      {
        id: "purposes",
        title: "4. Purposes and legal bases",
        groups: [
          {
            title: "Account and core features",
            paragraphs: [
              "Required account, profile, collection, rating, usage and social data is processed to provide the account and actively selected app features, synchronise content across devices, and enable support and account deletion. The legal basis is Article 6(1)(b) GDPR.",
            ],
          },
          {
            title: "Age restriction",
            paragraphs: [
              "Date of birth and adult status are processed to restrict access to adults. Depending on the requirement, the legal bases are Article 6(1)(b), (c) and (f) GDPR.",
            ],
          },
          {
            title: "Security and abuse prevention",
            paragraphs: [
              "Technical logs and security signals protect accounts and systems, support error diagnosis, and prevent spam, manipulation and abuse. The legal basis is Article 6(1)(f) GDPR; our legitimate interest is secure and reliable app operation.",
            ],
          },
          {
            title: "Optional features and consent",
            paragraphs: [
              "The analysis of eligible app data to create and use aggregate, anonymised product, market and trend insights is enabled as one voluntary purpose. These insights may be used internally for Snusdex and with selected external business partners. The legal basis is Article 6(1)(a) GDPR and, where consumption data may reveal health-related information, as a precaution Article 9(2)(a) GDPR. Consent can be withdrawn in the app at any time with future effect.",
              "MouTrack and push notifications are activated separately because each provides an independent feature, and they can be disabled independently of analysis.",
              "Essential local storage and device access also rely on section 25(2) TDDDG; non-essential access takes place only after consent under section 25(1) TDDDG.",
            ],
          },
        ],
      },
      {
        id: "analysis",
        title: "5. Optional analysis and use of aggregate insights",
        paragraphs: [
          "If the user voluntarily consents, eligible rating, scan, collection and consumption-pattern data may be combined within Snusdex to create aggregate product, market and trend insights. This analysis purpose covers internal use for product improvement and recommendations as well as the use of anonymised insights with selected external business partners described below. MouTrack is always excluded.",
          "Data from many adult users may be combined for this purpose and anonymised after a re-identification risk assessment. SDX Solutions may provide the resulting aggregate dashboards, reports and trends to manufacturers, brands, retailers or market-research organisations for their market and product analysis. This may take place as part of a paid business relationship.",
          "These outputs must not contain email addresses, usernames, account IDs, exact dates of birth, raw IP addresses, authentication or push tokens, raw free text, block data or MouTrack positions. Small groups and rare attribute combinations must be suppressed or generalised.",
          "After consent is withdrawn, personal source data is no longer used for new optional analysis or reports. Group values that have already been effectively and irreversibly anonymised can no longer be linked to an individual and therefore cannot be deleted individually.",
        ],
      },
      {
        id: "permissions",
        title: "6. Device permissions and local storage",
        paragraphs: [
          "The camera is used only with iOS permission to recognise barcodes. Camera images are not uploaded to Snusdex as photographs. The photo picker opens only when a profile image is selected. Push notifications are sent only after separate iOS permission.",
          "Favourites, appearance and haptic preferences, and certain technical state remain local to the device. Performance diagnostics are provided by iOS MetricKit and are currently logged locally by Snusdex; no separate external analytics SDK is integrated.",
        ],
      },
      {
        id: "providers",
        title: "7. Service providers and recipients",
        groups: [
          {
            title: "Supabase",
            paragraphs: [
              "Supabase provides authentication, database, file storage and cloud functions. The Snusdex project is currently hosted in the EU West region in Ireland. Depending on the feature, Supabase processes account, profile, collection, rating, usage, social, consent, push and MouTrack data as a technical service provider.",
            ],
          },
          {
            title: "Apple and Google",
            paragraphs: [
              "Apple processes data when Sign in with Apple, Apple Push Notification Service or App Store services are used. Google processes authentication data only when Google sign-in is actively selected. The providers’ own privacy terms also apply.",
            ],
          },
          {
            title: "GitHub, ip-api.com and external providers",
            paragraphs: [
              "Product and badge images may be loaded through GitHub or raw.githubusercontent.com. ip-api.com may process the IP address to derive an approximate region for regional rating analysis. If an external shop or social-media service is actively opened, that provider processes the technically necessary request data under its own responsibility.",
            ],
          },
        ],
        links: [
          { label: "Supabase privacy policy", href: "https://supabase.com/privacy" },
          { label: "Apple privacy policy", href: "https://www.apple.com/legal/privacy/" },
          { label: "Google privacy policy", href: "https://policies.google.com/privacy" },
          {
            label: "GitHub privacy statement",
            href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
          },
          { label: "ip-api.com privacy policy", href: "https://members.ip-api.com/privacy" },
        ],
      },
      {
        id: "transfers",
        title: "8. International transfers",
        paragraphs: [
          "Some providers or subprocessors may process data outside the European Economic Area, particularly in the United States. Such transfers take place only under Articles 44 et seq. GDPR, for example based on an adequacy decision, the EU-US Data Privacy Framework, or EU Standard Contractual Clauses with any necessary additional safeguards.",
        ],
      },
      {
        id: "retention",
        title: "9. Retention and deletion",
        groups: [
          {
            title: "Account and app data",
            paragraphs: [
              "Account, profile, collection, rating, usage, social and MouTrack data is generally stored for the life of the account or until the relevant content is deleted or optional processing consent is withdrawn.",
            ],
          },
          {
            title: "Push, sessions and local caches",
            paragraphs: [
              "Push tokens are removed when notifications are disabled, on sign-out, when technically invalid or when the account is deleted. Session data remains valid until expiry, renewal, sign-out or account deletion. Local app caches are treated as stale after 7 to 30 days depending on the data area and are removed on sign-out or account deletion.",
            ],
          },
          {
            title: "Logs, records and backups",
            paragraphs: [
              "Technical logs, security records, support cases and consent records are retained only as long as required for operations, accountability, abuse prevention or legal claims. Deleted data may remain in protected backups until routine overwrite and is not used there for new purposes. Irreversibly anonymised aggregate statistics may be retained for longer.",
            ],
          },
        ],
      },
      {
        id: "deletion",
        title: "10. Account deletion, export and withdrawal",
        paragraphs: [
          "The account can be deleted directly in the app under Settings → Data & consent → Delete account and data. This removes the authentication account, profile, profile images, collection and rating data, usage logs, social connections, creator data, MouTrack data, push tokens and consent records from active systems unless a legal obligation requires limited further retention.",
          "Consent for optional analysis and use of aggregate insights can be withdrawn under Settings → Data & consent. MouTrack and push notifications can be disabled independently there or in iOS Settings. Withdrawal applies for the future and does not affect access to the core app; only the relevant optional feature or data use ends.",
          "For access, portability or deletion assistance, email contact@sdxsolutions.de. Identity verification may be required to protect the account.",
        ],
      },
      {
        id: "security",
        title: "11. Data security",
        paragraphs: [
          "We use appropriate technical and organisational safeguards, including encrypted transport between the app and our primary services, protected session storage in the iOS Keychain, file protection for local user caches, role- and row-based access controls, separate server secrets and limited permissions. No technical system can guarantee absolute security.",
        ],
      },
      {
        id: "rights",
        title: "12. Your rights",
        paragraphs: [
          "Subject to the legal requirements, rights include access (Article 15 GDPR), rectification (Article 16), erasure (Article 17), restriction (Article 18), portability (Article 20), objection (Article 21), and withdrawal of consent with future effect.",
          "You may also lodge a complaint with a data-protection authority. Our competent authority is the Bavarian Data Protection Authority (BayLDA), Promenade 18, 91522 Ansbach, Germany.",
        ],
        links: [{ label: "www.lda.bayern.de", href: "https://www.lda.bayern.de" }],
      },
      {
        id: "minors",
        title: "13. Minors and changes",
        paragraphs: [
          "Snusdex is intended only for people aged 18 or over. If we learn that an account belongs to a minor, we may block access and delete the data after review. Parents or guardians may contact contact@sdxsolutions.de.",
          "We update this policy when features, processing, providers or legal requirements change. Material changes will be communicated in the app. New optional purposes or recipients will not be authorised merely by changing this text; where required, we will request fresh consent.",
        ],
      },
    ],
    closingNote:
      "This app privacy policy supplements the general privacy policy for the SDX Solutions website. This app-specific version applies to the Snusdex app.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "snusdexPrivacy");
}

export default async function SnusdexPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = copies[locale];

  return (
    <main className="subpage">
      <header className="page-hero page-hero--legal">
        <div className="container page-hero-inner" {...reveal(0)}>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          <p>{content.updated}</p>
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container legal-layout">
          <aside className="legal-toc" aria-label={content.tocLabel} {...revealFade(0)}>
            <span>{content.tocLabel}</span>
            {content.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </aside>

          <div className="legal-content">
            {content.sections.map((section, index) => (
              <section
                id={section.id}
                className="legal-section"
                {...reveal(index % 3)}
                key={section.id}
              >
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.groups?.map((group) => (
                  <div key={group.title}>
                    <h3>{group.title}</h3>
                    {group.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {group.items && (
                      <ul>
                        {group.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
                {section.links && (
                  <ul>
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} rel="noreferrer">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <p className="legal-note">{content.closingNote}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
