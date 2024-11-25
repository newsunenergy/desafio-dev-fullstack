"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Importa a configuração do servidor
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carrega as variáveis de ambiente do .env
const PORT = process.env.PORT || 3000;
// Inicializa o servidor
app_1.default.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
