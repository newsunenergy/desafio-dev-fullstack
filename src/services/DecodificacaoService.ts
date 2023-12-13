import axios, { AxiosError } from 'axios';

class DecodificacaoService {
  static async decodificarContaDeEnergia(file: Buffer): Promise<any> {
    try {
      // Lógica para enviar a requisição para a API de decodificação
      const response = await axios.post('https://magic-pdf.solarium.newsun.energy/v1/magic-pdf', {
        file,
      });
      return response.data;
    } catch (error) {
      // Lidar com erros
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // A requisição foi feita e o servidor respondeu com um código de status diferente de 2xx
          console.error('Erro na resposta da API:', axiosError.response.data);
        } else if (axiosError.request) {
          // A requisição foi feita, mas não houve resposta do servidor
          console.error('Sem resposta do servidor:', axiosError.request);
        } else {
          // Algo aconteceu e desencadeou um erro
          console.error('Erro de configuração da requisição:', axiosError.message);
        }
      } else {
        // Erro não relacionado ao Axios
        console.error('Erro desconhecido:', error);
      }

      throw new Error('Falha na decodificação da conta de energia');
    }
  }
}

export default DecodificacaoService;
