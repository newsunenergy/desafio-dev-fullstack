import { Button } from "@/src/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Newspaper } from "lucide-react";
import { Consumo, Unidade } from "@/src/schemas";
import { formatCurrencyBRL } from "@/src/utils/format-currency";

type ConsumeHistoryProps = {
    history: Consumo[]
}

export function ConsumeHistory({history}: ConsumeHistoryProps) {
    return <>
    <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3">
      {
        history.map((consumo) => 
          {
            const month = new Date(consumo.mesDoConsumo).toLocaleString('pt-BR', { month: 'long' })
            const year = new Date(consumo.mesDoConsumo).toLocaleString('pt-BR', { year: 'numeric' })
            return <div key={consumo.id} className="p-2 border rounded-md flex flex-col gap-2 ">
            <h4 className="text-sm font-semibold capitalize">{month}/{year}</h4>
            <p className="text-sm">{consumo.consumoForaPontaEmKWH} KWH</p>
          </div>
          }
        )  
      }
    </div>
  </>
}