import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

type LegalNoticeProps = {
  eyebrow: string;
  title: string;
  body: string;
  viewGermanLabel: string;
  germanHref: string;
};

export function LegalNotice({ eyebrow, title, body, viewGermanLabel, germanHref }: LegalNoticeProps) {
  return (
    <main className="subpage">
      <header className="page-hero page-hero--legal">
        <div className="container page-hero-inner">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
        </div>
      </header>

      <section className="section section--subpage">
        <div className="container">
          <div className="legal-notice">
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
