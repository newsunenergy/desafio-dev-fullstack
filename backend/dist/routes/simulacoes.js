"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const simular_service_1 = require("../services/simular.service"); // Importa o serviço de simulação
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(); // Configuração para manipular multipart/form-data
// Endpoint POST /simular
router.post('/', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nomeCompleto, email, telefone, informacoesDaFatura } = req.body;
        // Validação básica dos dados
        if (!nomeCompleto || !email || !telefone || !informacoesDaFatura) {
            return res.status(400).json({ message: 'Dados obrigatórios ausentes.' });
        }
        // Chama o serviço para processar a simulação
        const novaSimulacao = yield (0, simular_service_1.registrarNovaSimulacao)({
            nomeCompleto,
            email,
            telefone,
            informacoesDaFatura: JSON.parse(informacoesDaFatura), // Converte string JSON para objeto
        });
        return res.status(201).json(novaSimulacao);
    }
    catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
}));
exports.default = router;
