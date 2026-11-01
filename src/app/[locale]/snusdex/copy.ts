import type { Locale } from "@/i18n/config";

type Heading = { lead: string; em: string };

export type SnusdexCopy = {
  kicker: string;
  heroLines: [string, string, string];
  heroText: string;
  download: string;
  explore: string;
  shotAlt: Record<"home" | "dex" | "social" | "stats" | "friends" | "profile", string>;
  facts: { value: string; label: string }[];
  countries: { value: string; label: string; title: string; note: string; items: { flag: string; name: string }[] };
  collect: { eyebrow: string; title: Heading; text: string; rarityLabel: string };
  review: { eyebrow: string; title: Heading; text: string; scoreLabel: string; dimensions: string[]; picksTitle: string; picksText: string };
  stats: { eyebrow: string; title: Heading; text: string; points: { title: string; text: string }[] };
  social: { eyebrow: string; title: Heading; text: string; points: { title: string; text: string }[] };
  badges: { eyebrow: string; title: Heading; text: string; progress: string };
  more: { eyebrow: string; title: Heading; items: { title: string; text: string }[] };
  faq: { eyebrow: string; title: Heading; items: { question: string; answer: string }[] };
  partner: { eyebrow: string; title: Heading; text: string; points: { title: string; text: string }[]; cta: string };
  note: { title: Heading; paragraphs: string[]; privacy: string };
  end: { eyebrow: string; title: Heading; text: string; appStore: string; live: string; googlePlay: string; later: string; contact: string };
};

