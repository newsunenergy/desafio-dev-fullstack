import { Button } from "@/src/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { BookOpen, Newspaper } from "lucide-react";
import { Unidade } from "@/src/schemas";
import { formatCurrencyBRL } from "@/src/utils/format-currency";

type UnitsTableProps = {
    units: Unidade[]
    setUnitId: (id: string) => void
}

export function UnitsTable({units, setUnitId}: UnitsTableProps) {
    return <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>M. Fasico</TableHead>
          <TableHead>Enquadramento</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Histórico</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {units.map((unit) => (
          <>
            <TableRow key={unit.id}>
            <TableCell>{unit.codigoDaUnidadeConsumidora}</TableCell>
            <TableCell>{unit.modeloFasico}</TableCell>
            <TableCell>{unit.enquadramento}</TableCell>
            <TableCell>{formatCurrencyBRL(unit.consumoEmReais)}</TableCell>
            <TableCell>
                <Button onClick={() => {
                  setUnitId(unit.id)
                }}><Newspaper /></Button>
            </TableCell>
          </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  </>
}