import { ArrowCircleLeft } from "phosphor-react";
import Button from "../../../components/Button";
import { UnitWithConsumptionsDTO } from "../../../DTOs/lead-DTOs";
import { motion } from 'framer-motion'
import UnitConsumptionModal from "./UnitConsumptionModal";
import { useState } from "react";

type UnitTableProps = {
  units: UnitWithConsumptionsDTO[];
  onBack: () => void;
};

export default function UnitTable({ units, onBack }: UnitTableProps) {
  const [selectedUnit, setSelectedUnit] = useState<UnitWithConsumptionsDTO | null>(null);

  return (
    <div className="relative w-full overflow-auto">
      <div className="p-4 justify-start items-center border-b border-gray-400">
        <div 
          className="w-20 cursor-pointer hover:opacity-70 ease-in-out transition-all duration-300 gap-2 flex"
          onClick={onBack}
        >
          <ArrowCircleLeft size={24} weight="bold" className="text-amber-600 hover:text-" />
          <p className="font-bold text-amber-600">Voltar</p>
        </div>
      </div>
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr>
            <th className="h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7">
              Código da Unidade
            </th>
            <th className="h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7">
              Modelo Fásico
            </th>
            <th className="h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7">
              Enquadramento
            </th>
            <th className="h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {units.map((unit) => (
            <tr
              key={unit.unit.consumerUnitCode}
              className="border-b transition-colors font-bold text-white"
            >
              <td className="p-4 align-middle py-[10px] px-7">{unit.unit.consumerUnitCode}</td>
              <td className="p-4 align-middle py-[10px] px-7 capitalize">{unit.unit.phaseModel}</td>
              <td className="p-4 align-middle py-[10px] px-7">{unit.unit.framing}</td>
              <td className="p-4 align-middle py-[10px] px-7 flex justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button label="Ver detalhes" size="small" onClick={() => setSelectedUnit(unit)} />
                </motion.div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UnitConsumptionModal
        isOpen={!!selectedUnit}
        onClose={() => setSelectedUnit(null)}
        unit={selectedUnit}
      />
    </div>
  );
}
