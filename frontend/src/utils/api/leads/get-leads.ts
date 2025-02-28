import { FullLead } from "@/src/schemas";
import { api } from "..";

export async function getLeads(search: string): Promise<FullLead[]> {
    return api.get('/leads', {
        params: {
            query: search,
        }
    }).then(res => res.data)
}