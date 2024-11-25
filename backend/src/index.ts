import express from 'express';
import multer from 'multer';
import { Lead, SolicitarSimulacaoDeCompensacaoEnergeticaInput, InformacaoDaFatura } from './models'; // Ajuste conforme seu modelo

const app = express();
const port = 3000;

app.use(express.json());

// Configuração do multer para upload do arquivo
const upload = multer({ dest: 'uploads/' });

// Endpoint /simular
app.post('/simular', upload.single('file'), async (req, res) => {
  try {
    const { nomeCompleto, email, telefone, informacoesDaFatura }: SolicitarSimulacaoDeCompensacaoEnergeticaInput = req.body;

    if (!nomeCompleto || !email || !telefone || !informacoesDaFatura) {
      return res.status(400).json({ error: 'Dados incompletos.' });
    }

    // Simulação do processo de decodificação da conta de energia (use a API real aqui)
    const decodedData = await decodificarContaDeEnergia(req.file); // Função que você vai implementar

    // Criação do Lead (simulação)
    const lead: Lead = {
      id: 'random-id',
      nomeCompleto,
      email,
      telefone,
      unidades: decodedData.unidades,
    };

    // Salve o lead no banco de dados (adapte conforme seu modelo de banco)
    // await salvarLead(lead);

    return res.status(201).json({ message: 'Simulação registrada com sucesso', lead });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao registrar a simulação.' });
  }
});

// Função que simula a decodificação da conta de energia
async function decodificarContaDeEnergia(file: Express.Multer.File): Promise<any> {
  // Aqui você faria a requisição para a API externa para decodificar o PDF
  // Use a URL do seu endpoint para consumir a conta e retornar as informações

  return {
    unidades: [
      {
        id: 'unidade-id',
        codigoDaUnidadeConsumidora: '12345',
        modeloFasico: 'monofasico',
        enquadramento: 'AX',
        historicoDeConsumoEmKWH: [
          { consumoForaPontaEmKWH: 100, mesDoConsumo: new Date('2023-01-01') },
          { consumoForaPontaEmKWH: 120, mesDoConsumo: new Date('2023-02-01') },
          // Adicione o histórico de consumo aqui
        ],
      },
    ],
  };
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
