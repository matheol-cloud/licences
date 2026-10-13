"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    cle: "p",
    titre: "Combien de personnes travaillent dans votre entreprise ?",
    choix: [
      { valeur: "18", label: "10 à 25 personnes" },
      { valeur: "38", label: "26 à 50 personnes" },
      { valeur: "75", label: "51 à 100 personnes" },
    ],
  },
  {
    cle: "o",
    titre: "À peu près, combien de logiciels payants vos équipes utilisent-elles ?",
    choix: [
      { valeur: "8", label: "Moins de 10" },
      { valeur: "18", label: "Entre 10 et 25" },
      { valeur: "35", label: "Plus de 25" },
    ],
  },
  {
    cle: "t",
    titre: "Quand avez-vous vérifié pour la dernière fois la liste de ces abonnements ?",
    choix: [
      { valeur: "jamais", label: "Jamais" },
      { valeur: "plus-d-un-an", label: "Il y a plus d'un an" },
      { valeur: "cette-annee", label: "Dans les 12 derniers mois" },
    ],
  },
];

export default function Questions() {
  const router = useRouter();
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Record<string, string>>({});

  const question = QUESTIONS[etape];

  function choisir(valeur: string) {
    const suite = { ...reponses, [question.cle]: valeur };
    setReponses(suite);
    if (etape === QUESTIONS.length - 1) {
      router.push("/resultat?" + new URLSearchParams(suite).toString());
    } else {
      setEtape(etape + 1);
    }
  }

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 56px" }}>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={QUESTIONS.length}
        aria-valuenow={etape + 1}
        style={{
          height: 6,
          background: "var(--filet)",
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${((etape + 1) / QUESTIONS.length) * 100}%`,
            background: "var(--brique)",
            transition: "width 0.2s",
          }}
        />
      </div>

      <p style={{ margin: "0 0 24px", fontSize: 15, color: "var(--pierre)" }}>
        Question {etape + 1} sur {QUESTIONS.length}
      </p>

      <h1 style={{ fontSize: 30, margin: "0 0 28px" }}>{question.titre}</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {question.choix.map((c) => (
          <button
            key={c.valeur}
            type="button"
            onClick={() => choisir(c.valeur)}
            style={{
              padding: "18px 16px",
              textAlign: "left",
              fontFamily: "inherit",
              fontSize: 18,
              color: "var(--bleu)",
              background: "#ffffff",
              border: "2px solid var(--bleu)",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {etape > 0 && (
        <button
          type="button"
          onClick={() => setEtape(etape - 1)}
          style={{
            marginTop: 24,
            padding: "12px 0",
            fontFamily: "inherit",
            fontSize: 16,
            color: "var(--pierre)",
            background: "none",
            border: "none",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Retour
        </button>
      )}
    </main>
  );
}
