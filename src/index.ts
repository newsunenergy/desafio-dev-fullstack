// Importe as dependências necessárias
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

// Crie uma instância do Express
const app = express();

// Use middlewares
app.use(cors());
app.use(bodyParser.json());

// Adicione suas rotas
app.use('/api', routes);

// Tratamento de erro para rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).send('Rota não encontrada');
});

// Tratamento de erro global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
});

// Defina a porta
const PORT = process.env.PORT || 3000;

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
