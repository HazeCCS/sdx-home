import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/i18n/metadata";
import { company } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.contact;

  return (
    <main className="subpage">
      <header className="page-hero page-hero--compact">
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

      <section id="anfrage" className="section section--subpage">
        <div className="container contact-layout">
          <aside className="contact-aside">
            <Eyebrow>{t.asideEyebrow}</Eyebrow>
            <a className="contact-email" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <p>
              {company.name}
              <br />
              {company.street}
              <br />
              {company.postalCode} {company.city}
            </p>
            <div className="contact-topic-list">
              {t.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </aside>

          <ContactForm locale={locale} form={t.form} />
        </div>
      </section>
    </main>
  );
}
