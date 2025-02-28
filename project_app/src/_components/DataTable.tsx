"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-md border w-full max-w-6xl mx-auto overflow-x-auto">
      <Table className=" min-w-[1000px]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className=" bg-gray-100 shadow-md">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-center text-[#303672] text-lg"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className=" text-center text-xl">
              <TableCell colSpan={columns.length}>Sem resultados.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className=" flex items-center justify-center space-x-2 py-4">
        {Array.from({ length: table.getPageCount() }, (_, idx) => (
          <Button
            key={idx}
            variant={
              table.getState().pagination.pageIndex === idx
                ? "default"
                : "outline"
            }
            size="sm"
            onClick={() => table.setPageIndex(idx)}
          >
            {idx + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
