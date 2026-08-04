import type { Dictionary } from "@/i18n/dictionaries";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Process({ dict }: { dict: Dictionary }) {
  const t = dict.process;

  return (
    <section className="section section--process" aria-labelledby="process-title">
      <div className="container process-layout">
        <div className="process-intro">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="process-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <ol className="process-steps">
          {t.steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
