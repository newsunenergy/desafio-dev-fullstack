import { getLeads } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";

export function useGetLeads(search: string) {
  return useQuery({
    queryKey: ["leads", search],
    queryFn: async () => await getLeads(search),
  })
}