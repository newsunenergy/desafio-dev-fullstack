"use client";

import SimulationTable from "@/components/modules/Listing/SimulationTable/SimulationTable";
import FilterSimulation from "@/components/modules/Listing/FilterSimulation/FilterSimulation";
import { Loader2 } from "lucide-react";
import { useListingService } from "@/services/Listing/listing.service";
import { Button } from "@/components/ui/button";
import { general_routes } from "@/src/routes/general";

const Listing = () => {
  const { filterLeads, handleFilterChange, leads, isLoading, error, router } =
    useListingService();

  return (
    <div className="mt-28 w-[900px] h-[600px] bg-box rounded-xl border border-textInput overflow-auto">
      <FilterSimulation
        filterValue={filterLeads}
        setFilterValue={handleFilterChange}
      />
      <SimulationTable tableData={leads} />
      {isLoading && (
        <div className="flex justify-center items-center w-full h-[80%]">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center w-full h-[80%]">
          Infelizmente não foi possivel listar as simulações
        </div>
      )}
      {leads?.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-[80%]">
          Parece que não há nenhuma simulação
          <Button
            className="bg-[#8D7AFF] max-w-60"
            onClick={() => router.push(general_routes.simulate)}
          >
            Criar Simulação
          </Button>
        </div>
      )}
    </div>
  );
};

export default Listing;
