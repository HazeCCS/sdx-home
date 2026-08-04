import { Button } from "@/components/ui/Button";
import { HeroCanvas } from "@/components/home/HeroCanvas";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <HeroCanvas />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner">
        <div className="availability">
          <span />
          Offen für neue IT-Projekte
        </div>
        <h1 id="hero-title">
          Software, die
          <br />
          <em>Unternehmen weiterbringt.</em>
        </h1>
        <p>
          Wir entwickeln digitale Produkte, Websites, mobile Apps und individuelle Tools – für eigene
          Ideen und im Auftrag von Unternehmen.
        </p>
        <div className="hero-actions">
          <Button href="/kontakt#anfrage" variant="primary">
            Projekt besprechen
          </Button>
          <a className="text-link" href="#products">
            Produkte ansehen <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hero-capabilities" aria-label="Leistungsbereiche">
        <span>Softwareentwicklung</span>
        <span>Mobile Apps</span>
        <span>Webservices</span>
        <span>IT-Dienstleistungen</span>
      </div>
    </section>
  );
}
