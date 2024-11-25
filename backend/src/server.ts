import app from './app'; // Importa a configuração do servidor
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do .env

const PORT = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
