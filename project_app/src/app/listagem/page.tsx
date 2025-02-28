import { DataTable } from "@/_components/DataTable";
import { columns, simulations } from "@/_services/mockSimulations";

export default function SimulationPage() {
  const data = simulations;
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-4xl font-bold">Listagem de Simulações</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
