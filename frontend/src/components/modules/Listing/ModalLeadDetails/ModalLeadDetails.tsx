import React from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { ModalLeadDetailsProps } from "./Typing";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useModalLeadDetails } from "@/services/Listing/modalLeadDetails.service";

const ModalLeadDetails = ({ id, closeModal }: ModalLeadDetailsProps) => {
  const {
    consume,
    fields,
    openConsume,
    setOpenConsume,
    leadsDetails,
    handleConsume,
  } = useModalLeadDetails(id);

  return (
    <>
      <Dialog open={openConsume}>
        <DialogContent className="bg-box border border-textInput">
          <div className="flex justify-between items-center">
            <DialogTitle>Consumo</DialogTitle>
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => setOpenConsume(false)}
            />
          </div>
          <Table className="bg-textInput rounded-lg mt-3">
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white cursor-default">
                <TableHead className="text-left text-[#646272] text-xs font-bold">
                  Mês
                </TableHead>
                <TableHead className="text-left text-[#646272] text-xs font-bold">
                  Consumo Fora Ponta (kWh)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consume?.map((invoice, index) => (
                <TableRow
                  key={index}
                  className="border-white hover:bg-transparent cursor-default"
                >
                  <TableCell className="font-medium text-xs ">
                    {invoice.mesDoConsumo}
                  </TableCell>
                  <TableCell className="text-left text-xs ">
                    {invoice.consumoForaPontaEmKWH}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
      <DialogContent className=" max-w-[630px] bg-box border border-textInput">
        <div className="flex justify-between items-center">
          <DialogTitle>Detalhes do Lead</DialogTitle>
          <X
            className="h-4 w-4 cursor-pointer"
            onClick={() => closeModal(false)}
          />
        </div>
        <ul className="flex flex-col gap-3 mt-4">
          {fields.map((leads) => (
            <li className="flex justify-between" key={leads.name}>
              <p className="text-[#646272] font-bold">{leads.name}</p>
              <p>{leads.value}</p>
            </li>
          ))}
        </ul>
        <div className="overflow-auto">
          <p className="font-bold">Unidades asociadas:</p>
          <Table className="bg-textInput rounded-lg mt-3">
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white cursor-default">
                <TableHead className="text-left text-[#646272] text-xs font-bold">
                  Código da Unidade
                </TableHead>
                <TableHead className="text-left text-[#646272] text-xs font-bold">
                  Modelo Fásico
                </TableHead>
                <TableHead className="text-left text-[#646272] text-xs font-bold">
                  Enquadramento
                </TableHead>
                <TableHead className="text-left text-[#646272] text-xs font-bold">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadsDetails?.unidades?.map((invoice) => (
                <TableRow
                  key={invoice.codigoDaUnidadeConsumidora}
                  className="border-white hover:bg-transparent cursor-default"
                >
                  <TableCell className="font-medium text-xs ">
                    {invoice.codigoDaUnidadeConsumidora}
                  </TableCell>
                  <TableCell className="text-left text-xs ">
                    {invoice.modeloFasico}
                  </TableCell>
                  <TableCell className="text-left text-xs ">
                    {invoice.enquadramento}
                  </TableCell>
                  <TableCell
                    className="text-left text-xs  underline cursor-pointer"
                    onClick={() =>
                      handleConsume(invoice.historicoDeConsumoEmKWH)
                    }
                  >
                    Ver Consumos
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </>
  );
};

export default ModalLeadDetails;
