import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Button } from "@/src/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip"
import { BookOpen } from "lucide-react"
import { FullLead } from "@/src/schemas"
import { LeadsDetails } from "../LeadsDetails"

type LeadsTableProps = {
    leads: FullLead[]
}

export function LeadsTable({leads}: LeadsTableProps) {
    return <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <>
              <TableRow key={lead.id}>
              <TableCell>{lead.nomeCompleto}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.telefone}</TableCell>
              <TableCell>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <LeadsDetails data={lead} trigger={<Button><BookOpen /></Button>} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver mais informações</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
            
            </>
          ))}
        </TableBody>
      </Table>
    </>
    
}