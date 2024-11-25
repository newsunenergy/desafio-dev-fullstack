import express from 'express';
import simulacoesRouter from './routes/simulacoes'; // Rota que criamos

const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Registro da rota principal /simular
app.use('/simular', simulacoesRouter);

// Middleware para lidar com rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

export default app;
