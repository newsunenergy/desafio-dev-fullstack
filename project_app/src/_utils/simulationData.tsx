"use client";
import { ColumnDef } from "@tanstack/react-table";

export type SimulationData = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  codigoDaUnidadeConsumidora: string;
  enquadramento: string;
  modeloFasico: string;
  valor: number;
};

export const columns: ColumnDef<SimulationData>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
    size: 160,
    cell: ({ row }) => (
      <div className="truncate w-[160px] text-center">
        {row.getValue("nome")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
    cell: ({ row }) => (
      <div className="truncate text-center w-[200px]">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    size: 130,
    cell: ({ row }) => (
      <div className="w-[130px] text-center">{row.getValue("telefone")}</div>
    ),
  },
  {
    accessorKey: "codigoDaUnidadeConsumidora",
    header: "Cód. Unidade",
    size: 160,
    cell: ({ row }) => (
      <div className="w-[160px] text-center">
        {row.getValue("codigoDaUnidadeConsumidora")}
      </div>
    ),
  },
  {
    accessorKey: "enquadramento",
    header: "Enquadramento",
    size: 120,
    cell: ({ row }) => (
      <div className="w-[120px] text-center">
        {row.getValue("enquadramento")}
      </div>
    ),
  },
  {
    accessorKey: "modeloFasico",
    header: "Mod. Fásico",
    size: 120,
    cell: ({ row }) => (
      <div className="w-[120px] text-center">
        {row.getValue("modeloFasico")}
      </div>
    ),
  },
  {
    accessorKey: "valor",
    header: () => <div className="text-center w-[120px]">Valor</div>,
    size: 100,
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valor"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor);

      return (
        <div className="text-right font-medium w-[100px]">{formatted}</div>
      );
    },
  },
];
