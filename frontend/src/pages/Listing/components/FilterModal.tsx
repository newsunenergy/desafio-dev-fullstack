import { useState } from "react";
import { motion } from "framer-motion";
import TextInput from "../../../components/Inputs/TextInput";
import Button from "../../../components/Button";
import { X } from "phosphor-react";
import { formatPhone } from "../../../utils/formatPhone";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    name?: string;
    email?: string;
    phone?: string;
    consumerUnitCode?: string;
  }) => void;
}

export default function FilterModal({ isOpen, onClose, onApplyFilters }: FilterModalProps) {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    consumerUnitCode: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    let { value } = e.target;

    if (name === "consumerUnitCode") {
      value = value.replace(/\D/g, "");
    }

    setFilters((prev) => ({ ...prev, [name]: value }));
  };

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
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 border border-gray-800 m-10"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onApplyFilters(filters);
          }
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-200 font-bold">Filtrar Simulações</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} weight="bold" className="text-red-600 hover:opacity-70 transition-all ease-in-out duration-300" />
          </button>
        </div>

        <TextInput placeholder="Nome" value={filters.name} onChange={(e) => handleChange(e, "name")} />
        <TextInput placeholder="Email" value={filters.email} onChange={(e) => handleChange(e, "email")} />
        <TextInput placeholder="Telefone" value={formatPhone(filters.phone)} onChange={(e) => handleChange(e, "phone")} />
        <TextInput placeholder="Código de Unidade" value={filters.consumerUnitCode} onChange={(e) => handleChange(e, "consumerUnitCode")} />

        <div className="mt-4 flex justify-end gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              label="Limpar filtros"
              onClick={() => {
                setFilters({
                  name: "",
                  email: "",
                  phone: "",
                  consumerUnitCode: "",
                });
                onApplyFilters({
                  name: "",
                  email: "",
                  phone: "",
                  consumerUnitCode: "",
                })
              }
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button label="Aplicar" onClick={() => onApplyFilters(filters)} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
