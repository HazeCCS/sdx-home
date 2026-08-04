export const company = {
  name: "SDX Solutions UG (haftungsbeschränkt)",
  shortName: "SDX Solutions",
  email: "norman@sdxsolutions.de",
  managingDirector: "Norman Tarayan",
  street: "Hauptstraße 12 1/2",
  postalCode: "84416",
  city: "Taufkirchen (Vils)",
  country: "DE",
  tagline: "Software. Apps. Webservices. IT-Dienstleistungen.",
} as const;

export type NavLink = {
  href: string;
  label: string;
};

export const primaryNav: NavLink[] = [
  { href: "/", label: "Startseite" },
  { href: "/ueber-uns", label: "Über SDX Solutions" },
  { href: "/snusdex", label: "Snusdex" },
  { href: "/kontakt", label: "Kontakt" },
];

export const mobileNav: NavLink[] = [
  ...primaryNav,
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export type FooterGroup = {
  title: string;
  links: { href: string; label: string }[];
};

export const footerGroups: FooterGroup[] = [
  {
    title: "Unternehmen",
    links: [
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Produkte",
    links: [
      { href: "/snusdex", label: "Snusdex" },
      { href: "/#fuelpilot", label: "FuelPilot" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
  {
    title: "Direkt",
    links: [{ href: "mailto:norman@sdxsolutions.de", label: "norman@sdxsolutions.de" }],
  },
];
