import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SimulationTableProps } from "./Typing";

const SimulationTable = ({ tableData }: {tableData: SimulationTableProps[] | undefined}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-textInput">
          <TableHead className="text-left text-[#646272] text-xs font-bold py-[10px] px-7">
            Nome
          </TableHead>
          <TableHead className="text-left text-[#646272] text-xs font-bold py-[10px] px-7">
            Email
          </TableHead>
          <TableHead className="text-left text-[#646272] text-xs font-bold py-[10px] px-7">
            Telefone
          </TableHead>
          <TableHead className="text-left text-[#646272] text-xs font-bold py-[10px] px-7">
            Unidades
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.map((invoice) => (
          <TableRow key={invoice.id} className="border-textInput">
            <TableCell className="font-medium text-xs py-[10px] px-7">
              {invoice.nomeCompleto}
            </TableCell>
            <TableCell className="text-left text-xs py-[10px] px-7">
              {invoice.email}
            </TableCell>
            <TableCell className="text-left text-xs py-[10px] px-7">
              {invoice.telefone}
            </TableCell>
            <TableCell className="text-left text-xs py-[10px] px-7">
              <p className="bg-[#8D7AFF] max-w-7 p-1 text-center rounded-lg">
                {invoice.unidades.length}
              </p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SimulationTable;
