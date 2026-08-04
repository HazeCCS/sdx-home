"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

type StatusState = "" | "success" | "error";

export function ContactForm() {
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
    const form = formRef.current;
    if (!form) return;

    setStatus({ message: "", state: "" });

    const requiredFields = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]"),
    );
    requiredFields.forEach((field) => {
      if (!field.checkValidity()) field.setAttribute("aria-invalid", "true");
    });

    if (!form.checkValidity()) {
      setStatus({ message: "Bitte füllen Sie alle Pflichtfelder korrekt aus.", state: "error" });
      form.reportValidity();
      return;
    }

    const values = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    setStatus({ message: "Ihre Anfrage wird sicher übermittelt.", state: "" });

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Die Anfrage konnte gerade nicht gesendet werden.");
      }

      form.reset();
      setStatus({
        message: result.message || "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.",
        state: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Die Anfrage konnte gerade nicht gesendet werden. Bitte schreiben Sie uns direkt per E-Mail.";
      setStatus({ message, state: "error" });
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
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={100} required />
        </div>
        <div className="form-field">
          <label htmlFor="email">E-Mail *</label>
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
          Unternehmen <span>optional</span>
        </label>
        <input id="company" name="company" type="text" autoComplete="organization" maxLength={120} />
      </div>
      <div className="form-field">
        <label htmlFor="message">Nachricht *</label>
        <textarea
          id="message"
          name="message"
          rows={7}
          maxLength={5000}
          required
          placeholder="Worum geht es, was ist das Ziel und gibt es bereits einen zeitlichen Rahmen?"
        />
      </div>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-submit-row">
        <button className="button button--primary" type="submit" disabled={sending}>
          {sending ? (
            "Wird gesendet …"
          ) : (
            <>
              Anfrage senden <span aria-hidden="true">→</span>
            </>
          )}
        </button>
        <p>
          Mit dem Absenden werden Ihre Angaben zur Bearbeitung der Anfrage verarbeitet. Details
          stehen in der{" "}
          <Link href="/datenschutz#kontaktformular">Datenschutzerklärung</Link>.
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
