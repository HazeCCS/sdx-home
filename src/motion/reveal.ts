import type { CSSProperties } from "react";

type RevealProps = {
  "data-reveal": string;
  style: CSSProperties;
};

export function reveal(order = 0): RevealProps {
  return { "data-reveal": "", style: { ["--reveal-order" as string]: order } as CSSProperties };
}

export function revealFade(order = 0): RevealProps {
  return { "data-reveal": "fade", style: { ["--reveal-order" as string]: order } as CSSProperties };
}
