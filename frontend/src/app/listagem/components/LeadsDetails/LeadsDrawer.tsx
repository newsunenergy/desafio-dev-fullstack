import { Button } from "@/src/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/src/components/ui/drawer";
import { LeadsDetailsProps } from ".";
import { UnitsTable } from "./UnitsTable";
import { useState } from "react";
import { ConsumeHistory } from "./ConsumeHistory";
import { MoveLeft } from "lucide-react";



export function LeadsDrawer({data,trigger}: LeadsDetailsProps) {
    const [unitId, setUnitId] = useState<string | null >(null)

    return <Drawer>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent >
        <DrawerHeader>
            <DrawerTitle>Informações:</DrawerTitle>
            <div className="max-h-[60vh] overflow-auto mt-2">
                <div>
                {
                    unitId 
                    ? <div className="flex flex-col gap-2">
                      <Button onClick={() => setUnitId(null)}><MoveLeft /> Voltar</Button>
                      <ConsumeHistory history={data.unidades.find(unidade => unidade.id === unitId)!.historicoDeConsumoEmKWH} />
                    </div>
                    : <UnitsTable setUnitId={setUnitId} units={data.unidades} />
                }
                </div>
            </div>
        </DrawerHeader>
        </DrawerContent>
  </Drawer>
}