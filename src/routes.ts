import express from 'express';
import LeadController from './controllers/LeadController';

const router = express.Router();

// Endpoint para registrar uma nova simulação
router.post('/registrar-simulacao', LeadController.registrarSimulacao);

// Endpoint para listar todas as simulações
router.get('/listar-simulacoes', LeadController.listarSimulacoes);

// Endpoint para listar uma simulação baseado no ID do lead
router.get('/listar-simulacao/:leadId', LeadController.listarSimulacaoPorId);

export default router;
