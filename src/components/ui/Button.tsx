import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark";
  arrow?: string;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  arrow = "→",
  className = "",
}: ButtonProps) {
  const classes = `button button--${variant}${className ? ` ${className}` : ""}`;
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  const content = (
    <>
      {children} <span aria-hidden="true">{arrow}</span>
    </>
  );

  if (isExternal) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
