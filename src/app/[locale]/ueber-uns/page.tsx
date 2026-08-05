import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";
import { ContactCta } from "@/components/ui/ContactCta";
import { reveal } from "@/motion/reveal";

function renderFactValue(value: string) {
  const parts = value.split(/(\sund\s|\sand\s)/);
  if (parts.length === 1) return value;
  return parts.map((part, index) =>
    /^\sund\s$|^\sand\s$/.test(part) ? (
      <span className="fact-connector" key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

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
        <div className="container page-hero-inner" {...reveal(0)}>
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
          <div className="about-lead" {...reveal(0)}>
            <h2>
              {t.companyTitleLine1}
              <br />
              <em>{t.companyTitleEm}</em>
            </h2>
          </div>
          <div className="prose-block" {...reveal(1)}>
            {t.companyProse.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="container company-facts" role="list" aria-label={t.factsAria}>
          {t.facts.map((fact, index) => (
            <article role="listitem" key={fact.label} {...reveal(index)}>
              <span>{fact.label}</span>
              <strong>{renderFactValue(fact.value)}</strong>
              <p>{fact.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="work-title">
        <div className="container">
          <header className="section-header" {...reveal(0)}>
            <div>
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
              <article key={item.title} {...reveal(index)}>
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
        title={t.contactTitle}
        text={t.contactText}
        buttonLabel={t.contactButton}
        buttonHref={href(locale, "contact", "anfrage")}
      />
    </main>
  );
}
