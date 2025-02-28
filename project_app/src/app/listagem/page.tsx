"use client";
import { DataTable } from "@/_components/DataTable";
import { FilterSidebar } from "@/_components/Filters";
import { SearchBar } from "@/_components/SearchBar";
import { columns, simulations } from "@/_services/mockSimulations";
import { useState } from "react";

export default function SimulationList() {
  const data = simulations;

  const [filters, setFilters] = useState<{
    enquadramento: string[];
    modeloFasico: string[];
  }>({ enquadramento: [], modeloFasico: [] });

  const [search, setSearch] = useState<{
    type: "nome" | "email" | "codigoDaUnidadeConsumidora";
    term: string;
  }>({ type: "nome", term: "" });

  const handleApplyFilters = (newFilters: {
    enquadramento: string[];
    modeloFasico: string[];
  }) => {
    setFilters(newFilters);
  };

  const handleSearch = (
    type: "nome" | "email" | "codigoDaUnidadeConsumidora",
    term: string
  ) => {
    setSearch({ type, term });
  };

  const filteredData = simulations.filter((simulation) => {
    const matchesFilters =
      (filters.enquadramento.length === 0 ||
        filters.enquadramento.includes(simulation.enquadramento)) &&
      (filters.modeloFasico.length === 0 ||
        filters.modeloFasico.includes(simulation.modeloFasico));

    const matchesSearch = simulation[search.type]
      .toLowerCase()
      .includes(search.term.toLowerCase());

    return matchesFilters && matchesSearch;
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-4xl font-bold m-5">Listagem de Simulações</h1>

      <div className="flex flex-row gap-3">
        <FilterSidebar onApplyFilters={handleApplyFilters} />
        <div className="flex flex-col gap-3">
          <SearchBar onSearch={handleSearch} />
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
}
