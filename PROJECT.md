# Desafio Newsun Energy - Simulação de Compensação Energética

## 📋 Sobre o Projeto

Este projeto implementa uma aplicação full-stack para simulação de planos de compensação energética. A aplicação permite que usuários submetam formulários com suas informações pessoais e contas de energia, que são automaticamente decodificadas através de uma API externa e armazenadas no banco de dados.

## 🏗️ Arquitetura

### Backend (NestJS)

A aplicação backend foi desenvolvida seguindo os princípios de **Clean Architecture**, organizando o código em camadas bem definidas:

- **Domain**: Entidades de domínio e interfaces de repositórios
- **Application**: Casos de uso e DTOs
- **Infrastructure**: Implementações concretas (Prisma, serviços externos)
- **Presentation**: Controllers e pipes de validação

### Frontend (Next.js)

O frontend foi desenvolvido com Next.js 16 usando App Router, TypeScript e TailwindCSS para estilização.

## 🛠️ Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **Prisma** - ORM para MySQL
- **MySQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **Axios** - Cliente HTTP para integração externa
- **Form-data** - Manipulação de multipart/form-data

### Frontend
- **Next.js 16** - Framework React
- **TypeScript** - Linguagem de programação
- **TailwindCSS** - Framework de estilização
- **Axios** - Cliente HTTP

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 📁 Estrutura do Projeto

```
desafio-newsun-energy/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Schema do banco de dados
│   ├── src/
│   │   ├── domain/                 # Camada de domínio
│   │   │   ├── entities/          # Entidades de domínio
│   │   │   └── repositories/      # Interfaces de repositórios
│   │   ├── application/           # Camada de aplicação
│   │   │   ├── use-cases/         # Casos de uso
│   │   │   └── dtos/              # DTOs com validação Zod
│   │   ├── infrastructure/        # Camada de infraestrutura
│   │   │   ├── database/          # Prisma Service
│   │   │   ├── repositories/      # Implementação dos repositórios
│   │   │   └── external/          # Serviços externos (Magic PDF)
│   │   └── presentation/          # Camada de apresentação
│   │       ├── controllers/       # Controllers REST
│   │       └── pipes/             # Pipes de validação
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── lib/                   # Utilitários e API client
│   │   ├── simular/              # Página de simulação
│   │   └── listagem/              # Página de listagem
│   └── Dockerfile
├── docker-compose.yml
└── PROJECT.md
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 20 ou superior
- Docker e Docker Compose
- Git

### Opção 1: Executar com Docker (Recomendado)

1. **Clone o repositório** (se ainda não tiver feito):
   ```bash
   git clone <url-do-repositorio>
   cd desafio-newsun-energy
   ```

2. **Crie um arquivo `.env` na raiz do projeto** com as seguintes variáveis:
   ```env
   MYSQL_ROOT_PASSWORD=rootpassword
   MYSQL_DATABASE=newsun_energy
   MYSQL_USER=newsun
   MYSQL_PASSWORD=newsunpassword
   MYSQL_PORT=3306
   BACKEND_PORT=3000
   FRONTEND_PORT=3001
   NEXT_PUBLIC_API_URL=http://localhost:3000
   MAGIC_PDF_URL=https://magic-pdf.solarium.newsun.energy/v1/magic-pdf
   FRONTEND_URL=http://localhost:3001
   NODE_ENV=development
   ```

3. **Inicie os containers**:
   ```bash
   docker-compose up -d
   ```

4. **Execute as migrações do Prisma** (após o MySQL estar pronto):
   ```bash
   docker-compose exec backend npx prisma migrate dev --name init
   ```

5. **Acesse a aplicação**:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

### Opção 2: Executar Localmente (Sem Docker)

#### Backend

1. **Navegue até a pasta do backend**:
   ```bash
   cd backend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o banco de dados MySQL** e crie um arquivo `.env`:
   ```env
   DATABASE_URL="mysql://usuario:senha@localhost:3306/newsun_energy"
   PORT=3000
   NODE_ENV=development
   MAGIC_PDF_URL=https://magic-pdf.solarium.newsun.energy/v1/magic-pdf
   FRONTEND_URL=http://localhost:3001
   ```

4. **Execute as migrações do Prisma**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Inicie o servidor**:
   ```bash
   npm run start:dev
   ```

#### Frontend

