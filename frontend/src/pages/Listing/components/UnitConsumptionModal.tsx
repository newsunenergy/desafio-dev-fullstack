import { motion } from "framer-motion";
import { X } from "phosphor-react";
import { UnitWithConsumptionsDTO } from "../../../DTOs/lead-DTOs";
import dayjs from "dayjs";
import { monthMapper } from "../../../utils/monthMapper";

interface UnitConsumptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: UnitWithConsumptionsDTO | null;
}

export default function UnitConsumptionModal({ isOpen, onClose, unit }: UnitConsumptionModalProps) {
  if (!isOpen || !unit) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-[500px] border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-200 font-bold">
            Consumos - {unit.unit.consumerUnitCode}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} weight="bold" className="text-red-600 hover:opacity-70 transition-all duration-300" />
          </button>
        </div>

        <div className="max-h-80 overflow-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-gray-800 text-gray-400 uppercase">
              <tr>
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Consumo fora ponta (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {unit.consumptions.length > 0 && (
                unit.consumptions.map((consumption) => (
                  <tr key={consumption.consumptionMonth} className="border-b border-gray-700">
                    <td className="px-4 py-2 font-bold text-white">
                      {monthMapper(dayjs(consumption.consumptionMonth).get('month')) + "/" + dayjs(consumption.consumptionMonth).get("year")}
                      </td>
                    <td className="px-4 py-2 font-bold text-white">{consumption.offPeakInKWH}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={onClose}
            className="bg-red-600 px-4 py-2 rounded-md text-white font-bold hover:bg-red-700 transition-all"
          >
            Fechar
          </button>
        </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
