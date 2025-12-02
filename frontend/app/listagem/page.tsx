'use client';

import { useState, useEffect, useRef } from 'react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasScroll, setHasScroll] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      // Verificar se há scroll horizontal disponível
      setHasScroll(scrollWidth > clientWidth);
    }
  };

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

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [leads]);

  const carregarSimulacoes = async (filtrosParaUsar = filtros) => {
    setLoading(true);
    try {
      const filtrosLimpos: {
        nome?: string;
        email?: string;
        codigoUnidade?: string;
      } = {};
      
      if (filtrosParaUsar.nome.trim()) filtrosLimpos.nome = filtrosParaUsar.nome.trim();
      if (filtrosParaUsar.email.trim()) filtrosLimpos.email = filtrosParaUsar.email.trim();
      if (filtrosParaUsar.codigoUnidade.trim())
        filtrosLimpos.codigoUnidade = filtrosParaUsar.codigoUnidade.trim();

      const data = await simulacaoApi.listar(
        Object.keys(filtrosLimpos).length > 0 ? filtrosLimpos : undefined,
      );
      
      // Garantir que sempre define o array (mesmo que vazio)
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao carregar simulações:', error);
      // Em caso de erro, limpar a lista
      setLeads([]);
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
    const filtrosVazios = { nome: '', email: '', codigoUnidade: '' };
    setFiltros(filtrosVazios);
    // Carregar imediatamente com filtros vazios
    carregarSimulacoes(filtrosVazios);
  };

  return (
    <div className="min-h-screen bg-energy-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card-white shadow-lg rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Listagem de Simulações</h1>
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
              darkMode={true}
            />
            <Input
              label="Email"
              type="email"
              value={filtros.email}
              onChange={(e) => handleFiltroChange('email', e.target.value)}
              placeholder="Filtrar por email"
              darkMode={true}
            />
            <Input
              label="Código da Unidade"
              type="text"
              value={filtros.codigoUnidade}
              onChange={(e) => handleFiltroChange('codigoUnidade', e.target.value)}
              placeholder="Filtrar por código"
              darkMode={true}
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
              <p className="text-white/80">Carregando...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/80">Nenhuma simulação encontrada.</p>
            </div>
          ) : (
            <div>
              {/* Indicador visual de scroll em mobile - acima da tabela */}
              {hasScroll && (
                <div className="md:hidden mb-3 text-center">
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#FF6B6B] to-primary text-white text-[10px] px-2 py-1 rounded-full animate-pulse shadow-lg">
                    <span>← Deslize →</span>
                  </div>
                </div>
              )}
              
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide"
                onScroll={checkScroll}
                style={{ scrollBehavior: 'smooth' }}
              >
                <table className="min-w-full divide-y divide-white/20">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                        Telefone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                        Unidades
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/20">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/10 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {lead.nomeCompleto}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {lead.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {lead.telefone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {lead.unidades.length} unidade(s)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => router.push(`/listagem/${lead.id}`)}
                            className="text-white hover:text-primary font-medium transition-colors cursor-pointer"
                          >
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

