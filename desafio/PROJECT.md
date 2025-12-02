# Projeto: Simulação de Compensação Energética

Este projeto foi desenvolvido para atender aos requisitos do desafio técnico, implementando um sistema com **frontend** em Next.js e **backend** em Nest.js. A aplicação permite que usuários realizem simulações de planos de compensação energética e consultem os dados registrados.

## Funcionalidades

### **Frontend**

- Página de formulário para submissão de simulações (`/simular`).
- Página de listagem de simulações (`/listagem`), com filtros por nome, email e código da unidade consumidora.
- Integração com o backend para enviar e buscar dados.

### **Backend**

- **Endpoints disponíveis**:

  1. **Registrar Simulação**: Recebe os dados do formulário e processa as informações.
  2. **Listar Simulações**: Retorna todas as simulações, com suporte a filtros.
  3. **Buscar Simulação por ID**: Retorna os detalhes de uma simulação específica.

  #### **Banco de Dados: SQLite**

  O projeto utiliza **SQLite** como banco de dados, uma solução leve e eficiente que não requer configuração de servidor.

- **Regras de negócio implementadas**:
  - O email deve ser único para cada lead.
  - Cada unidade consumidora deve ter exatamente 12 meses de histórico de consumo.
  - Um lead deve ter ao menos uma unidade cadastrada.

---

## Como Executar o Projeto

### **Pré-requisitos**

- Node.js 21 ou superior.
- Docker (opcional, para execução em contêiner).

### **Executando sem Docker**

#### **Frontend**

1. Acesse a pasta do frontend:
   Instale as dependências:
   ```bash
    npm install
    npm run dev
   ```
   Acesse o frontend em: http://localhost:3000.

#### **Backend**

2. Acesse a pasta do backend:
   Instale as dependências:
   ```bash
   npm install
   npx prisma generate
   npm run start:dev
   ```
   A API estará disponível em: http://localhost:3333.

### **Executando com Docker**

### **Certifique-se de que o Docker está instalado e em execução.**

1. Acesse a pasta do frontend:

```bash
  docker build -t frontend-app .
  docker run -d -p 3000:3000 frontend-app
```

Acesse o frontend em: http://localhost:3000.

#### **Backend**

2. Acesse a pasta do backend:

```bash
docker build -t backend-app .
docker run -d -p 3333:3333 backend-app
```

A API estará disponível em: http://localhost:3333.

##### Estrutura do Projeto

## Frontend

#### Tecnologias utilizadas:

-Next.js
-Tailwind CSS
-Zod
-Fetch API

## Backend

#### Tecnologias utilizadas:

-Nest.js
-Prisma ORM
-Zod
-axios
-SQLite