1. **Navegue até a pasta do frontend**:
   ```bash
   cd frontend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Crie um arquivo `.env.local`**:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acesse**: http://localhost:3001

## 📡 Endpoints da API

### POST /simulacoes
Registra uma nova simulação de compensação energética.

**Body (multipart/form-data)**:
- `nomeCompleto`: string (obrigatório)
- `email`: string (obrigatório, formato email válido)
- `telefone`: string (obrigatório)
- `informacoesDaFatura`: JSON string (array de objetos com dados da fatura)
- `arquivos`: File[] (obrigatório, arquivos PDF das contas de energia)

**Resposta**: Objeto Lead com todas as unidades e consumos

### GET /simulacoes
Lista todas as simulações com filtros opcionais.

**Query Parameters**:
- `nome`: string (opcional) - Filtra por nome
- `email`: string (opcional) - Filtra por email
- `codigoUnidade`: string (opcional) - Filtra por código da unidade consumidora

**Resposta**: Array de objetos Lead

### GET /simulacoes/:id
Busca uma simulação específica por ID.

**Resposta**: Objeto Lead completo com todas as unidades e consumos

## 🗄️ Modelo de Dados

### Lead
- `id`: UUID (gerado automaticamente)
- `nomeCompleto`: string
- `email`: string (único)
- `telefone`: string
- `unidades`: Unidade[]

### Unidade
- `id`: UUID (gerado automaticamente)
- `codigoDaUnidadeConsumidora`: string (único)
- `modeloFasico`: 'monofasico' | 'bifasico' | 'trifasico'
- `enquadramento`: 'AX' | 'B1' | 'B2' | 'B3'
- `historicoDeConsumoEmKWH`: Consumo[] (exatamente 12 meses)

### Consumo
- `id`: UUID (gerado automaticamente)
- `consumoForaPontaEmKWH`: number
- `mesDoConsumo`: Date

## ✅ Regras de Negócio Implementadas

1. **Email único**: Cada lead deve ter um email único no sistema
2. **Código da unidade único**: Cada unidade consumidora deve ter um código único
3. **Mínimo 1 unidade**: Um lead deve ter pelo menos 1 unidade
4. **12 meses de histórico**: Cada unidade deve ter exatamente 12 meses de histórico de consumo
5. **Validação de tipos**: Modelo fasico e enquadramento devem ser valores válidos

## 🔧 Validações

### Backend
- Validação de schemas usando **Zod**
- Validação de email único
- Validação de código da unidade único
- Validação de quantidade de meses de histórico (exatamente 12)
- Validação de tipos (modelo fasico, enquadramento)

### Frontend
- Validação de campos obrigatórios
- Validação de formato de email
- Validação de arquivos (PDF)
- Feedback visual de erros

## 🔌 Integração Externa

A aplicação integra com a API externa da Newsun Energy para decodificação de contas de energia:

- **Endpoint**: `https://magic-pdf.solarium.newsun.energy/v1/magic-pdf`
- **Método**: POST
- **Content-Type**: multipart/form-data
- **Campo**: `file` (arquivo PDF da conta de energia)

A resposta da API é mapeada para o domínio interno:
- `unit_key` → `codigoDaUnidadeConsumidora`
- `chargingModel` → `enquadramento`
- `phaseModel` → `modeloFasico`
- `invoice[]` (array de objetos) → `historicoDeConsumoEmKWH`
  - Cada item do array `invoice` contém:
    - `consumo_fp` → `consumoForaPontaEmKWH`
    - `consumo_date` → `mesDoConsumo`

## 🧪 Testes

Para executar os testes do backend:

```bash
cd backend
npm test
```

Para testes end-to-end:

```bash
npm run test:e2e
```

## 📝 Scripts Úteis

### Backend
- `npm run start:dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start:prod` - Inicia o servidor em modo produção
- `npx prisma migrate dev` - Executa migrações do banco
- `npx prisma studio` - Abre o Prisma Studio para visualizar dados

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run start` - Inicia o servidor de produção

## 🐳 Docker

### Comandos Docker Úteis

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Ver logs
docker-compose logs -f

# Reconstruir imagens
docker-compose build --no-cache

# Executar comandos no container do backend
docker-compose exec backend <comando>

# Executar migrações no container
docker-compose exec backend npx prisma migrate dev
```

## 🎨 Interface do Usuário

### Página de Simulação (/simular)
- Formulário com campos: Nome, Email, Telefone
- Upload múltiplo de arquivos PDF
- Validação em tempo real
- Feedback de sucesso/erro

### Página de Listagem (/listagem)
- Tabela com todas as simulações
- Filtros por nome, email e código da unidade
- Link para detalhes de cada simulação
- Design responsivo

### Página de Detalhes (/listagem/[id])
- Informações completas do lead
- Detalhes de todas as unidades
- Histórico de consumo dos últimos 12 meses
- Visualização organizada e clara

## 🔒 Segurança

- Validação de dados no backend e frontend
- Sanitização de inputs
- CORS configurado
- Validação de tipos com TypeScript
- Constraints no banco de dados (UNIQUE, NOT NULL)

## 📦 Dependências Principais

### Backend
- `@nestjs/core`: ^11.0.1
- `@prisma/client`: Última versão
- `prisma`: Última versão
- `zod`: Última versão
- `axios`: Última versão
- `mysql2`: Última versão

### Frontend
- `next`: 16.0.5
- `react`: 19.2.0
- `tailwindcss`: ^4
- `axios`: Última versão

## 🚧 Melhorias Futuras

- [ ] Implementar autenticação e autorização
- [ ] Adicionar testes unitários e de integração
- [ ] Implementar paginação na listagem
- [ ] Adicionar exportação de dados (CSV, PDF)
- [ ] Implementar cache para melhor performance
- [ ] Adicionar monitoramento e logging
- [ ] Implementar rate limiting
- [ ] Adicionar documentação Swagger/OpenAPI

## 👤 Autor

Desenvolvido como parte do processo seletivo para desenvolvedor Full Stack na Newsun Energy.

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para o desafio técnico da Newsun Energy.

