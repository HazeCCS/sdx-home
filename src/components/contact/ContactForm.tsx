"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routing";

type StatusState = "" | "success" | "error";

type ContactFormProps = {
  locale: Locale;
  form: Dictionary["contact"]["form"];
};

export function ContactForm({ locale, form }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ message: string; state: StatusState }>({
    message: "",
    state: "",
  });

  function handleInput(event: FormEvent<HTMLFormElement>) {
    const target = event.target as HTMLElement;
    if (target.matches("input, textarea")) {
      target.removeAttribute("aria-invalid");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const node = formRef.current;
    if (!node) return;

    setStatus({ message: "", state: "" });

    const requiredFields = Array.from(
      node.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]"),
    );
    requiredFields.forEach((field) => {
      if (!field.checkValidity()) field.setAttribute("aria-invalid", "true");
    });

    if (!node.checkValidity()) {
      setStatus({ message: form.statusValidation, state: "error" });
      node.reportValidity();
      return;
    }

    const values = Object.fromEntries(new FormData(node).entries());
    setSending(true);
    setStatus({ message: form.statusSending, state: "" });

    try {
      const response = await fetch(node.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("request-failed");
      }

      node.reset();
      setStatus({ message: form.statusSuccess, state: "success" });
    } catch {
      setStatus({ message: form.statusError, state: "error" });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="contact-form"
      id="contact-form"
      action="/api/contact"
      method="post"
      noValidate
      ref={formRef}
      onInput={handleInput}
      onSubmit={handleSubmit}
    >
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">{form.nameLabel}</label>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={100} required />
        </div>
        <div className="form-field">
          <label htmlFor="email">{form.emailLabel}</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="company">
          {form.companyLabel} <span>{form.companyOptional}</span>
        </label>
        <input id="company" name="company" type="text" autoComplete="organization" maxLength={120} />
      </div>
      <div className="form-field">
        <label htmlFor="message">{form.messageLabel}</label>
        <textarea
          id="message"
          name="message"
          rows={7}
          maxLength={5000}
          required
          placeholder={form.messagePlaceholder}
        />
      </div>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-submit-row">
        <button className="button button--primary" type="submit" disabled={sending}>
          {sending ? (
            form.sending
          ) : (
            <>
              {form.submit} <span aria-hidden="true">→</span>
            </>
          )}
        </button>
        <p>
          {form.privacyNote}{" "}
          <Link href={href(locale, "privacy", "kontaktformular")}>{form.privacyLink}</Link>.
        </p>
      </div>
      <p
        className={`form-status${status.state ? ` is-${status.state}` : ""}`}
        id="form-status"
        role="status"
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  );
}
