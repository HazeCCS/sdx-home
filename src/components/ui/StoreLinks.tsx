type StoreItem = {
  label: string;
  note: string;
  href?: string;
};

type StoreLinksProps = {
  items: StoreItem[];
  ariaLabel: string;
  className?: string;
};

export function StoreLinks({ items, ariaLabel, className = "" }: StoreLinksProps) {
  return (
    <div className={`store-links${className ? ` ${className}` : ""}`} aria-label={ariaLabel}>
      {items.map((item) =>
        item.href ? (
          <a
            className="store-link store-link--live"
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label} <small>{item.note}</small>
          </a>
        ) : (
          <span className="store-link" key={item.label}>
            {item.label} <small>{item.note}</small>
          </span>
        ),
      )}
    </div>
  );
}
