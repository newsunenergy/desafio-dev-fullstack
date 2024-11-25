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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Configuração do multer para upload do arquivo
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Endpoint /simular
app.post('/simular', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nomeCompleto, email, telefone, informacoesDaFatura } = req.body;
        if (!nomeCompleto || !email || !telefone || !informacoesDaFatura) {
            return res.status(400).json({ error: 'Dados incompletos.' });
        }
        // Simulação do processo de decodificação da conta de energia (use a API real aqui)
        const decodedData = yield decodificarContaDeEnergia(req.file); // Função que você vai implementar
        // Criação do Lead (simulação)
        const lead = {
            id: 'random-id',
            nomeCompleto,
            email,
            telefone,
            unidades: decodedData.unidades,
        };
        // Salve o lead no banco de dados (adapte conforme seu modelo de banco)
        // await salvarLead(lead);
        return res.status(201).json({ message: 'Simulação registrada com sucesso', lead });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao registrar a simulação.' });
    }
}));
// Função que simula a decodificação da conta de energia
function decodificarContaDeEnergia(file) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
