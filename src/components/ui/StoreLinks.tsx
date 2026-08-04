type StoreItem = {
  label: string;
  note: string;
};

type StoreLinksProps = {
  items: StoreItem[];
  ariaLabel: string;
  className?: string;
};

export function StoreLinks({ items, ariaLabel, className = "" }: StoreLinksProps) {
  return (
    <div className={`store-links${className ? ` ${className}` : ""}`} aria-label={ariaLabel}>
      {items.map((item) => (
        <span className="store-link" key={item.label}>
          {item.label} <small>{item.note}</small>
        </span>
      ))}
    </div>
  );
}
