import SimulationForm from "@/_components/SimulationForm";

export default function SimulationPage() {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-4xl font-bold m-5">Simulação</h1>
      <p className=" text-lg text-[#303672]">
        Preencha o formulário abaixo para realizar uma simulação conosco!
      </p>
      <SimulationForm />
    </div>
  );
}
