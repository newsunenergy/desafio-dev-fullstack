import { motion } from "framer-motion";
import Button from "../../../components/Button";
import { formatPhone } from "../../../utils/formatPhone";
import { LeadWithUnitsDTO } from "../../../DTOs/lead-DTOs";


interface LeadTableProps {
  leadsWithUnits: LeadWithUnitsDTO[];
  fetchLeadById: (id: string) => void;
  getTextWithoutLeads: string;
  navigate: (path: string) => void;
  setFilterModalOpen: (open: boolean) => void;
}

export default function LeadTable({
  leadsWithUnits,
  fetchLeadById,
  getTextWithoutLeads,
  navigate,
  setFilterModalOpen,
}: LeadTableProps) {
  return (
    <>
      <div className="p-4 flex justify-end items-center border-b border-gray-400">
        <Button label="Filtros" onClick={() => setFilterModalOpen(true)} />
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr>
              <th className="h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7">
                Nome
              </th>
              <th className="h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7">
                Email
              </th>
              <th className="h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7">
                Telefone
              </th>
              <th className="h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7">
                Unidades
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {leadsWithUnits.map((lead) => (
              <tr
                key={lead.lead.id}
                className="border-b transition-colors font-bold text-white hover:bg-amber-600 cursor-pointer"
                onClick={() => fetchLeadById(lead.lead.id)}
              >
                <td className="p-4 align-middle font-bold py-[10px] px-7 capitalize">
                  {lead.lead.fullName}
                </td>
                <td className="p-4 align-middle text-left py-[10px] px-7">
                  {lead.lead.email}
                </td>
                <td className="p-4 align-middle text-left py-[10px] px-7">
                  {formatPhone(lead.lead.phone)}
                </td>
                <td className="p-4 align-middle font-medium py-[10px] px-7 capitalize">
                  <p className="bg-amber-600 max-w-7 p-1 text-center rounded-lg">
                    {lead.units.length}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leadsWithUnits?.length === 0 && (
        <div className="flex flex-col gap-4 font-bold text-white justify-center items-center w-full h-[80%]">
          {getTextWithoutLeads}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
            <Button label="Simular agora" onClick={() => navigate("/simular")} />
          </motion.div>
        </div>
      )}
    </>
  );
}
