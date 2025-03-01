# Guia de Configuração e Execução do Projeto

Este guia fornece instruções para configurar, construir e rodar o projeto.

## Requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** (versão recomendada: 18.x ou superior)
- **MySQL**
- **NPM** (gerenciador de pacotes do Node.js)

## Configuração do Backend (NestJS)

1. Acesse a pasta do backend:

   ```sh
   cd project_api
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Copie o arquivo `.env.example` para `.env` e preencha com as credenciais do banco de dados.

4. Gere as migrações e aplique ao banco de dados:

   ```sh
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor:
   ```sh
   npm run start:dev
   ```

## Configuração do Frontend (Next.js)

1. Acesse a pasta do frontend:

   ```sh
   cd project_app
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Copie o arquivo `.env.example` para `.env` e preencha os valores necessários (exemplo: URL do backend).

4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

## Build e Execução em Produção

### Backend

1. Gere o build:
   ```sh
   npm run build
   ```
2. Inicie o servidor em modo produção:
   ```sh
   npm run start
   ```

### Frontend

1. Gere o build:
   ```sh
   npm run build
   ```
2. Inicie o servidor Next.js:
   ```sh
   npm start
   ```

## Considerações Finais

- Certifique-se de que o banco de dados está rodando antes de iniciar o backend.
- Em produção, configure variáveis de ambiente adequadas para segurança e performance.
- Caso utilize um serviço de hospedagem, verifique as configurações específicas para Next.js e NestJS.

Se precisar de mais informações, entre em contato!
