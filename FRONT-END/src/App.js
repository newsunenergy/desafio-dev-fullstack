import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Listagem from './components/Listagem'; // Importe a Listagem, ajuste conforme necessário
import { registrarSimulacao, obterSimulacoes } from './services/api';
import './App.css';

function App() {
  const [simulacoes, setSimulacoes] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSimulacoes = async () => {
      try {
        const simulacoesObtidas = await obterSimulacoes();
        setSimulacoes(simulacoesObtidas);
      } catch (error) {
        // Trate o erro, se necessário
        console.error('Erro ao obter simulações:', error);
      }
    };

    fetchSimulacoes();
  }, []); // Executado apenas uma vez após a montagem do componente

  const handleSubmit = async (dadosFormulario) => {
      const simulacaoRegistrada = await registrarSimulacao(dadosFormulario);
      setError(null);
  
      if (simulacaoRegistrada.status === 201) {
        setFeedback('Simulação registrada com sucesso!');
      }
    
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <Formulario onSubmit={handleSubmit} />
        {feedback && <p className="feedback success">{feedback}</p>}
        {error && <p className="feedback error">{error}</p>}
        <br />
        <Listagem simulacoes={simulacoes} />
        <br />
        <br />
      </header>
    </div>
  );
}

export default App;
