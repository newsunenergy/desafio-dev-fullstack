'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '../../components/Button';
import { simulacaoApi, Lead } from '../../lib/api';

export default function DetalhesSimulacaoPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState<Lead | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      carregarSimulacao(params.id as string);
    }
  }, [params.id]);

  const carregarSimulacao = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulacaoApi.buscarPorId(id);
      setLead(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar simulação');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-500">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-8">
            <p className="text-red-600 mb-4">{error || 'Simulação não encontrada'}</p>
            <Button onClick={() => router.push('/listagem')}>Voltar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-6">
            <Button variant="secondary" onClick={() => router.push('/listagem')}>
              ← Voltar
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">Detalhes da Simulação</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Informações do Lead</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome Completo</p>
                  <p className="text-lg font-medium">{lead.nomeCompleto}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium">{lead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="text-lg font-medium">{lead.telefone}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Unidades Consumidoras ({lead.unidades.length})
              </h2>
              <div className="space-y-4">
                {lead.unidades.map((unidade, index) => (
                  <div key={unidade.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Unidade {index + 1}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Código</p>
                        <p className="font-medium">{unidade.codigoDaUnidadeConsumidora}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Modelo Fasico</p>
                        <p className="font-medium capitalize">{unidade.modeloFasico}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Enquadramento</p>
                        <p className="font-medium">{unidade.enquadramento}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Meses de Histórico</p>
                        <p className="font-medium">{unidade.historicoDeConsumoEmKWH.length}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Histórico de Consumo (últimos 12 meses)</p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left">Mês</th>
                              <th className="px-3 py-2 text-right">Consumo (kWh)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {unidade.historicoDeConsumoEmKWH.map((consumo, idx) => (
                              <tr key={idx} className="border-t">
                                <td className="px-3 py-2">
                                  {new Date(consumo.mesDoConsumo).toLocaleDateString('pt-BR', {
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  {consumo.consumoForaPontaEmKWH.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

