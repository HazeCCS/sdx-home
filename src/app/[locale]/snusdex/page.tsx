import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { ContactCta } from "@/components/ui/ContactCta";
import { reveal, revealFade } from "@/motion/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "snusdex");
}

export default async function SnusdexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.snusdex;

  return (
    <main className="subpage">
      <header className="page-hero product-detail-hero">
        <div className="container product-detail-grid">
          <div className="page-hero-inner page-hero-inner--flush" {...reveal(0)}>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroParagraph}</p>
            <StoreLinks
              className="store-links--hero"
              ariaLabel={t.heroStoreAria}
              items={[
                { label: "iOS App Store", note: dict.products.comingSoon },
                { label: "Google Play", note: dict.products.comingSoon },
              ]}
            />
          </div>
          <div
            className="product-shot product-shot--snusdex"
            role="img"
            aria-label={t.shotAlt}
            {...revealFade(1)}
          />
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container">
          <header className="section-header" {...reveal(0)}>
            <div>
              <h2>
                {t.ideaTitleLine1}
                <br />
                <em>{t.ideaTitleEm}</em>
              </h2>
            </div>
            <p>{t.ideaIntro}</p>
          </header>
          <div className="feature-grid">
            {t.features.map((feature, index) => (
              <article key={feature.title} {...reveal(index)}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split-note">
          <div {...reveal(0)}>
            <h2>
              {t.noteTitleLine1}
              <br />
              <em>{t.noteTitleEm}</em>
            </h2>
          </div>
          <div className="prose-block" {...reveal(1)}>
            {t.noteProse.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        title={t.contactTitle}
        text={t.contactText}
        buttonLabel={t.contactButton}
        buttonHref={href(locale, "contact")}
      />
    </main>
  );
}
