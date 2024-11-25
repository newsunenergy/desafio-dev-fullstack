import { Router } from 'express';
import multer from 'multer';
import { registrarNovaSimulacao } from '../services/simular.service'; // Importa o serviço de simulação

const router = Router();
const upload = multer(); // Configuração para manipular multipart/form-data

// Endpoint POST /simular
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { nomeCompleto, email, telefone, informacoesDaFatura } = req.body;

        // Validação básica dos dados
        if (!nomeCompleto || !email || !telefone || !informacoesDaFatura) {
            return res.status(400).json({ message: 'Dados obrigatórios ausentes.' });
        }

        // Chama o serviço para processar a simulação
        const novaSimulacao = await registrarNovaSimulacao({
            nomeCompleto,
            email,
            telefone,
            informacoesDaFatura: JSON.parse(informacoesDaFatura), // Converte string JSON para objeto
        });

        return res.status(201).json(novaSimulacao);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
});

export default router;



