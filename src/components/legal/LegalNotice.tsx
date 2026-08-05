import { Button } from "@/components/ui/Button";
import { reveal } from "@/motion/reveal";

type LegalNoticeProps = {
  title: string;
  body: string;
  viewGermanLabel: string;
  germanHref: string;
};

export function LegalNotice({ title, body, viewGermanLabel, germanHref }: LegalNoticeProps) {
  return (
    <main className="subpage">
      <header className="page-hero page-hero--legal">
        <div className="container page-hero-inner" {...reveal(0)}>
          <h1>{title}</h1>
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container">
          <div className="legal-notice" {...reveal(0)}>
            <p>{body}</p>
            <Button href={germanHref} variant="primary">
              {viewGermanLabel}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
