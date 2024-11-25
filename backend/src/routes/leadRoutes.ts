import { Router } from 'express';
import { createLead, getLeads } from '../controllers/leadController';

const router = Router();

router.post('/simulacao', createLead);  // Endpoint para registrar a simulação
router.get('/', getLeads);  // Endpoint para listar todas as simulações

export { router as leadRoutes };
