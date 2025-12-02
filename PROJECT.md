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
- `nome`: string (opcional) - Filtra por nome (busca parcial - contains)
- `email`: string (opcional) - Filtra por email (busca exata - equals)
- `codigoUnidade`: string (opcional) - Filtra por código da unidade consumidora (busca exata - equals)

**Resposta**: Array de objetos Lead

**Nota**: Quando nenhum filtro é aplicado, retorna todas as simulações cadastradas.

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

1. **Email único**: Cada lead deve ter um email único no sistema (validação no backend)
2. **Código da unidade único**: Cada unidade consumidora deve ter um código único (validação no backend)
3. **Mínimo 1 unidade**: Um lead deve ter pelo menos 1 unidade (validação no frontend e backend)
4. **12 meses de histórico**: Cada unidade deve ter exatamente 12 meses de histórico de consumo
   - Se a API retornar mais de 12 meses, apenas os 12 mais recentes são utilizados
   - Se retornar menos de 12 meses, a simulação é rejeitada
5. **Validação de tipos**: Modelo fasico e enquadramento devem ser valores válidos
   - Modelo fasico: 'monofasico' | 'bifasico' | 'trifasico'
   - Enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
6. **Validação de telefone**: Deve conter 11 dígitos (DDD + número)
7. **Validação de arquivos**: Apenas arquivos PDF são aceitos

## 🔧 Validações

### Backend
- Validação de schemas usando **Zod** em todos os endpoints
- Validação de email único (retorna `ConflictException` se já existir)
- Validação de código da unidade único (retorna `ConflictException` se já existir)
- Validação de quantidade de meses de histórico (mínimo 12, trata casos com mais de 12)
- Validação de tipos (modelo fasico, enquadramento) via enum no Zod
- Validação de formato de email
- Validação de arquivos (verifica se há pelo menos um arquivo)
- Tratamento de erros da API externa com mensagens descritivas

### Frontend
- Validação de campos obrigatórios em tempo real
- Validação de formato de email com regex
- Validação de telefone (11 dígitos) com máscara automática
- Validação de arquivos (PDF) antes do upload
- Feedback visual de erros em todos os campos
- Validação de múltiplos arquivos (pelo menos um obrigatório)

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
- Máscara automática de telefone: `(XX) XXXXX-XXXX`
- Upload múltiplo de arquivos PDF com drag & drop
- Validação em tempo real
- Feedback visual de sucesso/erro
- Design moderno com cards transparentes e background image

### Página de Listagem (/listagem)
- Tabela com todas as simulações
- Filtros por nome, email e código da unidade
- **Busca parcial para nome** (permite encontrar por primeiro nome)
- **Busca exata para email e código** (requer valor completo)
- Botão para limpar filtros e recarregar lista
- Mensagem "Nenhuma simulação encontrada" quando não há resultados
- Link para detalhes de cada simulação
- Design responsivo com cards transparentes

### Página de Detalhes (/listagem/[id])
- Informações completas do lead
- Detalhes de todas as unidades
- Histórico de consumo dos últimos 12 meses em tabela organizada
- Visualização clara e moderna
- Botão de voltar para listagem

## 🎨 Design System e Estilização

### Sistema de Cores
A aplicação utiliza um sistema de cores centralizado através do TailwindCSS v4 com `@theme`:
- **Cores primárias**: Laranja (#FF9D29) com gradiente para botões (de #FF6B6B para #FF9D29)
- **Cores de texto**: Azul escuro (#0B3C78) para títulos, cinza (#676767) para textos secundários
- **Cores de estado**: Vermelho (#EF4444) para erros
- **Background**: Imagem de painéis solares com overlay semi-transparente
- Todas as cores são configuráveis através de variáveis CSS no `globals.css`

### Componentes Reutilizáveis
- **Input**: Componente de input com suporte a modo escuro (`darkMode`), validação e labels
- **Button**: Botões com variantes (primary com gradiente, secondary com borda)
- **FileUpload**: Upload de arquivos com drag & drop, validação de tipo PDF, suporte a modo escuro

### Background e Overlay
- Background image com painéis solares
- Overlay semi-transparente (rgba(0, 0, 0, 0.2)) para melhor legibilidade
- Cards com `backdrop-filter: blur(10px)` para efeito moderno
- Bordas arredondadas (16px) para design mais suave

## 🔍 Sistema de Filtros

### Comportamento dos Filtros
- **Nome**: Busca parcial (`contains`) - permite encontrar por primeiro nome ou parte do nome
- **Email**: Busca exata (`equals`) - requer email completo para encontrar resultados
- **Código da Unidade**: Busca exata (`equals`) - requer código completo para encontrar resultados

### Melhorias de UX
- Limpar filtros recarrega a lista imediatamente (sem race conditions)
- Mensagem "Nenhuma simulação encontrada" quando não há resultados
- Tratamento correto de estados vazios e erros
- Loading states durante carregamento de dados

## 📱 Validações e Máscaras

### Frontend
- **Telefone**: Máscara automática `(XX) XXXXX-XXXX` com validação de 11 dígitos
- **Email**: Validação de formato em tempo real com regex
- **Arquivos**: Validação de tipo PDF antes do upload
- Feedback visual de erros em todos os campos
- Validação de campos obrigatórios

### Backend
- Validação de schemas com **Zod** em todos os endpoints
- Validação de unicidade (email, código da unidade)
- Validação de quantidade de meses (mínimo 12, trata casos com mais de 12)
- Tratamento robusto de erros da API externa Magic PDF
- Mensagens de erro descritivas e amigáveis

## 🔄 Tratamento de Histórico de Consumo

A aplicação trata automaticamente casos onde a API externa retorna mais de 12 meses de histórico:

1. **Ordenação**: Ordena por data (mais recente primeiro)
2. **Seleção**: Seleciona os 12 meses mais recentes
3. **Reordenação**: Reordena cronologicamente (mais antigo primeiro)
4. **Garantia**: Sempre há exatamente 12 meses de histórico por unidade

Este tratamento garante que mesmo quando a API retorna 13 ou mais meses, apenas os 12 mais recentes são utilizados, mantendo a consistência dos dados.

## 🎯 Melhorias de Código Implementadas

### Backend
- **Clean Architecture** com separação clara de responsabilidades:
  - Domain: Entidades e interfaces
  - Application: Casos de uso e DTOs
  - Infrastructure: Implementações (Prisma, serviços externos)
  - Presentation: Controllers e pipes
- **Dependency Injection** com tokens customizados para repositórios
- **Filtro global de exceções** (`AllExceptionsFilter`) para tratamento centralizado
- **Logging detalhado** para debugging e monitoramento
- **Tratamento robusto de erros** da API externa com mensagens específicas
- **Validação com Zod** em todos os endpoints

### Frontend
- **Componentes funcionais** com TypeScript e tipagem forte
- **Gerenciamento de estado** com React Hooks (useState, useEffect)
- **Tratamento de erros** com feedback visual
- **Validação em tempo real** nos formulários
- **Loading states** para melhor UX
- **Componentes reutilizáveis** (Input, Button, FileUpload)
- **Sistema de cores centralizado** com TailwindCSS v4

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

Caio Dias de Oliveira
Desenvolvido como parte do processo seletivo para desenvolvedor Full Stack na Newsun Energy.

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para o desafio técnico da Newsun Energy.

