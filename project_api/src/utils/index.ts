import axios from 'axios';
import * as FormData from 'form-data';
import { Readable } from 'stream';

export async function processarContaPdf(file: Buffer): Promise<any> {
  try {
    const formData = new FormData();
    const readableFileStream = new Readable();
    readableFileStream.push(file);
    readableFileStream.push(null);

    // 'file' é o campo que a API espera
    formData.append('file', readableFileStream, { filename: 'conta.pdf' });

    // Enviar o arquivo para a API externa
    const response = await axios.post(process.env.DECODE_PDF_URL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response.data; // Retorna os dados da conta
  } catch (error) {
    console.log('Erro ao processar PDF:', error);
    throw new Error('Falha ao extrair dados da conta');
  }
}
