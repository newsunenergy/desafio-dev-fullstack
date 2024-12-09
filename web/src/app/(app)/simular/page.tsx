import { SimulationForm } from '@/components/simulation-form'

export default function SimularPage() {
  return (
    <div className="py-10 px-3">
      <main className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-2xl font-bold pb-10">
          Registrar uma nova simulação
        </h1>

        <SimulationForm />
      </main>
    </div>
  )
}
