import { reveal, revealFade } from "@/motion/reveal";

export type AppLegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
};

export function AppLegalDocument({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: AppLegalSection[];
}) {
  return (
    <main className="subpage">
      <header className="page-hero page-hero--legal">
        <div className="container page-hero-inner" {...reveal(0)}>
          <h1>{title}</h1>
          <p>{intro}</p>
          <p>{updated}</p>
        </div>
      </header>
      <section className="section section--subpage">
        <div className="container legal-layout">
          <aside className="legal-toc" aria-label="Inhalt" {...revealFade(0)}>
            <span>Auf dieser Seite</span>
            {sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </aside>
          <div className="legal-content">
            {sections.map((section, index) => (
              <section id={section.id} className="legal-section" {...reveal(index % 3)} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.links && (
                  <ul>
                    {section.links.map((link) => (
                      <li key={link.href}><a href={link.href} rel="noreferrer">{link.label}</a></li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
