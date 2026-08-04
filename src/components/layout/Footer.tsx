import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { company } from "@/lib/site";
import { href, localizedPath } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const groups = [
    {
      title: dict.footer.companyGroup,
      links: [
        { href: href(locale, "about"), label: dict.footer.aboutLink, external: false },
        { href: href(locale, "contact"), label: dict.footer.contactLink, external: false },
      ],
    },
    {
      title: dict.footer.productsGroup,
      links: [
        { href: href(locale, "snusdex"), label: dict.footer.snusdexLink, external: false },
        { href: `${localizedPath(locale)}#fuelpilot`, label: dict.footer.fuelpilotLink, external: false },
      ],
    },
    {
      title: dict.footer.legalGroup,
      links: [
        { href: href(locale, "imprint"), label: dict.footer.imprintLink, external: false },
        { href: href(locale, "privacy"), label: dict.footer.privacyLink, external: false },
      ],
    },
    {
      title: dict.footer.directGroup,
      links: [{ href: `mailto:${company.email}`, label: company.email, external: true }],
    },
  ];

  return (
    <footer>
      <div className="container footer-main">
        <div>
          <Link href={localizedPath(locale)} className="footer-logo">
            SDX <span>Solutions UG (haftungsbeschränkt)</span>
          </Link>
          <p>{dict.footer.tagline}</p>
        </div>
        <div className="footer-link-groups">
          {groups.map((group) => (
            <div key={group.title}>
              <span>{group.title}</span>
              {group.links.map((link) =>
                link.external ? (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{dict.footer.copyright}</span>
        <div className="footer-bottom-right">
          <span>{dict.footer.strapline}</span>
          <LanguageSwitcher locale={locale} ariaLabel={dict.footer.languageAria} />
        </div>
      </div>
    </footer>
  );
}
