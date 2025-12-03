"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input, LeadCard } from "@/app/components";
import { useListLeads } from "@/lib/hooks/use-leads";
import { useLeadsFilterStore } from "@/lib/stores/leads-filter";
import toast from "react-hot-toast";

export default function ListagemPage() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(!!searchParams.get("success"));

  // Zustand store para filtros
  const filters = useLeadsFilterStore((state) => state.filters);
  const setFilters = useLeadsFilterStore((state) => state.setFilters);
  const clearFilters = useLeadsFilterStore((state) => state.clearFilters);

  // TanStack Query
  const { data: leads = [], isLoading, error } = useListLeads(filters);

  useEffect(() => {
    if (showSuccess) {
      setShowSuccess(false);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao carregar simulações";
      toast.error(errorMessage);
    }
  }, [error]);

  const handleClearFilters = () => {
    clearFilters();
    toast("Filtros limpos", { icon: "🔄" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Simulações</h1>
        <p className="text-gray-600 mb-8">
          Consulte todas as simulações registradas
        </p>

        {/* Filtros */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              label="Nome"
              placeholder="Filtrar por nome..."
              value={filters.name}
              onChange={(e) => setFilters({ name: e.target.value })}
            />

            <Input
              label="Email"
              placeholder="Filtrar por email..."
              value={filters.email}
              onChange={(e) => setFilters({ email: e.target.value })}
            />

            <Input
              label="Código da Unidade"
              placeholder="Filtrar por código..."
              value={filters.codigoDaUnidadeConsumidora}
              onChange={(e) =>
                setFilters({ codigoDaUnidadeConsumidora: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Limpar filtros
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-400 border-t-orange-600"></div>
            <p className="mt-4 text-gray-600">Carregando simulações...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-500 text-lg">
              Nenhuma simulação encontrada
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Ajuste os filtros ou{" "}
              <a
                href="/simular"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                crie uma nova simulação
              </a>
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              {leads.length} simulação{leads.length !== 1 ? "ões" : ""}{" "}
              encontrada{leads.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  id={lead.id}
                  name={lead.name}
                  email={lead.email}
                  phone={lead.phone}
                  units={lead.units}
                  createdAt={lead.createdAt}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
