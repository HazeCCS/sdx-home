import type { Dictionary } from "@/i18n/dictionaries";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductCard, type Product } from "@/components/product/ProductCard";

export function Products({ dict }: { dict: Dictionary }) {
  const t = dict.products;

  const products: Product[] = [
    {
      id: "snusdex",
      variantClass: "product-card--snusdex",
      index: "01",
      status: t.statusInDevelopment,
      type: t.snusdex.type,
      name: "Snusdex",
      description: t.snusdex.description,
      meta: t.snusdex.meta,
      storeAriaLabel: t.snusdex.storeAria,
      stores: [
        { label: "iOS App Store", note: t.comingSoon },
        { label: "Google Play", note: t.comingSoon },
      ],
    },
    {
      id: "fuelpilot",
      variantClass: "product-card--soft product-card--fuelpilot",
      index: "02",
      status: t.statusInDevelopment,
      type: t.fuelpilot.type,
      name: "FuelPilot",
      description: t.fuelpilot.description,
      meta: t.fuelpilot.meta,
      storeAriaLabel: t.fuelpilot.storeAria,
      stores: [{ label: "iOS App Store", note: t.comingSoon }],
    },
  ];

  return (
    <section id="products" className="section section--products" aria-labelledby="products-title">
      <div className="container">
        <header className="section-header">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 id="products-title">{t.title}</h2>
          </div>
          <p>{t.intro}</p>
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
