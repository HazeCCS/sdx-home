import { StoreLinks } from "@/components/ui/StoreLinks";

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
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article id={product.id} className={`product-card ${product.variantClass}`}>
      <div className="product-topline">
        <span className="product-index">{product.index}</span>
        <span className="status">{product.status}</span>
      </div>
      <div className="product-copy">
        <span className="product-type">{product.type}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-meta">
        {product.meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <StoreLinks items={product.stores} ariaLabel={product.storeAriaLabel} />
    </article>
  );
}
