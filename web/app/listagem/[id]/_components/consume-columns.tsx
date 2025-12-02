"use client";
import { Consumo } from "@/app/_types/lead.type";
import { ColumnDef } from "@tanstack/react-table";

export const consumoColumns: ColumnDef<Consumo>[] = [
  {
    accessorKey: "mesDoConsumo",
    header: "Mês Ref.",
    cell: ({ row }) =>
      new Date(row.original.mesDoConsumo)
        .toLocaleDateString("pt-BR", {
          month: "short",
          year: "numeric",
        })
        .replace(". de ", "/")
        .toUpperCase(),
  },
  {
    accessorKey: "consumoForaPontaEmKWH",
    header: "kWh",
  },
];
