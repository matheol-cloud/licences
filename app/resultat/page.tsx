import Link from "next/link";
import { redirect } from "next/navigation";

// Hypothèses de l'estimation (à ajuster ici si besoin)
const COUT_MOYEN_PAR_OUTIL_ET_PAR_MOIS = 60;
const PRIX_LICENCES_PAR_AN = 948;

const PERSONNES: Record<string, { nb: number; label: string }> = {
  "18": { nb: 18, label: "10 à 25 personnes" },
  "38": { nb: 38, label: "26 à 50 personnes" },
  "75": { nb: 75, label: "51 à 100 personnes" },
};

const OUTILS: Record<string, { nb: number; label: string }> = {
  "8": { nb: 8, label: "moins de 10 logiciels payants" },
  "18": { nb: 18, label: "entre 10 et 25 logiciels payants" },
  "35": { nb: 35, label: "plus de 25 logiciels payants" },
};

const VERIFICATION: Record<string, { part: number; phrase: string }> = {
  jamais: { part: 0.2, phrase: "vous n'avez jamais vérifié cette liste" },
  "plus-d-un-an": {
    part: 0.15,
    phrase: "vous ne l'avez pas vérifiée depuis plus d'un an",
  },
  "cette-annee": {
    part: 0.08,
    phrase: "vous l'avez vérifiée dans les 12 derniers mois",
  },
};

function texte(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

function euros(n: number): string {
  return n.toLocaleString("fr-FR") + "\u00a0€";
}

export default async function Resultat({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const p = texte(params.p);
  const o = texte(params.o);
  const t = texte(params.t);

  if (
    !Object.hasOwn(PERSONNES, p) ||
    !Object.hasOwn(OUTILS, o) ||
    !Object.hasOwn(VERIFICATION, t)
  ) {
    redirect("/questions");
  }

  const personnes = PERSONNES[p];
  const outils = OUTILS[o];
  const verif = VERIFICATION[t];

  const depense = outils.nb * COUT_MOYEN_PAR_OUTIL_ET_PAR_MOIS * 12;
  const perte = Math.round((depense * verif.part) / 10) * 10;
  const parPersonne = Math.round(depense / personnes.nb);

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px 56px" }}>
      <p
        style={{
          margin: "0 0 20px",
          fontSize: 15,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--pierre)",
        }}
      >
        Votre situation
      </p>

      <h1 style={{ fontSize: 34, margin: "0 0 20px" }}>
        Une équipe de {personnes.label}, {outils.label}, et {verif.phrase}.
      </h1>

      <section
        style={{
          margin: "32px 0",
          padding: "24px 0",
          borderTop: "1px solid var(--filet)",
          borderBottom: "1px solid var(--filet)",
        }}
      >
        <p style={{ margin: "0 0 8px", color: "var(--pierre)", fontSize: 16 }}>
          Estimation de ce que vous payez pour rien
        </p>
        <p
          style={{
            margin: "0 0 8px",
            fontFamily: "var(--font-titre), Georgia, serif",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--brique)",
          }}
        >
          {euros(perte)}
        </p>
        <p style={{ margin: 0 }}>par an, en comptes inutilisés et en doublons.</p>
      </section>

      <p style={{ margin: "0 0 24px" }}>
        Vos logiciels vous coûtent environ <strong>{euros(depense)}</strong> par
        an, soit <strong>{euros(parPersonne)}</strong> par personne. Sans liste
        complète, personne ne sait lesquels servent vraiment.
      </p>

      <h2 style={{ fontSize: 26, margin: "0 0 16px" }}>
        Ce que Licences change
      </h2>

      <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none" }}>
        <li style={{ padding: "14px 0", borderTop: "1px solid var(--filet)" }}>
          Vous voyez tous vos abonnements au même endroit.
        </li>
        <li style={{ padding: "14px 0", borderTop: "1px solid var(--filet)" }}>
          Les comptes inutilisés et les doublons sont repérés pour vous.
        </li>
        <li
          style={{
            padding: "14px 0",
            borderTop: "1px solid var(--filet)",
            borderBottom: "1px solid var(--filet)",
          }}
        >
          Un rappel arrive avant chaque renouvellement : vous décidez avant de
          payer.
        </li>
      </ul>

      {perte >= PRIX_LICENCES_PAR_AN ? (
        <p style={{ margin: "0 0 32px" }}>
          Licences coûte <strong>{euros(PRIX_LICENCES_PAR_AN)}</strong> par an.
          C&apos;est moins que ce que cette estimation montre.
        </p>
      ) : (
        <p style={{ margin: "0 0 32px" }}>
          L&apos;estimation ci-dessus reste prudente. Le chiffre réel se voit
          en saisissant vos vrais abonnements.
        </p>
      )}

      <Link href="/apercu" className="bouton">
        Voir un extrait gratuit
      </Link>

      <p
        style={{
          margin: "32px 0 0",
          fontSize: 14,
          color: "var(--pierre)",
        }}
      >
        Estimation indicative, calculée avec {COUT_MOYEN_PAR_OUTIL_ET_PAR_MOIS}
        &nbsp;€ par mois et par logiciel en moyenne. Elle sera remplacée par
        vos chiffres réels dès que vous aurez saisi vos abonnements.
      </p>
    </main>
  );
}
