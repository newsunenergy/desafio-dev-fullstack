import { FullLead } from "@/src/schemas"
import { LeadsDrawer } from "./LeadsDrawer"
import { LeadsDialog } from "./LeadsDialog"

export type LeadsDetailsProps = {
    data: FullLead,
    trigger: React.ReactNode
}

export function LeadsDetails({data,trigger}: LeadsDetailsProps) {
    return <div>
        <div className="hidden md:block"><LeadsDialog trigger={trigger} data={data} /></div>
        <div className="block md:hidden"><LeadsDrawer trigger={trigger} data={data} /></div>
    </div>
}