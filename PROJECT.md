# 🚀 NewSun Energy - Desafio Dev Full Stack

Este projeto consiste em um sistema de simulação para um plano de compensação energética, permitindo que os usuários submetam informações e consultem simulações cadastradas.

# 📌 Tecnologias utilizadas

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn/UI

### Backend

- NestJS
- TypeScript
- TypeORM
- MySQL
- Docker
- Axios
- Multer
- Class Validator

# 📦 Como rodar o projeto localmente

### ✅ Pré-requisitos

#### Antes de começar, você precisará ter instalado em sua máquina:

- Node.js
- Docker

#### Passos para rodar o projeto

1. Clone o repositório

```sh
git clone https://github.com/felipems1/desafio-dev-fullstack
cd desafio-dev-fullstack
```

2. Instalar as dependências do backend

```sh
cd back-end
npm install
```

3. Subir o banco de dados com Docker

```sh
docker compose up -d
```

4. Rodar a aplicação backend

```sh
npm start
```

#### O backend estará disponível em `http://localhost:3333`.

5. Instalar as dependências do frontend

```sh
cd ../front-end
npm install
```

6. Rodar a aplicação frontend

```sh
npm run dev
```

#### O frontend estará disponível em `http://localhost:3000`.

# 🔗 Endpoints Disponíveis

### 📌 Criar um novo Lead

Método: POST

URL: `http://localhost:3333/lead/create`

Descrição: Registra um novo Lead no sistema.

### 📌 Listar todos os Leads (com filtros opcionais)

Método: GET

URL: `http://localhost:3333/lead/`

Descrição: Retorna uma lista de todos os Leads cadastrados.

#### 🔎 Filtros disponíveis (Query Params):

Você pode filtrar os resultados adicionando os seguintes parâmetros à URL:

- fullName → Filtra Leads pelo nome.

- email → Filtra Leads pelo email.

- consumerUnitCode → Filtra Leads pelo código da unidade consumidora.

#### 📌 Exemplo de requisição com filtro:

```sh
GET http://localhost:3333/lead/?nome=João&email=joao@email.com
```

### 📌 Buscar um Lead pelo ID

Método: GET

URL: `http://localhost:3333/lead/:id`

Descrição: Retorna os detalhes de um Lead específico, baseado no seu ID.

#### 📌 Exemplo de requisição:

```sh
GET http://localhost:3333/lead/12345
```

# 📄 Páginas do Front-End

## 1. Página de Listagem de Simulações
- URL: `/`

- Descrição:  
  Esta página exibe todas as simulações (Leads) que foram cadastradas. O usuário pode visualizar detalhes como nome, email, código da unidade consumidora e etc.

  Funcionalidades:
  - A lista de Leads é carregada automaticamente ao acessar a página.

  - A página oferece filtro para buscar Leads por nome.

  - Exibição do histórico de consumo

## 2. Página de Submissão de Simulação (Formulário)

- URL: `/create-simulate`

- Descrição:  
  Esta página permite ao usuário submeter um novo Lead para a simulação de compensação energética. O usuário preenche os seguintes campos:  

  - Nome Completo: Campo de texto para o nome do usuário.

  - Email: Campo de texto para o email do usuário (verificação de formato de email).

  - Telefone: Campo de texto para o telefone do usuário.
  
  - Contas de Energia: O usuário pode fazer upload de uma ou mais contas de energia em formato PDF. O arquivo será processado pela API para decodificação.

  Funcionalidades:
  - Ao submeter o formulário, os dados são enviados para o backend, e um novo Lead é criado.

