import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "@/components/modules/Listing/FilterSimulation/Typing";
import { Lead } from "@/types/lead";

import apiClient from "@/src/services/api/apiClient.service";
import { useRouter } from "next/navigation";

export const useListingService = () => {
  const router = useRouter();
  const [filterLeads, setFilterLeads] = useState({
    name: "",
    email: "",
    code: "",
  });
  const [debouncedFilter, setDebouncedFilter] = useState(filterLeads);

  const debouncedUpdate = useMemo(
    () =>
      debounce((newFilter) => {
        setDebouncedFilter(newFilter);
      }, 1000),
    [],
  );

  const handleFilterChange = (newFilter: Filter) => {
    setFilterLeads(newFilter);
    debouncedUpdate(newFilter);
  };

  const {
    data: leads,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["leads", debouncedFilter],
    queryFn: async () => {
      const response = await apiClient.get(
        `/lead?nome=${filterLeads.name}&email=${filterLeads.email}&codigoDaUnidadeConsumidora=${filterLeads.code}`,
      );
      return response.data as Lead[];
    },
    enabled: Boolean(debouncedFilter),
  });
  return {
    filterLeads,
    setFilterLeads,
    leads,
    isLoading,
    handleFilterChange,
    error,
    router,
  };
};

export default useListingService;
