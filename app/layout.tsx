import type { Metadata, Viewport } from "next";

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
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
