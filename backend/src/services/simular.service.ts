
import { Simulacao } from '../models/Simulacao';

export const registrarNovaSimulacao = (dados: any) => {
    // Simulação de processamento de dados
    console.log('Dados recebidos para simulação:', dados);
    return {
        mensagem: 'Simulação registrada com sucesso!',
        dadosProcessados: { ...dados, resultado: 'Exemplo de resultado' }
    };
};
