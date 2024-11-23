import { Consumo, Simulacao } from "@/interfaces/interface";
import React from "react";

interface DetalhesSimulacaoModalProps {
  fecharModal: () => void;
  dadosConsumo: Simulacao;
}

const DetalhesSimulacaoModal = ({
  fecharModal,
  dadosConsumo,
}: DetalhesSimulacaoModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-bold mb-4">Detalhes de Consumo</h3>
          <span
            onClick={fecharModal}
            className="text-gray-500 text-xl hover:text-red-500 cursor-pointer mb-3"
          >
            X
          </span>
        </div>
        <div>
          <p>
            <strong>Código da Unidade Consumidora:</strong>{" "}
            {dadosConsumo.codigoDaUnidadeConsumidora}
          </p>
          <p>
            <strong>Enquadramento:</strong> {dadosConsumo.enquadramento}
          </p>
          <p>
            <strong>Modelo fásico:</strong> {dadosConsumo.modeloFasico}
          </p>
          <h4 className="mt-4 text-lg font-semibold">
            Histórico de Consumo (kWh)
          </h4>
          <ul className="space-y-2">
            {dadosConsumo.historicoDeConsumoEmKWH.map(
              (consumo: Consumo, i: number) => (
                <li key={consumo.id} className="flex justify-between">
                  <span>
                    {new Date(consumo.mesDoConsumo).toLocaleDateString(
                      "pt-BR",
                      {
                        year: "numeric",
                        month: "2-digit",
                      }
                    )}
                  </span>
                  <span>{consumo.consumoForaPontaEmKWH} kWh</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetalhesSimulacaoModal;
