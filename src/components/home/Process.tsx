import { Eyebrow } from "@/components/ui/Eyebrow";

const steps = [
  {
    index: "01",
    title: "Anfrage",
    text: "Ziel, Rahmen und vorhandene Ideen kurz beschreiben.",
  },
  {
    index: "02",
    title: "Klärung",
    text: "Wir ordnen Umfang, Aufwand und den sinnvollsten Weg ein.",
  },
  {
    index: "03",
    title: "Umsetzung",
    text: "Transparente Entwicklung mit einem klaren Ergebnis.",
  },
];

export function Process() {
  return (
    <section className="section section--process" aria-labelledby="process-title">
      <div className="container process-layout">
        <div className="process-intro">
          <Eyebrow>Zusammenarbeit</Eyebrow>
          <h2 id="process-title">Direkt. Realistisch. Verlässlich.</h2>
          <p>
            Keine unnötigen Schleifen. Wir klären zuerst das Ziel und bauen anschließend genau das,
            was gebraucht wird.
          </p>
        </div>
        <ol className="process-steps">
          {steps.map((step) => (
            <li key={step.index}>
              <span>{step.index}</span>
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
