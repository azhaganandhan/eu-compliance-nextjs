export default function AssessmentCards() {
  const cards = [
    {
      title: "CBAM",
      description: "Carbon Border Adjustment Mechanism",
    },
    {
      title: "DPP",
      description: "Digital Product Passport",
    },
    {
      title: "EUDR",
      description: "EU Deforestation Regulation",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border p-6 shadow-sm transition hover:shadow-lg"
          >
            <h2 className="mb-3 text-2xl font-bold">{card.title}</h2>

            <p className="text-gray-600">{card.description}</p>

            <button className="mt-6 rounded bg-green-600 px-4 py-2 text-white">
              Open
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
