"use client"
import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SimulationTableProps } from "./Typing"
import { Dialog } from "@/components/ui/dialog"
import ModalLeadDetails from "../ModalLeadDetails/ModalLeadDetails"

const SimulationTable = ({
  tableData,
}: {
  tableData: SimulationTableProps[] | undefined
}) => {
  const [openModalLead, setOpenModalLead] = useState(false)
  const [leadId, setLeadId] = useState("")

  const handleModalLead = (id: string) => {
    setLeadId(id)
    setOpenModalLead(!openModalLead)
  }

  return (
    <>
      <Dialog open={openModalLead}>
        <ModalLeadDetails id={leadId} closeModal={setOpenModalLead} />
      </Dialog>
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
            <TableRow
              key={invoice.id}
              className="border-textInput hover:bg-black/10"
              onClick={() => handleModalLead(invoice.id as string)}
            >
              <TableCell className="font-medium text-xs py-[10px] px-7 capitalize">
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
    </>
  )
}

export default SimulationTable
