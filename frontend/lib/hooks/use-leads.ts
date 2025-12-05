import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateLeadRequest } from "@/types";
import { api } from "../api";

export type LeadsFilters = {
  name?: string;
  email?: string;
  codigoDaUnidadeConsumidora?: string;
};

// Query Keys
export const leadsKeys = {
  all: ["leads"] as const,
  lists: () => [...leadsKeys.all, "list"] as const,
  list: (filters: LeadsFilters) => [...leadsKeys.lists(), filters] as const,
  details: () => [...leadsKeys.all, "detail"] as const,
  detail: (id: string) => [...leadsKeys.details(), id] as const,
};

// Queries
export function useListLeads(filters?: {
  name?: string;
  email?: string;
  codigoDaUnidadeConsumidora?: string;
}) {
  return useQuery({
    queryKey: leadsKeys.list(filters ?? {}),
    queryFn: () => api.listLeads(filters),
  });
}

export function useLeadById(id: string) {
  return useQuery({
    queryKey: leadsKeys.detail(id),
    queryFn: () => api.getLeadById(id),
    enabled: !!id,
  });
}

// Mutations
export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeadRequest) => api.createLead(data),
    onSuccess: () => {
      // Invalida cache de leads depois de criar um novo
      queryClient.invalidateQueries({
        queryKey: leadsKeys.lists(),
      });
    },
  });
}
