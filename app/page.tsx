const LIEN_BOUTON = "https://buy.stripe.com/test_9B6bITbq4gFMaFu8rQ04800";

export default function Home() {
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
        Licences
      </p>

      <h1 style={{ fontSize: 40, margin: "0 0 20px" }}>
        Vos logiciels payés, que personne n&apos;utilise.
      </h1>

      <p style={{ margin: "0 0 32px", color: "var(--pierre)" }}>
        Retrouvez les abonnements oubliés et les doublons de votre entreprise,
        avant le prochain renouvellement.
      </p>

      <a href={LIEN_BOUTON} className="bouton">
        Commencer
      </a>

      <section
        style={{
          margin: "48px 0",
          padding: "24px 0",
          borderTop: "1px solid var(--filet)",
          borderBottom: "1px solid var(--filet)",
        }}
      >
        <p style={{ margin: "0 0 8px", color: "var(--pierre)", fontSize: 16 }}>
          Exemple : 5 abonnements oubliés à 40&nbsp;€ par mois
        </p>
        <p
          style={{
            margin: "0 0 8px",
            fontFamily: "var(--font-titre), Georgia, serif",
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--brique)",
          }}
        >
          2&nbsp;400&nbsp;€
        </p>
        <p style={{ margin: 0 }}>
          par an, pour des outils que personne n&apos;ouvre. Chaque service
          souscrit dans son coin, et personne n&apos;a la liste complète.
        </p>
      </section>

      <h2 style={{ fontSize: 28, margin: "0 0 24px" }}>
        Ce que vous obtenez
      </h2>

      <ol style={{ margin: "0 0 40px", padding: 0, listStyle: "none" }}>
        <li style={{ padding: "16px 0", borderTop: "1px solid var(--filet)" }}>
          <strong>La liste complète.</strong> Tous vos abonnements, au même
          endroit.
        </li>
        <li style={{ padding: "16px 0", borderTop: "1px solid var(--filet)" }}>
          <strong>Le vrai coût.</strong> Ce que chaque outil vous coûte par an,
          et par personne.
        </li>
        <li
          style={{
            padding: "16px 0",
            borderTop: "1px solid var(--filet)",
            borderBottom: "1px solid var(--filet)",
          }}
        >
          <strong>Un rappel avant chaque renouvellement.</strong> Vous décidez
          avant de payer, pas après.
        </li>
      </ol>

      <a href={LIEN_BOUTON} className="bouton">
        Commencer
      </a>
    </main>
  );
}
