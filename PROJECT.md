# Informações Gerais do Projeto

Este projeto utiliza as seguintes tecnologias e bibliotecas:

### Frontend

- **Next.js**: Framework React para renderização do lado do servidor (SSR) e geração de páginas estáticas.
- **Bibliotecas**:
  - **React Hook Form**: Para gerenciamento de formulários.
  - **shadcn**: Componentes UI reutilizáveis.
  - **Tailwind CSS**: Framework CSS utilitário para estilização.

### Backend

- **NestJS**: Framework Node.js para construção de aplicações server-side robustas e escaláveis.
- **Prisma ORM**: ORM para modelagem e interação com o banco de dados MySQL.

### Funcionalidades Implementadas

#### Frontend

- **Páginas**:
  1. **Página Principal**: Auxílio na navegação entre as páginas do sistema.
  2. **Página `/simular`**:
     - Contém um formulário para envio de informações do lead e arquivos das contas.
     - Os dados são enviados para o backend através do endpoint `POST: {url_da_api}/simulacao`.
  3. **Página `/listagem`**:
     - Carrega, na renderização, os dados de todas as simulações do banco de dados `GET: {url_da_api}/simulacao`.
     - Possui filtros e uma barra de busca para facilitar a localização de simulações específicas.
     - Ao clicar em uma linha, um modal é aberto, exibindo detalhes da simulação consultada via API `GET: {url_da_api}/simulacao/{idSimulacao}`.

#### Backend

- **Endpoints**:
  1. **Busca Geral**: Retorna todas as simulações cadastradas.
  2. **Busca por ID**: Retorna os detalhes de uma simulação específica.
  3. **Criação de Simulação**:
     - Recebe os dados enviados pelo frontend na página `/simular`.
     - Antes de acessar a camada de repositório, os arquivos são enviados para endpoint externo fornecido pela empresa e os dados são validados.
     - No repositório, é realizada uma transação para garantir a consistência dos dados, já que as informações precisam ser armazenadas em múltiplas tabelas simultaneamente.

---

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
