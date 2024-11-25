"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRoutes = void 0;
const express_1 = require("express");
const leadController_1 = require("../controllers/leadController");
const router = (0, express_1.Router)();
exports.leadRoutes = router;
router.post('/simulacao', leadController_1.createLead); // Endpoint para registrar a simulação
router.get('/', leadController_1.getLeads); // Endpoint para listar todas as simulações
