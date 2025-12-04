import { queryClient } from "@/src/contants";
import { LeadFormData } from "@/src/schemas";
import { createLead } from "@/src/utils";
import { useMutation } from "@tanstack/react-query";
import { create } from "domain";

export function useCreateLead() {
    return useMutation({
        mutationFn: createLead,
        onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['leads'],
			})
		},
    })
}