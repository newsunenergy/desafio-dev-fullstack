import React, { cache } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "./ui/table";
import { Lead } from "@/interfaces/lead";

type Props = {
  filter?: string;
};

type Response = {
  success: boolean;
  leads: Lead[];
};
const BASE_URL = "http://localhost:3333/lead_list";

const LeadList = async ({ filter }: Props) => {
  const URL = filter ? `${BASE_URL}?filter=${filter}` : BASE_URL;

  const res = await fetch(URL, { next: { tags: ["leads-list"] } });

  const json: Response = await res.json();

  const leads = json.leads;

  return (
    <Table>
      {!leads.length ? (
        <TableCaption>Nemhum lead foi encontrado.</TableCaption>
      ) : null}

      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Cod. Unidades</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell className="font-medium">{lead.nomeCompleto}</TableCell>
            <TableCell>{lead.email}</TableCell>
            <TableCell>{lead.telefone}</TableCell>
            <TableCell>
              {lead.unidades.map(
                (uni) => `•${uni.codigoDaUnidadeConsumidora} `
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeadList;
