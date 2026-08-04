import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { ContactCta } from "@/components/ui/ContactCta";

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
          <div className="page-hero-inner page-hero-inner--flush">
            <Eyebrow>{t.heroEyebrow}</Eyebrow>
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
          />
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container">
          <header className="section-header">
            <div>
              <Eyebrow>{t.ideaEyebrow}</Eyebrow>
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
              <article key={feature.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split-note">
          <div>
            <Eyebrow>{t.noteEyebrow}</Eyebrow>
            <h2>
              {t.noteTitleLine1}
              <br />
              <em>{t.noteTitleEm}</em>
            </h2>
          </div>
          <div className="prose-block">
            {t.noteProse.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        eyebrow={t.contactEyebrow}
        title={t.contactTitle}
        text={t.contactText}
        buttonLabel={t.contactButton}
        buttonHref={href(locale, "contact")}
      />
    </main>
  );
}
