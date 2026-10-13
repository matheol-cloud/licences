export default function Home() {
  return (
    <main
      style={{
        maxWidth: 560,
        margin: "0 auto",
        padding: "40px 20px",
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ fontSize: 32, lineHeight: 1.15, margin: "0 0 16px" }}>
        Vos logiciels payés, que personne n&apos;utilise.
      </h1>

      <p style={{ fontSize: 18, margin: "0 0 24px" }}>
        Un compte payé après un départ, deux outils qui font la même chose :
        la facture monte sans que personne ne décide. Licences vous montre
        où part l&apos;argent.
      </p>

      <ul style={{ paddingLeft: 20, margin: "0 0 32px" }}>
        <li>La liste complète de vos abonnements, au même endroit</li>
        <li>Le coût annuel de chaque outil et par personne</li>
        <li>Un rappel avant chaque renouvellement</li>
      </ul>

      <a
        href="https://buy.stripe.com/test_9B6bITbq4gFMaFu8rQ04800"
        style={{
          display: "block",
          textAlign: "center",
          padding: "16px 20px",
          fontSize: 18,
          fontWeight: 700,
          color: "#ffffff",
          background: "#111111",
          borderRadius: 8,
          textDecoration: "none",
        }}
      >
        Commencer
      </a>
    </main>
  );
}
