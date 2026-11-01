import Image from "next/image";
import Link from "next/link";
import { reveal } from "@/motion/reveal";

export type Product = {
  id: string;
  theme: "snusdex" | "driveradar";
  status: string;
  live: boolean;
  type: string;
  name: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  store: { label: string; note?: string; href?: string };
  detailHref: string;
  detailLabel: string;
};

export function ProductCard({ product, revealOrder = 0 }: { product: Product; revealOrder?: number }) {
  const { store } = product;

  return (
    <article
      id={product.id}
      className={`product-card product-card--${product.theme}`}
      {...reveal(revealOrder)}
    >
      <div className="product-stage">
        <span className={`status${product.live ? " status--live" : ""}`}>{product.status}</span>
        <div className="product-phone">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            sizes="(max-width: 980px) 60vw, 280px"
          />
        </div>
      </div>
      <div className="product-body">
        <div className="product-head">
          <h3>{product.name}</h3>
          <span className="product-type">{product.type}</span>
        </div>
        <p>{product.description}</p>
        <div className="product-actions">
          {store.href ? (
            <a
              className="button button--primary"
              href={store.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {store.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="button button--disabled" aria-disabled="true">
              {store.label}
              {store.note && <small>{store.note}</small>}
            </span>
          )}
          <Link className="button button--ghost" href={product.detailHref}>
            {product.detailLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
