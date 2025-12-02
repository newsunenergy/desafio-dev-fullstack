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
    } catch (err: unknown) {
      let errorMessage = 'Erro ao carregar simulação';
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        const responseData = err.response.data as { message?: string };
        if (responseData.message) {
          errorMessage = responseData.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-energy-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card-white shadow-lg rounded-2xl p-8 text-center">
            <p className="text-white/80">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-energy-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card-white shadow-lg rounded-2xl p-8">
            <p className="text-error mb-4">{error || 'Simulação não encontrada'}</p>
            <Button onClick={() => router.push('/listagem')}>Voltar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-energy-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card-white shadow-lg rounded-2xl p-8">
          <div className="mb-6">
            <Button variant="secondary" onClick={() => router.push('/listagem')}>
              ← Voltar
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-white mb-6">Detalhes da Simulação</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Informações do Lead</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white/70">Nome Completo</p>
                  <p className="text-lg font-medium text-white">{lead.nomeCompleto}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="text-lg font-medium text-white">{lead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Telefone</p>
                  <p className="text-lg font-medium text-white">{lead.telefone}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Unidades Consumidoras ({lead.unidades.length})
              </h2>
              <div className="space-y-4">
                {lead.unidades.map((unidade, index) => (
                  <div key={unidade.id} className="border border-white/30 rounded-lg p-4 bg-white/5">
                    <h3 className="font-semibold text-white mb-2">
                      Unidade {index + 1}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-white/70">Código</p>
                        <p className="font-medium text-white">{unidade.codigoDaUnidadeConsumidora}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/70">Modelo Fasico</p>
                        <p className="font-medium text-white capitalize">{unidade.modeloFasico}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/70">Enquadramento</p>
                        <p className="font-medium text-white">{unidade.enquadramento}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/70">Meses de Histórico</p>
                        <p className="font-medium text-white">{unidade.historicoDeConsumoEmKWH.length}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-2">Histórico de Consumo (últimos 12 meses)</p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead className="bg-white/10">
                            <tr>
                              <th className="px-3 py-2 text-left text-white/90">Mês</th>
                              <th className="px-3 py-2 text-right text-white/90">Consumo (kWh)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {unidade.historicoDeConsumoEmKWH.map((consumo, idx) => (
                              <tr key={idx} className="border-t border-white/20">
                                <td className="px-3 py-2 text-white">
                                  {new Date(consumo.mesDoConsumo).toLocaleDateString('pt-BR', {
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </td>
                                <td className="px-3 py-2 text-right text-white">
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

