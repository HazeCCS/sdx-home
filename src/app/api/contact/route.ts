import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NO_STORE = { "Cache-Control": "no-store" } as const;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function json(body: Record<string, unknown>, status: number, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { ...NO_STORE, ...headers } });
}

export async function POST(request: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const name = clean(payload.name);
  const email = clean(payload.email).toLowerCase();
  const company = clean(payload.company);
  const message = clean(payload.message);
  const website = clean(payload.website);

  if (website) {
    return json({ message: "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet." }, 200);
  }

  if (name.length < 2 || name.length > 100) {
    return json({ message: "Bitte geben Sie einen gültigen Namen ein." }, 400);
  }

  if (email.length > 160 || !EMAIL_PATTERN.test(email)) {
    return json({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }, 400);
  }

  if (company.length > 120) {
    return json({ message: "Der Unternehmensname ist zu lang." }, 400);
  }

  if (message.length < 10 || message.length > 5000) {
    return json({ message: "Die Nachricht muss zwischen 10 und 5.000 Zeichen lang sein." }, 400);
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || "smtp.ionos.de";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const recipient = process.env.CONTACT_TO || "contact@sdxsolutions.de";

  if (!smtpUser || !smtpPassword) {
    console.error("Contact form SMTP credentials are not configured.");
    return json(
      {
        message:
          "Das Formular ist noch nicht vollständig eingerichtet. Bitte schreiben Sie direkt an contact@sdxsolutions.de.",
      },
      503,
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const safeName = name.replace(/[\r\n]+/g, " ");
  const companyLine = company ? company : "Nicht angegeben / Privatperson";
  const text = [
    "Neue Projektanfrage über sdxsolutions.de",
    "",
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Unternehmen: ${companyLine}`,
    "",
    "Nachricht:",
    message,
  ].join("\n");

  const html = `
        <h2>Neue Projektanfrage über sdxsolutions.de</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}<br>
        <strong>E-Mail:</strong> ${escapeHtml(email)}<br>
        <strong>Unternehmen:</strong> ${escapeHtml(companyLine)}</p>
        <p><strong>Nachricht:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

  try {
    await transporter.sendMail({
      from: `"SDX Website" <${smtpUser}>`,
      to: recipient,
      replyTo: { name: safeName, address: email },
      subject: `Neue Projektanfrage von ${safeName}`,
      text,
      html,
    });

    return json({ message: "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet." }, 200);
  } catch (error) {
    console.error(
      "Contact form delivery failed:",
      error instanceof Error ? error.message : error,
    );
    return json(
      {
        message:
          "Die Anfrage konnte gerade nicht gesendet werden. Bitte schreiben Sie direkt an contact@sdxsolutions.de.",
      },
      502,
    );
  }
}
