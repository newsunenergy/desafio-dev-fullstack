import { api } from "@/_services/api";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SimulationDetailsModalProps {
  simulationId: string | null;
  onClose: () => void;
}

export default function SimulationDetailsModal({
  simulationId,
  onClose,
}: SimulationDetailsModalProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!simulationId) return;

    const fetchSimulationDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/simulacao/${simulationId}`);
        setData(response.data);
      } catch (err) {
        setError("Erro ao carregar os detalhes da simulação.");
      } finally {
        setLoading(false);
      }
    };

    fetchSimulationDetails();
  }, [simulationId]);

  return (
    <Dialog open={!!simulationId} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Simulação</DialogTitle>
        </DialogHeader>

        {loading ? (
          <Skeleton className="h-48 w-full" />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data ? (
          <div className="space-y-3">
            <p>
              <strong>Nome:</strong> {data.lead.nome}
            </p>
            <p>
              <strong>Email:</strong> {data.lead.email}
            </p>
            <p>
              <strong>Telefone:</strong> {data.lead.telefone}
            </p>

            <h3 className="font-bold">Unidades:</h3>
            {data.unidades.map((unidade: any) => (
              <div key={unidade.unidade.id} className="border p-2 rounded">
                <p>
                  <strong>Cód. Unidade:</strong>{" "}
                  {unidade.unidade.codigoDaUnidadeConsumidora}
                </p>
                <p>
                  <strong>Enquadramento:</strong>{" "}
                  {unidade.unidade.enquadramento}
                </p>
                <p>
                  <strong>Modelo Fásico:</strong> {unidade.unidade.modeloFasico}
                </p>
                <h4 className="font-bold mt-3">Histórico de Consumo</h4>
                <table className="w-full border-collapse border border-gray-300 mt-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-2 py-1">Mês</th>
                      <th className="border border-gray-300 px-2 py-1">
                        Consumo (kWh)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {unidade.unidade.historicoDeConsumoEmKWH.map(
                      (historico: any) => (
                        <tr
                          key={historico.mesDoConsumo}
                          className="text-center"
                        >
                          <td className="border border-gray-300 px-2 py-1">
                            {new Date(
                              historico.mesDoConsumo
                            ).toLocaleDateString("pt-BR", {
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            {historico.consumoForaPontaEmKWH} kWh
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma informação encontrada.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
