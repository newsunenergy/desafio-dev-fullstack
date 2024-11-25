"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeads = exports.createLead = void 0;
// Função para criar um lead
const createLead = (req, res) => {
    // Lógica para criar o lead
    res.status(201).send('Lead criado');
};
exports.createLead = createLead;
// Função para obter todos os leads
const getLeads = (req, res) => {
    // Lógica para obter os leads
    res.status(200).json({ message: 'Leads recuperados' });
};
exports.getLeads = getLeads;
