export default function AssessmentSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Compliance Assessments
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6 shadow">
            <h3 className="text-xl font-semibold">CBAM</h3>
            <p className="mt-2 text-gray-600">
              Carbon Border Adjustment Mechanism
            </p>
          </div>

          <div className="rounded-lg border p-6 shadow">
            <h3 className="text-xl font-semibold">DPP</h3>
            <p className="mt-2 text-gray-600">
              Digital Product Passport
            </p>
          </div>

          <div className="rounded-lg border p-6 shadow">
            <h3 className="text-xl font-semibold">EUDR</h3>
            <p className="mt-2 text-gray-600">
              EU Deforestation Regulation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}