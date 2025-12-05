import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Simule sua{" "}
              <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Compensação Energética
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              A NewSun Energy oferece soluções inovadoras em energia solar.
              Calcule quanto você pode economizar na sua conta de luz.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/simular"
                className="inline-flex items-center justify-center rounded-md bg-linear-to-r from-orange-400 to-orange-500 px-6 py-3 text-base font-semibold text-white hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
              >
                Começar Simulação
              </Link>
              <Link
                href="/listagem"
                className="inline-flex items-center justify-center rounded-md border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-all"
              >
                Ver Simulações
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher a NewSun Energy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-linear-to-r from-orange-400 to-orange-500">
                <span className="text-xl text-white">☀️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Energia Solar Confiável
              </h3>
              <p className="text-gray-600">
                Tecnologia de ponta com painéis fotovoltaicos de última geração
                para máximo rendimento.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-linear-to-r from-orange-400 to-orange-500">
                <span className="text-xl text-white">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Economia Garantida
              </h3>
              <p className="text-gray-600">
                Reduza sua conta de luz em até 80% com nossa solução completa de
                energia solar.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-linear-to-r from-orange-400 to-orange-500">
                <span className="text-xl text-white">🌍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sustentabilidade
              </h3>
              <p className="text-gray-600">
                Contribua para um planeta mais limpo utilizando energia 100%
                renovável e sustentável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-linear-to-r from-blue-600 to-blue-700 p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-bold mb-4">Pronto para economizar?</h2>
          <p className="mb-8 text-blue-100">
            Faça seu cadastro! Insira seus dados e uma fatura de energia. Nossos
            especialistas entrarão em contato com você.
          </p>
          <Link
            href="/simular"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 hover:bg-blue-50 transition-all"
          >
            Simular Agora
          </Link>
        </div>
      </section>
    </div>
  );
}
