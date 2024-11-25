"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const simulacoes_1 = __importDefault(require("./routes/simulacoes")); // Rota que criamos
const app = (0, express_1.default)();
// Middleware para processar JSON no corpo das requisições
app.use(express_1.default.json());
// Registro da rota principal /simular
app.use('/simular', simulacoes_1.default);
// Middleware para lidar com rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});
exports.default = app;
