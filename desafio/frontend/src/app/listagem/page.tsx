"use client";
import DetalhesSimulacaoModal from "@/components/DetalhesSimulacaoModal";
import FeedbackModal from "@/components/FeedbackModal";
import { Simulacao } from "@/interfaces/interface";
import { useState, useEffect } from "react";

export default function ListagemSimulacoes() {
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosConsumo, setDadosConsumo] = useState<Simulacao | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function buscarSimulacoes() {
    try {
      const response = await fetch(
        `http://localhost:3333/simulacao?busca=${busca}`
      );

      const data = await response.json();
      setSimulacoes(data);
    } catch (error) {
      setSimulacoes([]);
      handleShowModal(
        false,
        "Não foi possível carregar as simulações. Tente novamente mais tarde."
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    buscarSimulacoes();
  }, [busca]);

  const abrirModal = (simulacao: Simulacao) => {
    setDadosConsumo(simulacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDadosConsumo(null);
  };

  const handleShowModal = (success: boolean, msg: string) => {
    setIsSuccess(success);
    setMessage(msg);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold mb-6">Listagem de Simulações</h2>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
        >
          Voltar
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por nome, email ou código da unidade"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md border p-1"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código UC
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {simulacoes.length > 0 ? (
              simulacoes?.map((simulacao: Simulacao, i: number) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {simulacao.lead.nomeCompleto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {simulacao.lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {simulacao.lead.telefone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {simulacao.codigoDaUnidadeConsumidora}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => abrirModal(simulacao)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  {loading ? "Carregando..." : "Nenhuma simulação encontrada."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalAberto && dadosConsumo && (
        <DetalhesSimulacaoModal
          fecharModal={fecharModal}
          dadosConsumo={dadosConsumo}
        />
      )}

      {showModal && (
        <FeedbackModal
          isSuccess={isSuccess}
          message={message}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
