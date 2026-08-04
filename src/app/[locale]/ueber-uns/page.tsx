import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactCta } from "@/components/ui/ContactCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).about;

  return (
    <main className="subpage">
      <header className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>{t.heroEyebrow}</Eyebrow>
          <h1>
            {t.heroTitleLine1}
            <br />
            <em>{t.heroTitleEm}</em>
          </h1>
          <p>{t.heroParagraph}</p>
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container about-layout">
          <div className="about-lead">
            <Eyebrow>{t.companyEyebrow}</Eyebrow>
            <h2>
              {t.companyTitleLine1}
              <br />
              <em>{t.companyTitleEm}</em>
            </h2>
          </div>
          <div className="prose-block">
            {t.companyProse.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="container company-facts" role="list" aria-label={t.factsAria}>
          {t.facts.map((fact) => (
            <article role="listitem" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
              <p>{fact.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="work-title">
        <div className="container">
          <header className="section-header">
            <div>
              <Eyebrow>{t.workEyebrow}</Eyebrow>
              <h2 id="work-title">
                {t.workTitleLine1}
                <br />
                <em>{t.workTitleEm}</em>
              </h2>
            </div>
            <p>{t.workIntro}</p>
          </header>
          <div className="service-list">
            {t.work.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        eyebrow={t.contactEyebrow}
        title={t.contactTitle}
        text={t.contactText}
        buttonLabel={t.contactButton}
        buttonHref={href(locale, "contact", "anfrage")}
      />
    </main>
  );
}
