import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const titre = Fraunces({
  subsets: ["latin"],
  variable: "--font-titre",
  display: "swap",
});

const corps = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-corps",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Licences : repérez les logiciels payés que personne n'utilise",
  description:
    "Retrouvez les abonnements oubliés et les doublons de votre entreprise, avant le prochain renouvellement.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${titre.variable} ${corps.variable}`}>
      <body>{children}</body>
    </html>
  );
}
