# 🌞 Simulação de Compensação Energética Solar

### **Desafio Full Stack**

Projeto **full stack completo** utilizando **NestJS + React**, que permite ao usuário João enviar seus dados pessoais junto
com suas contas de energia em PDF, decodificá‑las automaticamente via
API interna da **NewSun Energy**, e visualizar todo o histórico de
simulações realizadas.

------------------------------------------------------------------------

## 🚀 Funcionalidades Implementadas

-   🔼 **Upload de múltiplas contas de energia (PDF)**
-   🤖 **Decodificação automática** usando
    `https://magic-pdf.solarium.newsun.energy`
-   ✔️ **Validação rigorosa**:
    -   Modelos fásicos: *monofásico, bifásico, trifásico*
    -   Enquadramento: *AX, B1, B2, B3*
    -   Exatamente **12 meses** de histórico de consumo
    -   Telefone BR válido
    -   E-mail único no sistema
    -   Unidade Consumidora única (UC)
-   🔍 **Listagem com filtros** (nome, e-mail e código da UC)
-   📄 **Detalhe da simulação por ID**
-   📘 **Swagger documentado e organizado**
-   🐳 **Ambiente totalmente dockerizado** (zero setup local)

------------------------------------------------------------------------

## 🛠️ Tecnologias Utilizadas

### 🧩 **Backend**

-   NestJS 10 + TypeScript\
-   Prisma ORM + MySQL\
-   Multer (upload de arquivos)\
-   class-validator + validadores customizados\


### 🎨 **Frontend**

-   React + Next.js\
-   TailwindCSS

### 🏗️ **Infra**

-   Docker + Docker Compose\
-   MySQL 8.0

------------------------------------------------------------------------

## ▶️ Como Rodar o Projeto

``` bash
# 1. Clone o repositório
git clone https://github.com/WesleyReis13/desafio-dev-fullstack.git
cd desafio-dev-fullstack

# 2. Suba tudo com Docker (leva ~3 minutos na primeira vez)
docker compose up --build

# ✔️ Acesse:
# Frontend........ http://localhost:3000
# Swagger.......... http://localhost:3001/api
```

------------------------------------------------------------------------

## 🔗 Endpoints Principais

  -----------------------------------------------------------------------------
  Método                 URL                    Descrição
  ---------------------- ---------------------- -------------------------------
  **POST**               `/leads/simular`       Envia formulário + PDFs e cria
                                                uma simulação

  **GET**                `/leads?filtro=joão`   Lista simulações com filtro

  **GET**                `/leads/:id`           Detalhes de uma simulação
                                                específica
  -----------------------------------------------------------------------------

------------------------------------------------------------------------

## 🖥️ Telas do Frontend

-    `/simular` → **Formulário completo para upload e envio**
-   `/listagem` → **Tabela com filtros, paginação e links para
    detalhes**

------------------------------------------------------------------------

## 🛡️ Validações Implementadas

-   E‑mail **único** no sistema\
-   Código da **Unidade Consumidora único**\
-   Pelo menos **1 fatura enviada**\
-   **12 meses exatos** de histórico\
-   Fase e enquadramento validados via enum\
-   Telefone brasileiro **(formato válido)**\
-   Mensagens de erro **descritivas e claras** em português

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    /
    ├── backend/           # NestJS + Prisma + Docker
    ├── frontend/          # React
    ├── docker-compose.yml
    └── README.md          

------------------------------------------------------------------------

## 👨‍💻 Autor

**Wesley Reis**\
📩 reiswesley738@gmail.com
