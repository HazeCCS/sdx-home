# SDX Solutions UG (haftungsbeschränkt) — Unternehmenswebsite

Moderne Neuerstellung der Unternehmenswebsite auf Basis von Next.js (App Router), React, TypeScript, Tailwind CSS und Motion for React. Das sichtbare Ergebnis entspricht der bisherigen statischen Website; die technische Basis ist vollständig modernisiert und langfristig erweiterbar.

## Tech-Stack

- Next.js 15 (App Router)
- React 19 und TypeScript
- Tailwind CSS v4 (Design-Tokens über `@theme`)
- Motion for React (Interaktionen)
- Node.js (Entwicklung und Build)

## Entwicklung

```bash
npm install
npm run dev
```

Die Website ist danach unter `http://localhost:3000` erreichbar.

Weitere Skripte:

```bash
npm run build
npm run start
npm run typecheck
```

## Projektstruktur

```text
src/
  app/                  App-Router-Seiten, Layout, globals.css, API-Route
    api/contact/        Route Handler für das Kontaktformular
  components/
    layout/             Navbar, Footer
    home/               Hero, Products, Services, Process
    product/            ProductCard
    contact/            ContactForm
    ui/                 Button, Eyebrow, StoreLinks, ContactCta
  lib/                  Seitendaten und Animations-Presets
public/                 Bilder und Favicon
archive/                Unveränderte Sicherung der bisherigen Website
```

## Routen

- `/` Startseite
- `/ueber-uns`
- `/snusdex`
- `/kontakt`
- `/impressum`
- `/datenschutz`

## Kontaktformular

Die Route `src/app/api/contact/route.ts` versendet Anfragen per IONOS SMTP über Nodemailer. Folgende Environment Variables müssen gesetzt werden (siehe `.env.example`):

```text
SMTP_HOST=smtp.ionos.de
SMTP_PORT=465
SMTP_USER=norman@sdxsolutions.de
SMTP_PASS=<Passwort des IONOS-Postfachs>
CONTACT_TO=norman@sdxsolutions.de
```

Das Passwort darf niemals in Git oder in Quellcode geschrieben werden.
