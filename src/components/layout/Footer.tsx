import Link from "next/link";
import { company, footerGroups } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div>
          <Link href="/" className="footer-logo">
            SDX <span>Solutions UG (haftungsbeschränkt)</span>
          </Link>
          <p>{company.tagline}</p>
        </div>
        <div className="footer-link-groups">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <span>{group.title}</span>
              {group.links.map((link) => {
                const isExternal = /^(https?:|mailto:|tel:)/.test(link.href);
                return isExternal ? (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 SDX Solutions UG (haftungsbeschränkt)</span>
        <span>Entwicklung und Vertrieb digitaler Produkte</span>
      </div>
    </footer>
  );
}
