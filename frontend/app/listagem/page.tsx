'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { simulacaoApi, Lead } from '../lib/api';

export default function ListagemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filtros, setFiltros] = useState({
    nome: '',
    email: '',
    codigoUnidade: '',
  });

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      // Mostrar mensagem de sucesso (pode ser um toast)
      setTimeout(() => {
        router.replace('/listagem');
      }, 3000);
    }
    carregarSimulacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const carregarSimulacoes = async () => {
    setLoading(true);
    try {
      const filtrosLimpos: {
        nome?: string;
        email?: string;
        codigoUnidade?: string;
      } = {};
      if (filtros.nome.trim()) filtrosLimpos.nome = filtros.nome.trim();
      if (filtros.email.trim()) filtrosLimpos.email = filtros.email.trim();
      if (filtros.codigoUnidade.trim())
        filtrosLimpos.codigoUnidade = filtros.codigoUnidade.trim();

      const data = await simulacaoApi.listar(
        Object.keys(filtrosLimpos).length > 0 ? filtrosLimpos : undefined,
      );
      setLeads(data);
    } catch (error) {
      console.error('Erro ao carregar simulações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (key: string, value: string) => {
    setFiltros({ ...filtros, [key]: value });
  };

  const aplicarFiltros = () => {
    carregarSimulacoes();
  };

  const limparFiltros = () => {
    setFiltros({ nome: '', email: '', codigoUnidade: '' });
    setTimeout(() => carregarSimulacoes(), 100);
  };

  return (
    <div className="min-h-screen bg-energy-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card-white shadow rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-text-primary">Listagem de Simulações</h1>
            <Button variant="primary" onClick={() => router.push('/simular')}>
              Nova Simulação
            </Button>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-lg">
            <Input
              label="Nome"
              type="text"
              value={filtros.nome}
              onChange={(e) => handleFiltroChange('nome', e.target.value)}
              placeholder="Filtrar por nome"
            />
            <Input
              label="Email"
              type="email"
              value={filtros.email}
              onChange={(e) => handleFiltroChange('email', e.target.value)}
              placeholder="Filtrar por email"
            />
            <Input
              label="Código da Unidade"
              type="text"
              value={filtros.codigoUnidade}
              onChange={(e) => handleFiltroChange('codigoUnidade', e.target.value)}
              placeholder="Filtrar por código"
            />
            <div className="flex gap-2 md:col-span-3">
              <Button onClick={aplicarFiltros} className="flex-1">
                Aplicar Filtros
              </Button>
              <Button onClick={limparFiltros} variant="secondary">
                Limpar
              </Button>
            </div>
          </div>

          {/* Tabela */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">Carregando...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">Nenhuma simulação encontrada.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unidades
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {lead.nomeCompleto}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {lead.telefone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {lead.unidades.length} unidade(s)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => router.push(`/listagem/${lead.id}`)}
                          className="text-text-primary hover:text-primary font-medium transition-colors cursor-pointer"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

