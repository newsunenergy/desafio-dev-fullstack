import SimulationForm from "@/_components/SimulationForm";

export default function SimulationPage() {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-4xl font-bold">Simulação</h1>
      <p className="">
        Preencha o formulário abaixo para realizar uma simulação conosco!
      </p>
      <SimulationForm />
    </div>
  );
}
