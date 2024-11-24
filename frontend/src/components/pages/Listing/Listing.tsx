"use client";

import SimulationTable from "@/components/modules/Listing/SimulationTable/SimulationTable";
import FilterSimulation from "@/components/modules/Listing/FilterSimulation/FilterSimulation";
import { Loader2 } from "lucide-react";
import { useListingService } from "@/services/Listing/listing.service";

const Listing = () => {
  const { filterLeads, handleFilterChange, leads, isLoading } =
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
    </div>
  );
};

export default Listing;
