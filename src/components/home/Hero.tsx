import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { reveal } from "@/motion/reveal";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;

  return (
    <section id="hero" aria-labelledby="hero-title">
      <HeroCanvas />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner">
        <h1 id="hero-title" {...reveal(0)}>
          {t.titleLine1}
          <br />
          <em>{t.titleEm}</em>
        </h1>
        <p {...reveal(1)}>{t.paragraph}</p>
        <div className="hero-actions" {...reveal(2)}>
          <Button href={href(locale, "contact", "anfrage")} variant="primary">
            {t.ctaPrimary}
          </Button>
          <a className="text-link" href="#products">
            {t.productsLink} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hero-capabilities" aria-label={t.capabilitiesAria}>
        {t.capabilities.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
