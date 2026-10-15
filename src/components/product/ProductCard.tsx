import { StoreLinks } from "@/components/ui/StoreLinks";
import Link from "next/link";
import { reveal } from "@/motion/reveal";

export type Product = {
  id: string;
  variantClass: string;
  index: string;
  status: string;
  type: string;
  name: string;
  description: string;
  meta: string[];
  storeAriaLabel: string;
  stores: { label: string; note: string }[];
  detailHref?: string;
  detailLabel?: string;
};

export function ProductCard({ product, revealOrder = 0 }: { product: Product; revealOrder?: number }) {
  return (
    <article
      id={product.id}
      className={`product-card ${product.variantClass}`}
      {...reveal(revealOrder)}
    >
      <div className="product-topline">
        <span className="status">{product.status}</span>
      </div>
      <div className="product-copy">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-meta">
        {product.meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <StoreLinks items={product.stores} ariaLabel={product.storeAriaLabel} />
      {product.detailHref && <Link className="product-detail-link" href={product.detailHref}>{product.detailLabel} <span aria-hidden="true">↗</span></Link>}
    </article>
  );
}
