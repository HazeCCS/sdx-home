import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://sdxsolutions.de"),
  title: "SDX Solutions UG (haftungsbeschränkt) — Software & IT-Dienstleistungen",
  description:
    "SDX Solutions UG (haftungsbeschränkt) entwickelt Websites, mobile Apps, individuelle Software und Webservices für Unternehmen und Privatpersonen.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "SDX Solutions UG (haftungsbeschränkt) — Digitale Lösungen",
    description:
      "Entwicklung, Publishing und Vertrieb von Software, mobilen Applikationen und Webservices sowie IT-Dienstleistungen für Unternehmen.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
