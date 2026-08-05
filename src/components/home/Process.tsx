import type { Dictionary } from "@/i18n/dictionaries";
import { reveal, revealFade } from "@/motion/reveal";

export function Process({ dict }: { dict: Dictionary }) {
  const t = dict.process;

  return (
    <section className="section section--process" aria-labelledby="process-title">
      <div className="container process-layout">
        <div className="process-intro" {...revealFade(0)}>
          <h2 id="process-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <ol className="process-steps">
          {t.steps.map((step, index) => (
            <li key={step.title} {...reveal(index)}>
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
