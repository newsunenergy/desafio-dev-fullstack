// components/Listagem.js
import React, { useState, useEffect } from 'react';
import { obterSimulacoes, obterSimulacaoPorId } from '../services/api';
import ListagemItemDetalhes from './ListagemItemDetalhes';
import './ListagemItem.css';


const Listagem = () => {
  const [simulacoes, setSimulacoes] = useState([]);
  const [simulacaoId, setSimulacaoId] = useState(null);

  useEffect(() => {
    const fetchSimulacoes = async () => {
      try {
        const data = await obterSimulacoes();
        console.log('Dados retornados pela API:', data);
        setSimulacoes(data.simulacoes);
      } catch (error) {
        console.error('Erro ao buscar simulações:', error);
      }
    };

    fetchSimulacoes();
  }, []);

  useEffect(() => {
    const fetchSimulacaoPorId = async () => {
      try {
        if (simulacaoId) {
          const simulacao = await obterSimulacaoPorId(simulacaoId);
          console.log('Simulação por ID:', simulacao);
          setSimulacoes([simulacao]);
        } else {
          // Se simulacaoId não estiver definido, busca todas as simulações novamente
          const data = await obterSimulacoes();
          console.log('Dados retornados pela API:', data);
          setSimulacoes(data.simulacoes);
        }
      } catch (error) {
        console.error('Erro ao buscar simulação por ID:', error);
      }
    };

    fetchSimulacaoPorId();
  }, [simulacaoId]);

  return (
    <div className="simulacao-details">
      {/* <label htmlFor="simulacaoId" style={{ fontSize: '14px', color: 'black', marginRight: '20px' }}>
        Busca por uma Simulação:
      </label>
      <input
        type="text"
        id="simulacaoId"
        value={simulacaoId || ''}
        onChange={(e) => setSimulacaoId(e.target.value)}
      /> */}
      <h2>Detalhes da Simulação</h2>

      {simulacoes.length > 0 ? (
        <div>
          {simulacoes.map((simulacao) => (
            <ListagemItemDetalhes key={simulacao.id} simulacao={simulacao} />
          ))}
        </div>
      ) : (
        <p>Nenhuma simulação disponível.</p>
      )}
    </div>
  );
};

export default Listagem;
