import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";

import { LeadsDetailsProps } from ".";
import { UnitsTable } from "./UnitsTable";
import { useState } from "react";
import { ConsumeHistory } from "./ConsumeHistory";
import { Button } from "@/src/components/ui/button";
import { MoveLeft, X } from "lucide-react";

export function LeadsDialog({data,trigger}: LeadsDetailsProps) {
    const [unitId, setUnitId] = useState<string | null >(null)
  
    return <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="min-w-min max-h-[50vh] overflow-auto">
      <DialogHeader>
        <div className="justify-between flex items-center">
          <DialogTitle>Informações:</DialogTitle>
          <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={() => setUnitId(null)}>
                <X />
              </Button>
          </DialogClose>
          </div>
      </DialogHeader>
      <div>
          {
            unitId 
            ? <div className="flex flex-col gap-2">
              <Button className="w-min" onClick={() => setUnitId(null)}><MoveLeft /></Button>
              <ConsumeHistory history={data.unidades.find(unidade => unidade.id === unitId)!.historicoDeConsumoEmKWH} />
            </div>
            : <UnitsTable setUnitId={setUnitId} units={data.unidades} />
          }
      </div>
    </DialogContent>
  </Dialog>
}