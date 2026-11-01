import type { Dictionary } from "@/i18n/dictionaries";
import { ProductCard, type Product } from "@/components/product/ProductCard";
import { reveal } from "@/motion/reveal";
import { href } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import { snusdexAppStoreUrl } from "@/lib/site";

export function Products({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.products;

  const products: Product[] = [
    {
      id: "snusdex",
      theme: "snusdex",
      status: t.statusAvailable,
      live: true,
      type: t.snusdex.type,
      name: "Snusdex",
      description: t.snusdex.description,
      image: { src: "/snusdex/home.webp", alt: t.snusdex.imageAlt, width: 760, height: 1652 },
      store: { label: t.appStore, href: snusdexAppStoreUrl },
      detailHref: href(locale, "snusdex"),
      detailLabel: t.details,
    },
    {
      id: "driveradar",
      theme: "driveradar",
      status: t.statusInDevelopment,
      live: false,
      type: t.fuelpilot.type,
      name: "DriveRadar",
      description: t.fuelpilot.description,
      image: { src: "/driveradar-muenchen-plus.png", alt: t.fuelpilot.imageAlt, width: 1206, height: 2622 },
      store: { label: t.appStore, note: t.comingSoon },
      detailHref: href(locale, "driveRadar"),
      detailLabel: t.details,
    },
  ];

  return (
    <section id="products" className="section section--products" aria-labelledby="products-title">
      <div className="container">
        <header className="section-heading" {...reveal(0)}>
          <h2 id="products-title">{t.title}</h2>
        </header>

        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} revealOrder={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
