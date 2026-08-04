import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

type ContactCtaProps = {
  eyebrow: string;
  title: ReactNode;
  text: string;
  buttonLabel: string;
  buttonHref: string;
  id?: string;
  titleId?: string;
};

export function ContactCta({
  eyebrow,
  title,
  text,
  buttonLabel,
  buttonHref,
  id,
  titleId,
}: ContactCtaProps) {
  return (
    <section
      className="section section--contact"
      id={id}
      aria-labelledby={titleId}
    >
      <div className="container">
        <div className="contact-panel">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={titleId}>{title}</h2>
            <p>{text}</p>
          </div>
          <Button href={buttonHref} variant="dark">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
