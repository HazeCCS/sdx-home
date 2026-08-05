import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";
import { company } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { Products } from "@/components/home/Products";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { ContactCta } from "@/components/ui/ContactCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "home");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: dict.structuredData.description,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: company.country,
    },
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main>
        <Hero locale={locale} dict={dict} />
        <Products dict={dict} />
        <Services dict={dict} />
        <Process dict={dict} />
        <ContactCta
          id="contact"
          titleId="contact-title"
          title={dict.homeContact.title}
          text={dict.homeContact.text}
          buttonLabel={dict.homeContact.button}
          buttonHref={href(locale, "contact", "anfrage")}
        />
      </main>
    </>
  );
}
