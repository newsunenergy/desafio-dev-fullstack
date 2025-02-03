import React, { useCallback, useContext } from "react";
import { ILead } from "@/types/leads";
import { z } from 'zod';
import { leadsApi } from '../api/api';

interface ILeadProviderProps{
    children: React.ReactNode;
}

interface IGetLeadsProps {
    name?: string;
    email?: string;
    ConsumerUnitCode?: string;
}

interface IPaginationResponse<T> {
    data: T;
    total: number;
    page: number;
    pageSize: number;
}


interface ILeadContextProp {
    getLeads: (
        props: IGetLeadsProps,

    ) => Promise<IPaginationResponse<ILead[]>>;
    getLead: (id: string) => Promise<ILead>
    createLead: (data: CreateLeadSchema) => Promise<ILead>
    deleteLead: (id: string) => Promise<void>;
}

export const createLeadSchema = z.object({
    name: z.string().min(8, "Nome é obrigatório"),
    email: z.string().email("Email tem que ser válido"),
    phone: z.string(),
    file: z
    .custom<File>((file) => file instanceof File, { message: 'Por favor, selecione um arquivo.' }),
})

export type  CreateLeadSchema = z.infer<typeof createLeadSchema>

const UserContext = React.createContext<ILeadContextProp | null>(null);

export const LeadProvider = ({children}: ILeadProviderProps) => {

    const getLeads = useCallback(
        async (props: IGetLeadsProps) => {
            const response = await leadsApi.getLeads(props);
            return {
                data: response,
                total: response.length,
                page: 1,
                pageSize: response.length
            };
        },
        []
    );
      

    const getLead = useCallback(
        async (id: string) => {
            return await leadsApi.getLeadById(id);
        },
     []
    );

    const createLead = useCallback(
        async (payload: CreateLeadSchema) => {
            const formData = new FormData();
            formData.append('name', payload.name);
            formData.append('email', payload.email);
            formData.append('phone', payload.phone);
            formData.append('file', payload.file);
            return await leadsApi.createLead(formData);
        },
        []
    );
      
   const deleteLead = useCallback(
        async (id: string) => {
            await leadsApi.deleteLead(id);
        },
        []
    );

      return(
        <UserContext.Provider
        value={{getLead, getLeads, createLead, deleteLead}}>
            {children}
        </UserContext.Provider>
      )
}

export const useLeads = () => {
    const newsun = useContext(UserContext)
    if (newsun === null) {
        throw new Error (
           'useLead() called outside of a LeadProvider?',
        )
    }
    return newsun
}