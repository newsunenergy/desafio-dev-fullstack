"use client";
import { DataTable } from "@/_components/DataTable";
import { FilterSidebar } from "@/_components/Filters";
import { SearchBar } from "@/_components/SearchBar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/_services/api";
import {
  columns,
  SimulatioData,
  simulations,
} from "@/_services/mockSimulations";
import { useEffect, useState } from "react";

export default function SimulationList() {
  //  const data = simulations;

  const [data, setData] = useState<SimulatioData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const response = await api.get("/simulacao");
        const formattedData = response.data.map((simulacao: any) => ({
          id: simulacao.id,
          nome: simulacao.lead.nome,
          email: simulacao.lead.email,
          telefone: simulacao.lead.telefone,
          codigoDaUnidadeConsumidora:
            simulacao.unidades[0]?.unidade.codigoDaUnidadeConsumidora,
          enquadramento: simulacao.unidades[0]?.unidade.enquadramento || "N/A",
          modeloFasico: simulacao.unidades[0]?.unidade.modeloFasico || "N/A",
          valor: 0,
        }));
        setData(formattedData);
      } catch (error) {
        setError("Erro ao buscar simulações. Tente novamente mais tarde");
      } finally {
        setLoading(false);
      }
    };
    fetchSimulations();
  }, []);

  const handleSearch = (
    type: "nome" | "email" | "codigoDaUnidadeConsumidora",
    term: string
  ) => {
    setSearch({ type, term });
  };

  const filteredData = data.filter((simulation) => {
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

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Erro!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <div className="flex flex-row gap-3">
          <FilterSidebar onApplyFilters={handleApplyFilters} />
          <div className="flex flex-col gap-3">
            <SearchBar onSearch={handleSearch} />
            <DataTable columns={columns} data={filteredData} />
          </div>
        </div>
      )}
    </div>
  );
}
