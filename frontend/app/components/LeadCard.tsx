import { Unit } from "@/types";

interface LeadCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  units: Unit[];
  createdAt: string;
}

export function LeadCard({
  id,
  name,
  email,
  phone,
  units,
  createdAt,
}: LeadCardProps) {
  const unit = units[0]; // Assume lead has at least 1 unit

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>
          <span className="font-medium">Telefone:</span> {phone}
        </p>
        <p>
          <span className="font-medium">Código da Unidade:</span>{" "}
          {unit.codigoDaUnidadeConsumidora}
        </p>
        <p>
          <span className="font-medium">Valor Fatura:</span> R${" "}
          {unit.amount.toFixed(2)}
        </p>
        <p>
          <span className="font-medium">Modelo de Cobrança:</span>{" "}
          {unit.chargingModel}
        </p>
        <p>
          <span className="font-medium">Data da Simulação:</span>{" "}
          {new Date(createdAt).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <div className="pt-3 border-t border-gray-200">
        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {unit.historicoDeConsumoEmKWH.length} meses de histórico
        </span>
      </div>
    </div>
  );
}
