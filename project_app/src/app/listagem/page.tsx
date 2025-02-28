"use client";
import { DataTable } from "@/_components/DataTable";
import { FilterSidebar } from "@/_components/Filters";
import { SearchBar } from "@/_components/SearchBar";
import { columns, simulations } from "@/_services/mockSimulations";

export default function SimulationList() {
  const data = simulations;

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-4xl font-bold m-5">Listagem de Simulações</h1>

      <div className="flex flex-row gap-3">
        <FilterSidebar />
        <div className="flex flex-col gap-3">
          <SearchBar />
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
