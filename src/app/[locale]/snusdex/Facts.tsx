"use client";

import { useId, useState } from "react";
import { reveal } from "@/motion/reveal";
import type { SnusdexCopy } from "./copy";

export function Facts({ facts, countries }: Pick<SnusdexCopy, "facts" | "countries">) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section className="sx-facts" aria-label="Snusdex">
      <div className="container">
        <div className="sx-facts-grid">
          {facts.map((fact, index) => (
            <div className="sx-fact" key={fact.label} {...reveal(index)}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
          <button
            type="button"
            className="sx-fact sx-fact--toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            {...reveal(facts.length)}
          >
            <strong>
              {countries.value}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </strong>
            <span>{countries.label}</span>
          </button>
        </div>
        <div id={panelId} className="sx-countries" data-open={open ? "" : undefined}>
          <div>
            <h3>{countries.title}</h3>
            <ul>
              {countries.items.map((country) => (
                <li key={country.name}>
                  <span aria-hidden="true">{country.flag}</span>
                  {country.name}
                </li>
              ))}
            </ul>
            <p>{countries.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
