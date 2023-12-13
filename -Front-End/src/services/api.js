import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const registrarSimulacao = async (dadosFormulario) => {
  try {
    const response = await api.post('/api/registrar-simulacao', dadosFormulario);
    console.log('Simulação registrada com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar simulação:', error.response?.data || error.message);
    throw error;
  }
};

const obterSimulacoes = async () => {
  try {
    const response = await api.get('/api/listar-simulacoes');
    console.log('Obtendo lista de simulações do backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter lista de simulações:', error.message);
    throw error;
  }
};

const obterSimulacaoPorId = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/listar-simulacao/${id}`);
    const data = await response.json();
    return data.simulacao; 
  } catch (error) {
    console.error('Erro ao obter simulação por ID:', error);
    throw error;
  }
};

export { registrarSimulacao, obterSimulacoes, obterSimulacaoPorId  };
