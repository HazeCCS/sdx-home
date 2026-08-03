# SDX Solutions UG (haftungsbeschränkt) — Unternehmenswebsite

Unternehmenswebsite für Softwareentwicklung, mobile Apps, Websites, Webservices, Publishing und IT-Dienstleistungen.

## Seiten

- Startseite (`index.html`)
- Über SDX Solutions (`ueber-uns.html`)
- Snusdex (`snusdex.html`)
- Kontakt und Projektanfrage (`kontakt.html`)
- Impressum (`impressum.html`)
- Datenschutzerklärung (`datenschutz.html`)

## Lokal ansehen

Abhängigkeiten installieren und die statischen Seiten lokal starten:

```bash
npm install
python3 -m http.server 4173
```

Danach ist die Website unter `http://127.0.0.1:4173` erreichbar.

Der einfache Python-Server führt die Vercel-Funktion unter `/api/contact` nicht aus. Das Formular funktioniert nach dem Deployment auf Vercel.

## Kontaktformular auf Vercel einrichten

Die Serverless-Funktion `api/contact.js` versendet Anfragen per IONOS SMTP. In den Projekteinstellungen bei Vercel müssen folgende Environment Variables für Production, Preview und bei Bedarf Development hinterlegt werden:

```text
SMTP_HOST=smtp.ionos.de
SMTP_PORT=465
SMTP_USER=norman@sdxsolutions.de
SMTP_PASS=<Passwort des IONOS-Postfachs>
CONTACT_TO=norman@sdxsolutions.de
```

Das Passwort darf niemals in Git oder in eine HTML-/JavaScript-Datei geschrieben werden. Nach dem Setzen der Variablen muss das Vercel-Deployment erneut ausgelöst werden.
