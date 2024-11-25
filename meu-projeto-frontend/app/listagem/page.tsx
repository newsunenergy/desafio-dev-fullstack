'use client';

import React, { useEffect, useState } from 'react';

const Listagem = () => {
  const [simulacoes, setSimulacoes] = useState<any[]>([]); // Inicialize como array vazio
  const [erro, setErro] = useState<string | null>(null);   // Para exibir mensagens de erro

  useEffect(() => {
    const fetchSimulacoes = async () => {
      try {
        const response = await fetch('http://localhost:3000/simulacoes'); // Endpoint do backend
        if (!response.ok) {
          throw new Error('Erro ao buscar simulações. Verifique o backend.');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setSimulacoes(data);
        } else {
          throw new Error('Resposta inesperada do servidor.');
        }
      } catch (error: any) {
        setErro(error.message);
      }
    };

    fetchSimulacoes();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Listagem de Simulações</h1>
      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
      {simulacoes.length === 0 && !erro ? (
        <p>Carregando simulações...</p>
      ) : (
        <ul>
          {simulacoes.map((simulacao: any) => (
            <li key={simulacao.id} style={{ marginBottom: '10px' }}>
              <strong>Nome:</strong> {simulacao.nome} <br />
              <strong>Email:</strong> {simulacao.email} <br />
              <strong>Arquivo:</strong>{' '}
              <a
                href={`http://localhost:3000/uploads/${simulacao.nomeArquivo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar Conta de Energia
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listagem;
