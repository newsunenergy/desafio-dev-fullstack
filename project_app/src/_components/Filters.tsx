"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  onApplyFilters: (filters: {
    enquadramento: string[];
    modeloFasico: string[];
  }) => void;
}

export function FilterSidebar({ onApplyFilters }: FilterSidebarProps) {
  const [enquadramentoFilters, setEnquadramentoFilters] = useState<string[]>(
    []
  );
  const [modeloFasicoFilters, setModeloFasicoFilters] = useState<string[]>([]);

  const enquadramentoOptions = ["AX", "B1", "B2", "B3"];
  const modeloFasicoOptions = ["monofasico", "bifasico", "trifasico"];

  const handleEnquadramentoChange = (value: string) => {
    setEnquadramentoFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleModeloFasicoChange = (value: string) => {
    setModeloFasicoFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      enquadramento: enquadramentoFilters,
      modeloFasico: modeloFasicoFilters,
    });
  };

  return (
    <div className="w-64 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Enquadramento</h3>
        {enquadramentoOptions.map((option) => (
          <div key={option} className="flex items-center gap-2 my-1">
            <Checkbox
              id={`enquadramento-${option}`}
              checked={enquadramentoFilters.includes(option)}
              onCheckedChange={() => handleEnquadramentoChange(option)}
            />
            <Label htmlFor={`enquadramento-${option}`}>{option}</Label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Modelo Fásico</h3>
        {modeloFasicoOptions.map((option) => (
          <div key={option} className="flex items-center  gap-2 my-1">
            <Checkbox
              id={`modeloFasico-${option}`}
              checked={modeloFasicoFilters.includes(option)}
              onCheckedChange={() => handleModeloFasicoChange(option)}
            />
            <Label htmlFor={`modeloFasico-${option}`}>{option}</Label>
          </div>
        ))}
      </div>

      <Button onClick={handleApplyFilters} className="w-full">
        Aplicar Filtros
      </Button>
    </div>
  );
}
