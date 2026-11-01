import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { href } from "@/i18n/routing";
import { snusdexAppStoreUrl } from "@/lib/site";
import { reveal, revealFade } from "@/motion/reveal";
import { Facts } from "./Facts";
import { snusdexCopy, type SnusdexCopy } from "./copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, "snusdex");
}

const rarities = [
  { name: "Common", color: "#8e8e93", weight: 9 },
  { name: "Uncommon", color: "#34c759", weight: 8 },
  { name: "Rare", color: "#0a84ff", weight: 7 },
  { name: "Epic", color: "#bf5af2", weight: 2 },
  { name: "Exotic", color: "#ff375f", weight: 3 },
  { name: "Legendary", color: "#ff9f0a", weight: 3 },
  { name: "Mythic", color: "#64d2ff", weight: 2 },
];

function Phone({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`sx-phone${className ? ` ${className}` : ""}`}>
      <Image
        src={src}
        alt={alt}
        width={760}
        height={1652}
        priority={priority}
        sizes="(max-width: 900px) 70vw, 340px"
      />
    </div>
  );
}

function Heading({ lead, em }: { lead: string; em: string }) {
  return (
    <>
      {lead} <em>{em}</em>
    </>
  );
}

function AppStoreButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a
      className={`sx-store-button${className ? ` ${className}` : ""}`}
      href={snusdexAppStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.37 12.62c-.03-2.64 2.16-3.9 2.26-3.97-1.23-1.8-3.15-2.05-3.83-2.08-1.63-.16-3.18.96-4.01.96-.83 0-2.1-.94-3.46-.91-1.78.03-3.42 1.04-4.34 2.63-1.85 3.21-.47 7.96 1.33 10.57.88 1.27 1.93 2.7 3.31 2.65 1.33-.05 1.83-.86 3.44-.86 1.6 0 2.06.86 3.46.83 1.43-.02 2.34-1.3 3.21-2.58 1.01-1.48 1.43-2.91 1.45-2.98-.03-.01-2.78-1.07-2.82-4.26ZM13.74 4.83c.73-.89 1.22-2.12 1.09-3.35-1.05.04-2.32.7-3.07 1.58-.67.78-1.26 2.03-1.1 3.23 1.17.09 2.35-.6 3.08-1.46Z" />
      </svg>
      {label}
    </a>
  );
}

function Hero({ t }: { t: SnusdexCopy }) {
  return (
    <header className="sx-hero">
      <div className="sx-hero-grid" aria-hidden="true" />
      <div className="container sx-hero-inner">
        <div className="sx-hero-copy">
          <span className="sx-eyebrow" {...reveal(0)}>
            {t.kicker}
          </span>
          <h1 {...reveal(1)}>
            <span>{t.heroLines[0]}</span>
            <em>{t.heroLines[1]}</em>
            <span>{t.heroLines[2]}</span>
          </h1>
          <p {...reveal(2)}>{t.heroText}</p>
          <div className="sx-actions" {...reveal(3)}>
            <AppStoreButton label={t.download} />
            <a className="sx-ghost-button" href="#features">
              {t.explore}
            </a>
          </div>
        </div>
        <div className="sx-hero-visual" {...revealFade(2)}>
          <Phone src="/snusdex/dex.webp" alt={t.shotAlt.dex} className="sx-phone--left" />
          <Phone src="/snusdex/home.webp" alt={t.shotAlt.home} className="sx-phone--main" priority />
          <Phone src="/snusdex/stats.webp" alt={t.shotAlt.stats} className="sx-phone--right" />
        </div>
      </div>
    </header>
  );
}

