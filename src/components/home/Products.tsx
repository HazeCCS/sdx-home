import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductCard, type Product } from "@/components/product/ProductCard";

const products: Product[] = [
  {
    id: "snusdex",
    variantClass: "product-card--snusdex",
    index: "01",
    status: "In Entwicklung",
    type: "Mobile Produktplattform",
    name: "Snusdex",
    description:
      "Ein übersichtlicher Produktkatalog für tabakfreie Nicotine Pouches – zum Entdecken, Vergleichen und persönlichen Einordnen.",
    meta: ["Katalog", "Vergleich", "Favoriten"],
    storeAriaLabel: "Snusdex Downloads",
    stores: [
      { label: "iOS App Store", note: "Coming soon" },
      { label: "Google Play", note: "Coming soon" },
    ],
  },
  {
    id: "fuelpilot",
    variantClass: "product-card--soft product-card--fuelpilot",
    index: "02",
    status: "In Entwicklung",
    type: "iOS Mobilitäts-App",
    name: "FuelPilot",
    description:
      "Ein fokussierter Begleiter für Autofahrer, der relevante Tankinformationen bündelt und Preis- sowie Fahrtentscheidungen vereinfacht.",
    meta: ["Tankpreise", "Planung", "iOS"],
    storeAriaLabel: "FuelPilot Download",
    stores: [{ label: "iOS App Store", note: "Coming soon" }],
  },
];

export function Products() {
  return (
    <section id="products" className="section section--products" aria-labelledby="products-title">
      <div className="container">
        <header className="section-header">
          <div>
            <Eyebrow>Eigene Produkte</Eyebrow>
            <h2 id="products-title">Apps aus dem eigenen Haus.</h2>
          </div>
          <p>
            Wir entwickeln und veröffentlichen eigene Software. Das hält unsere Arbeit nah an echten
            Nutzern, Releases und laufendem Betrieb.
          </p>
        </header>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
