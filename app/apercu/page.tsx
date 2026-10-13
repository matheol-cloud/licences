"use client";

import { useState } from "react";

type Ligne = { nom: string; prix: string; users: string };

const LIGNES_VIDES: Ligne[] = [
  { nom: "", prix: "", users: "" },
  { nom: "", prix: "", users: "" },
  { nom: "", prix: "", users: "" },
];

function nombre(s: string): number {
  const n = parseFloat(s.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function euros(n: number): string {
  return (
    n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + "\u00a0€"
  );
}

const champ = {
  width: "100%",
  padding: "14px 12px",
  fontFamily: "inherit",
  fontSize: 18,
  color: "var(--bleu)",
  background: "#ffffff",
  border: "2px solid var(--bleu)",
  borderRadius: 6,
} as const;

const etiquette = {
  display: "block",
  margin: "0 0 4px",
  fontSize: 14,
  color: "var(--pierre)",
} as const;

const VERROUILLE = [
  {
    titre: "Les comptes que personne n'utilise",
    texte: "Repérés automatiquement, avec ce qu'ils vous coûtent.",
  },
  {
    titre: "Les outils en double",
    texte: "Deux logiciels qui font la même chose, signalés.",
  },
  {
    titre: "Les rappels avant renouvellement",
    texte: "Un e-mail avant chaque échéance annuelle.",
  },
  {
    titre: "Tous vos abonnements",
    texte: "Sans limite, saisis à la main ou lus depuis vos relevés.",
  },
];

export default function Apercu() {
  const [lignes, setLignes] = useState<Ligne[]>(LIGNES_VIDES);

  function modifier(i: number, cle: keyof Ligne, valeur: string) {
    setLignes(lignes.map((l, k) => (k === i ? { ...l, [cle]: valeur } : l)));
  }

  const total = lignes.reduce((somme, l) => somme + nombre(l.prix) * 12, 0);

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
        Extrait gratuit
      </p>

      <h1 style={{ fontSize: 34, margin: "0 0 16px" }}>
        Ce que vos logiciels vous coûtent vraiment.
      </h1>

      <p style={{ margin: "0 0 32px", color: "var(--pierre)" }}>
        Saisissez jusqu&apos;à 3 logiciels payants. Le calcul se fait sur votre
        téléphone, rien n&apos;est enregistré.
      </p>

      <div style={{ display: "grid", gap: 28, marginBottom: 32 }}>
        {lignes.map((l, i) => {
          const prix = nombre(l.prix);
          const users = Math.round(nombre(l.users));
          const annuel = prix * 12;
          return (
            <div
              key={i}
              style={{ paddingTop: 20, borderTop: "1px solid var(--filet)" }}
            >
              <label style={etiquette} htmlFor={`nom-${i}`}>
                Logiciel {i + 1}
              </label>
              <input
                id={`nom-${i}`}
                type="text"
                value={l.nom}
                maxLength={60}
                placeholder="Par exemple : Slack"
                onChange={(e) => modifier(i, "nom", e.target.value)}
                style={{ ...champ, marginBottom: 12 }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label style={etiquette} htmlFor={`prix-${i}`}>
                    Prix par mois (€)
                  </label>
                  <input
                    id={`prix-${i}`}
                    type="text"
                    inputMode="decimal"
                    value={l.prix}
                    maxLength={8}
                    placeholder="40"
                    onChange={(e) => modifier(i, "prix", e.target.value)}
                    style={champ}
                  />
                </div>
                <div>
                  <label style={etiquette} htmlFor={`users-${i}`}>
                    Personnes
                  </label>
                  <input
                    id={`users-${i}`}
                    type="text"
                    inputMode="numeric"
                    value={l.users}
                    maxLength={4}
                    placeholder="10"
                    onChange={(e) => modifier(i, "users", e.target.value)}
                    style={champ}
                  />
                </div>
              </div>

              {prix > 0 && (
                <p style={{ margin: "14px 0 0" }}>
                  <strong>{euros(annuel)}</strong> par an
                  {users > 0 && (
                    <>
                      , soit{" "}
                      <strong style={{ color: "var(--brique)" }}>
                        {euros(annuel / users)}
                      </strong>{" "}
                      par personne
                    </>
                  )}
                  .
                </p>
              )}
            </div>
          );
        })}
      </div>

      {total > 0 && (
        <section
          style={{
            margin: "0 0 48px",
            padding: "24px 0",
            borderTop: "1px solid var(--filet)",
            borderBottom: "1px solid var(--filet)",
          }}
        >
          <p style={{ margin: "0 0 8px", color: "var(--pierre)", fontSize: 16 }}>
            Total de ces logiciels
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-titre), Georgia, serif",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--brique)",
            }}
          >
            {euros(total)}
          </p>
          <p style={{ margin: "8px 0 0" }}>par an.</p>
        </section>
      )}

      <h2 style={{ fontSize: 26, margin: "0 0 8px" }}>
        La suite de votre analyse
      </h2>
      <p style={{ margin: "0 0 20px", color: "var(--pierre)" }}>
        Disponible avec l&apos;abonnement.
      </p>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
        {VERROUILLE.map((v) => (
          <li
            key={v.titre}
            style={{
              padding: "16px",
              border: "2px dashed var(--filet)",
              borderRadius: 6,
              color: "var(--pierre)",
            }}
          >
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Verrouillé
            </p>
            <p style={{ margin: "0 0 4px", fontWeight: 700, color: "var(--bleu)" }}>
              {v.titre}
            </p>
            <p style={{ margin: 0, fontSize: 16 }}>{v.texte}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
