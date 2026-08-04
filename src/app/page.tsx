import { Hero } from "@/components/home/Hero";
import { Products } from "@/components/home/Products";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { ContactCta } from "@/components/ui/ContactCta";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SDX Solutions UG (haftungsbeschränkt)",
  description:
    "Entwicklung, Publishing und Vertrieb von Software, mobilen Applikationen und Webservices sowie Erbringung von IT-Dienstleistungen.",
  email: "norman@sdxsolutions.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hauptstraße 12 1/2",
    postalCode: "84416",
    addressLocality: "Taufkirchen (Vils)",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Softwareentwicklung",
    "Webentwicklung",
    "Mobile Apps",
    "Webservices",
    "Software Publishing",
    "IT-Dienstleistungen",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main>
        <Hero />
        <Products />
        <Services />
        <Process />
        <ContactCta
          id="contact"
          titleId="contact-title"
          eyebrow="Projektanfrage"
          title="Was können wir für Sie bauen?"
          text="Eine kurze Beschreibung reicht für den Anfang. Wir melden uns mit einer ehrlichen Einschätzung zum nächsten Schritt."
          buttonLabel="Projekt anfragen"
          buttonHref="/kontakt#anfrage"
        />
      </main>
    </>
  );
}