export const snusdexCopy: Record<Locale, SnusdexCopy> = {
  de: {
    kicker: "Jetzt im App Store",
    heroLines: ["Check it.", "Review it.", "Collect it."],
    heroText:
      "Snusdex ist dein persönlicher Begleiter für Nicotine Pouches. Scanne Dosen, bewerte Produkte und baue deine Sammlung im Dex auf.",
    download: "Im App Store laden",
    explore: "Funktionen ansehen",
    shotAlt: {
      home: "Snusdex Startseite mit Collector ID, Tagesserie und Sammlungsstatistik",
      dex: "Der Snusdex Dex mit gesammelten und noch unbekannten Dosen",
      social: "Social Tab mit Abzeichen, Creator's Pick und Community Picks mit Bewertungen nach Look, Smell, Taste, Bite, Drip und Power",
      stats: "Statistik mit Level, Tagesserie, Dex Fortschritt und Sammlungsverlauf",
      friends: "Freundesliste mit Anfragen, Freunden und gesendeten Anfragen",
      profile: "Freundesprofil mit Collector ID, Seltenheiten und Vergleich mit der eigenen Sammlung",
    },
    facts: [
      { value: "Gratis", label: "Laden und loslegen" },
      { value: "iOS 18+", label: "Für das iPhone" },
      { value: "8", label: "Sprachen in der App" },
      { value: "18+", label: "Nur für Erwachsene" },
    ],
    countries: {
      value: "14",
      label: "Länder verfügbar",
      title: "Hier ist Snusdex verfügbar",
      note: "Die Verfügbarkeit kann sich ändern.",
      items: [
        { flag: "🇩🇪", name: "Deutschland" },
        { flag: "🇦🇹", name: "Österreich" },
        { flag: "🇨🇭", name: "Schweiz" },
        { flag: "🇩🇰", name: "Dänemark" },
        { flag: "🇸🇪", name: "Schweden" },
        { flag: "🇵🇱", name: "Polen" },
        { flag: "🇨🇿", name: "Tschechische Republik" },
        { flag: "🇮🇹", name: "Italien" },
        { flag: "🇭🇷", name: "Kroatien" },
        { flag: "🇲🇪", name: "Montenegro" },
        { flag: "🇬🇷", name: "Griechenland" },
        { flag: "🇮🇪", name: "Irland" },
        { flag: "🇬🇧", name: "Vereinigtes Königreich" },
        { flag: "🇺🇸", name: "USA" },
      ],
    },
    collect: {
      eyebrow: "Dex",
      title: { lead: "Sammle sie", em: "alle." },
      text: "Jede Dose, die du scannst, bekommt ihren Platz im Dex. Neue Sorten schalten sich frei, unbekannte Felder bleiben als Fragezeichen stehen, bis du sie gefunden hast.",
      rarityLabel: "Sieben Seltenheitsstufen",
    },
    review: {
      eyebrow: "Bewertungen",
      title: { lead: "Bewerte es", em: "sechsfach." },
      text: "Statt einer einzigen Zahl bewertest du jedes Produkt nach sechs Kriterien. So erinnerst du dich später genau, was dir gefallen hat und was nicht.",
      scoreLabel: "von 10",
      dimensions: ["Look", "Smell", "Taste", "Bite", "Drip", "Power"],
      picksTitle: "Community Picks",
      picksText: "Sieh, was die Community am besten bewertet und was heute am häufigsten gescannt wird.",
    },
    stats: {
      eyebrow: "Statistik",
      title: { lead: "Deine Zahlen", em: "auf einen Blick." },
      text: "Level, XP, Serie und Fortschritt im Dex. Deine Collector ID zeigt, wie aktiv du sammelst, und lässt sich nach deinem Geschmack anpassen.",
      points: [
        { title: "Level und XP", text: "Mit jedem Scan und jeder Bewertung steigst du auf." },
        { title: "Tagesserie", text: "Bleib dran und sichere dir Bonus XP an Meilensteintagen." },
        { title: "Sammlungsverlauf", text: "Verfolge, wie dein Dex über die Wochen wächst." },
      ],
    },
    social: {
      eyebrow: "Freunde",
      title: { lead: "Vergleiche dich", em: "mit Freunden." },
      text: "Schick eine Anfrage, und sobald sie angenommen ist, seid ihr Freunde. Auf dem Profil siehst du Seltenheiten, Abzeichen und einen Vergleich mit deiner eigenen Sammlung.",
      points: [
        { title: "Gemeinsam und exklusiv", text: "Sieh, welche Dosen ihr beide habt und was nur einer von euch kennt." },
        { title: "Rangliste", text: "Miss dich mit anderen Sammlern und steige im Ranking auf." },
      ],
    },
    badges: {
      eyebrow: "Abzeichen",
      title: { lead: "Verdiene", em: "jedes Abzeichen." },
      text: "Vom ersten Sammler Level bis ganz nach oben. Mit jeder neuen Sorte kommst du dem nächsten Abzeichen näher.",
      progress: "6 von 11 freigeschaltet",
    },
    more: {
      eyebrow: "Und mehr",
      title: { lead: "Alles, was dein Dex", em: "braucht." },
      items: [
        { title: "Scanner", text: "Dose scannen und sofort im Snusdex finden." },
        { title: "Suche", text: "Nach Produkt, Marke oder Geschmack suchen." },
        { title: "Schnellzugriff", text: "Einen Pouch direkt über Action Button, Kontrollzentrum oder Sperrbildschirm zählen." },
        { title: "Dosen im Blick", text: "Offene und leere Dosen verwalten und Verbrauch im Überblick behalten." },
        { title: "Produktfotos", text: "Fehlende Produkte und Bilder vorschlagen und die Datenbank mitgestalten." },
        { title: "Acht Sprachen", text: "Deutsch, Englisch, Spanisch, Französisch, Italienisch, Niederländisch, Polnisch und Russisch." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: { lead: "Häufige", em: "Fragen." },
      items: [
        {
          question: "Was ist Snusdex?",
          answer: "Snusdex ist eine iPhone App für Nicotine Pouches. Du scannst Dosen, bewertest Produkte, baust deine Sammlung im Dex auf und vergleichst dich mit Freunden.",
        },
        {
          question: "Ist Snusdex kostenlos?",
          answer: "Ja, du kannst Snusdex kostenlos im App Store laden und sofort mit deiner Sammlung starten.",
        },
        {
          question: "Für welche Geräte gibt es Snusdex?",
          answer: "Snusdex läuft auf dem iPhone mit iOS 18 oder neuer. Eine Version für Android ist für später in diesem Jahr geplant.",
        },
        {
          question: "Wie bewerte ich Nicotine Pouches in der App?",
          answer: "Jedes Produkt bewertest du nach sechs Kriterien: Look, Smell, Taste, Bite, Drip und Power. So erinnerst du dich später genau, was dir gefallen hat.",
        },
        {
          question: "Wie funktioniert der Dex?",
          answer: "Jede gescannte Dose bekommt ihren Platz im Dex. Neue Sorten schalten sich frei und sind in sieben Seltenheitsstufen von Common bis Mythic eingeteilt.",
        },
        {
          question: "Kann ich über Snusdex Nicotine Pouches kaufen?",
          answer: "Snusdex ist selbst kein Onlineshop. Über die App gelangst du aber direkt zu unseren Partnershops und kannst dort Nicotine Pouches bestellen.",
        },
        {
          question: "In welchen Ländern ist Snusdex verfügbar?",
          answer: "Snusdex ist in Deutschland, Österreich, der Schweiz, Dänemark, Schweden, Polen, Tschechien, Italien, Kroatien, Montenegro, Griechenland, Irland, im Vereinigten Königreich und in den USA verfügbar. Die Verfügbarkeit kann sich ändern.",
        },
        {
          question: "Ab welchem Alter darf ich Snusdex nutzen?",
          answer: "Snusdex richtet sich ausschließlich an Erwachsene ab 18 Jahren. Nikotin macht abhängig, und die App ersetzt keine medizinische oder gesundheitliche Beratung.",
        },
      ],
    },
    partner: {
      eyebrow: "Für Partner",
      title: { lead: "Du bist Marke oder", em: "Händler?" },
      text: "Snusdex zeigt, was Sammler wirklich begeistert. Wenn du mit uns zusammenarbeiten oder mehr über die Erkenntnisse aus der Community erfahren möchtest, sprich uns an.",
      points: [
        { title: "Kooperationen", text: "Gemeinsame Ideen für Hersteller, Marken und Händler rund um Snusdex." },
        { title: "Community Insights", text: "Anonyme Erkenntnisse auf Gruppenebene, nie auf Einzelpersonen, und nur auf Basis freiwilliger Einwilligung." },
      ],
      cta: "Kooperation anfragen",
    },
    note: {
      title: { lead: "Informationsprodukt,", em: "kein Onlineshop." },
      paragraphs: [
        "Snusdex dient der Information und der persönlichen Organisation deiner Sammlung. Die App richtet sich ausschließlich an Erwachsene und ist keine medizinische oder gesundheitliche Beratung.",
        "Nikotin macht abhängig. Die angezeigten Nikotinwerte sind Schätzungen auf Basis eines vereinfachten Modells.",
      ],
      privacy: "Datenschutzerklärung für die Snusdex-App",
    },
    end: {
      eyebrow: "Jetzt verfügbar",
      title: { lead: "Your Dex", em: "at your hands." },
      text: "Lade Snusdex kostenlos im App Store und starte deine Sammlung mit der ersten Dose.",
      appStore: "App Store",
      live: "Live",
      googlePlay: "Google Play",
      later: "Später in diesem Jahr",
      contact: "Fragen zu Snusdex",
    },
  },
  en: {
    kicker: "Available on the App Store",
    heroLines: ["Check it.", "Review it.", "Collect it."],
    heroText:
      "Snusdex is your personal companion for nicotine pouches. Scan cans, review products and build your collection in the Dex.",
    download: "Download on the App Store",
    explore: "Explore features",
    shotAlt: {
      home: "Snusdex home screen with Collector ID, day streak and collection stats",
      dex: "The Snusdex Dex with collected and still unknown cans",
      social: "Social tab with badges, Creator's Pick and Community Picks with ratings for Look, Smell, Taste, Bite, Drip and Power",
      stats: "Statistics with level, day streak, Dex progress and collection growth",
      friends: "Friends list with requests, friends and sent requests",
      profile: "Friend profile with Collector ID, rarities and a comparison with your own collection",
    },
    facts: [
      { value: "Free", label: "Download and start" },
      { value: "iOS 18+", label: "For iPhone" },
      { value: "8", label: "Languages in the app" },
      { value: "18+", label: "Adults only" },
    ],
    countries: {
      value: "14",
      label: "Countries available",
      title: "Where Snusdex is available",
      note: "Availability may change.",
      items: [
        { flag: "🇩🇪", name: "Germany" },
        { flag: "🇦🇹", name: "Austria" },
        { flag: "🇨🇭", name: "Switzerland" },
        { flag: "🇩🇰", name: "Denmark" },
        { flag: "🇸🇪", name: "Sweden" },
        { flag: "🇵🇱", name: "Poland" },
        { flag: "🇨🇿", name: "Czech Republic" },
        { flag: "🇮🇹", name: "Italy" },
        { flag: "🇭🇷", name: "Croatia" },
        { flag: "🇲🇪", name: "Montenegro" },
        { flag: "🇬🇷", name: "Greece" },
        { flag: "🇮🇪", name: "Ireland" },
        { flag: "🇬🇧", name: "United Kingdom" },
        { flag: "🇺🇸", name: "United States" },
      ],
    },
    collect: {
      eyebrow: "Dex",
      title: { lead: "Collect it", em: "all of them." },
      text: "Every can you scan earns its place in the Dex. New varieties unlock, and unknown slots stay as question marks until you find them.",
      rarityLabel: "Seven rarity tiers",
    },
    review: {
      eyebrow: "Reviews",
      title: { lead: "Review it", em: "six ways." },
      text: "Instead of one number, you rate every product on six criteria. That way you remember exactly what you liked and what you did not.",
      scoreLabel: "of 10",
      dimensions: ["Look", "Smell", "Taste", "Bite", "Drip", "Power"],
      picksTitle: "Community Picks",
      picksText: "See what the community rates highest and what is scanned most today.",
    },
    stats: {
      eyebrow: "Statistics",
      title: { lead: "Your stats", em: "at a glance." },
      text: "Level, XP, streak and Dex progress. Your Collector ID shows how actively you collect and can be personalised to your taste.",
      points: [
        { title: "Level and XP", text: "Every scan and review moves you up." },
        { title: "Day streak", text: "Keep it going and earn bonus XP on milestone days." },
        { title: "Collection growth", text: "Follow how your Dex grows over the weeks." },
      ],
    },
    social: {
      eyebrow: "Friends",
      title: { lead: "Compare", em: "with friends." },
      text: "Send a request and you are friends once it is accepted. Friend profiles show rarities, badges and a comparison with your own collection.",
      points: [
        { title: "Shared and exclusive", text: "See which cans you both have and which only one of you knows." },
        { title: "Ranking", text: "Measure yourself against other collectors and climb the ranking." },
      ],
    },
    badges: {
      eyebrow: "Badges",
      title: { lead: "Earn", em: "every badge." },
      text: "From your first collector level all the way up. Every new variety brings you closer to the next badge.",
      progress: "6 of 11 unlocked",
    },
    more: {
      eyebrow: "And more",
      title: { lead: "Everything your Dex", em: "needs." },
      items: [
        { title: "Scanner", text: "Scan a can and find it in Snusdex instantly." },
        { title: "Search", text: "Search by product, brand or flavour." },
        { title: "Quick Access", text: "Count a pouch straight from the Action Button, Control Centre or Lock Screen." },
        { title: "Cans at a glance", text: "Manage open and finished cans and keep track of your usage." },
        { title: "Product photos", text: "Suggest missing products and images and help shape the database." },
        { title: "Eight languages", text: "German, English, Spanish, French, Italian, Dutch, Polish and Russian." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: { lead: "Frequently asked", em: "questions." },
      items: [
        {
          question: "What is Snusdex?",
          answer: "Snusdex is an iPhone app for nicotine pouches. You scan cans, review products, build your collection in the Dex and compare with friends.",
        },
        {
          question: "Is Snusdex free?",
          answer: "Yes, you can download Snusdex for free on the App Store and start your collection right away.",
        },
        {
          question: "Which devices does Snusdex run on?",
          answer: "Snusdex runs on iPhone with iOS 18 or later. An Android version is planned for later this year.",
        },
        {
          question: "How do I review nicotine pouches in the app?",
          answer: "You rate every product on six criteria: Look, Smell, Taste, Bite, Drip and Power. That way you remember exactly what you liked and what you did not.",
        },
        {
          question: "How does the Dex work?",
          answer: "Every can you scan gets its place in the Dex. New varieties unlock and are grouped into seven rarity tiers from Common to Mythic.",
        },
        {
          question: "Can I buy nicotine pouches through Snusdex?",
          answer: "Snusdex is not an online shop itself. The app takes you straight to our partner shops, where you can order nicotine pouches.",
        },
        {
          question: "In which countries is Snusdex available?",
          answer: "Snusdex is available in Germany, Austria, Switzerland, Denmark, Sweden, Poland, the Czech Republic, Italy, Croatia, Montenegro, Greece, Ireland, the United Kingdom and the USA. Availability may change.",
        },
        {
          question: "How old do I have to be to use Snusdex?",
          answer: "Snusdex is intended for adults aged 18 and over only. Nicotine is addictive, and the app is not medical or health advice.",
        },
      ],
    },
    partner: {
      eyebrow: "For partners",
      title: { lead: "A brand or", em: "retailer?" },
      text: "Snusdex shows what collectors really love. If you want to work with us or learn more about insights from the community, get in touch.",
      points: [
        { title: "Collaborations", text: "Shared ideas for manufacturers, brands and retailers around Snusdex." },
        { title: "Community insights", text: "Anonymous insights at group level, never about individuals, and only based on voluntary consent." },
      ],
      cta: "Request a collaboration",
    },
    note: {
      title: { lead: "Information product,", em: "not an online shop." },
      paragraphs: [
        "Snusdex is for information and for organising your personal collection. The app is intended for adults only and is not medical or health advice.",
        "Nicotine is addictive. The nicotine values shown are estimates based on a simplified model.",
      ],
      privacy: "Privacy policy for the Snusdex app",
    },
    end: {
      eyebrow: "Available now",
      title: { lead: "Your Dex", em: "at your hands." },
      text: "Download Snusdex for free on the App Store and start your collection with your first can.",
      appStore: "App Store",
      live: "Live",
      googlePlay: "Google Play",
      later: "Later this year",
      contact: "Questions about Snusdex",
    },
  },
};