export default async function SnusdexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = snusdexCopy[locale];

  return (
    <main className="sx-page">
      <Hero t={t} />

      <Facts facts={t.facts} countries={t.countries} />

      <section id="features" className="section sx-section">
        <div className="container sx-split">
          <div className="sx-copy" {...reveal(0)}>
            <span className="sx-eyebrow">{t.collect.eyebrow}</span>
            <h2>
              <Heading {...t.collect.title} />
            </h2>
            <p>{t.collect.text}</p>
            <div className="sx-rarity">
              <span className="sx-rarity-label">{t.collect.rarityLabel}</span>
              <div className="sx-rarity-bar" aria-hidden="true">
                {rarities.map((item) => (
                  <span key={item.name} style={{ flexGrow: item.weight, background: item.color }} />
                ))}
              </div>
              <ul className="sx-rarity-list">
                {rarities.map((item) => (
                  <li key={item.name}>
                    <i style={{ background: item.color }} />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sx-stage" {...revealFade(1)}>
            <Phone src="/snusdex/dex.webp" alt={t.shotAlt.dex} />
          </div>
        </div>
      </section>

      <section className="section sx-section sx-section--raised">
        <div className="container sx-split sx-split--flip">
          <div className="sx-stage" {...revealFade(1)}>
            <Phone src="/snusdex/social.webp" alt={t.shotAlt.social} />
          </div>
          <div className="sx-copy" {...reveal(0)}>
            <span className="sx-eyebrow">{t.review.eyebrow}</span>
            <h2>
              <Heading {...t.review.title} />
            </h2>
            <p>{t.review.text}</p>
            <ul className="sx-dimensions">
              {t.review.dimensions.map((dimension, index) => (
                <li key={dimension}>
                  <span>0{index + 1}</span>
                  {dimension}
                </li>
              ))}
            </ul>
            <div className="sx-aside">
              <h3>{t.review.picksTitle}</h3>
              <p>{t.review.picksText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section sx-section">
        <div className="container sx-split">
          <div className="sx-copy" {...reveal(0)}>
            <span className="sx-eyebrow">{t.stats.eyebrow}</span>
            <h2>
              <Heading {...t.stats.title} />
            </h2>
            <p>{t.stats.text}</p>
            <ol className="sx-points">
              {t.stats.points.map((point, index) => (
                <li key={point.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="sx-stage sx-stage--glow" {...revealFade(1)}>
            <Phone src="/snusdex/stats.webp" alt={t.shotAlt.stats} />
          </div>
        </div>
      </section>

      <section className="section sx-section sx-section--raised">
        <div className="container sx-split sx-split--flip">
          <div className="sx-pair" {...revealFade(1)}>
            <Phone src="/snusdex/friends.webp" alt={t.shotAlt.friends} className="sx-pair-back" />
            <Phone src="/snusdex/profile.webp" alt={t.shotAlt.profile} className="sx-pair-front" />
          </div>
          <div className="sx-copy" {...reveal(0)}>
            <span className="sx-eyebrow">{t.social.eyebrow}</span>
            <h2>
              <Heading {...t.social.title} />
            </h2>
            <p>{t.social.text}</p>
            <ol className="sx-points">
              {t.social.points.map((point, index) => (
                <li key={point.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="sx-badge-card">
              <span className="sx-eyebrow">{t.badges.eyebrow}</span>
              <h3>
                <Heading {...t.badges.title} />
              </h3>
              <p>{t.badges.text}</p>
              <div className="sx-progress" role="img" aria-label={t.badges.progress}>
                <span style={{ width: "55%" }} />
              </div>
              <small>{t.badges.progress}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section sx-section">
        <div className="container">
          <header className="sx-heading sx-heading--center" {...reveal(0)}>
            <span className="sx-eyebrow">{t.more.eyebrow}</span>
            <h2>
              <Heading {...t.more.title} />
            </h2>
          </header>
          <div className="sx-feature-grid">
            {t.more.items.map((item, index) => (
              <article key={item.title} {...reveal(index)}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sx-section">
        <div className="container">
          <div className="sx-partner" {...reveal(0)}>
            <div className="sx-partner-copy">
              <span className="sx-eyebrow">{t.partner.eyebrow}</span>
              <h2>
                <Heading {...t.partner.title} />
              </h2>
              <p>{t.partner.text}</p>
              <Link className="button button--primary" href={href(locale, "contact")}>
                {t.partner.cta} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ol className="sx-partner-cards">
              {t.partner.points.map((point, index) => (
                <li key={point.title}>
                  <span>0{index + 1}</span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sx-note">
        <div className="container sx-note-grid">
          <h3 {...reveal(0)}>
            <Heading {...t.note.title} />
          </h3>
          <div {...reveal(1)}>
            {t.note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href={href(locale, "snusdexPrivacy")}>{t.note.privacy} ↗</Link>
          </div>
        </div>
      </section>

      <section className="section sx-end">
        <div className="container sx-end-inner">
          <Image
            className="sx-end-icon"
            src="/snusdex/icon.webp"
            alt=""
            width={360}
            height={360}
            sizes="128px"
          />
          <span className="sx-eyebrow">{t.end.eyebrow}</span>
          <h2 {...reveal(0)}>
            <Heading {...t.end.title} />
          </h2>
          <p>{t.end.text}</p>
          <ul className="sx-stores">
            <li>
              <a href={snusdexAppStoreUrl} target="_blank" rel="noopener noreferrer">
                <span>{t.end.appStore}</span>
                <b>
                  <i />
                  {t.end.live}
                </b>
              </a>
            </li>
            <li className="is-later">
              <span>{t.end.googlePlay}</span>
              <small>{t.end.later}</small>
            </li>
          </ul>
          <Link className="sx-contact-link" href={href(locale, "contact")}>
            {t.end.contact} ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
