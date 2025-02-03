# Projeto: Simulação de Compensação Energética

Este projeto foi desenvolvido para atender aos requisitos do desafio técnico, implementando uma aplicação com "frontend" em Next.js e "backend" em Nest.js. 
O sistema permite que os usuários realizem simulações de planos de compensação energética e acessem os dados registrados de forma eficiente.

### **Tecnologias Utilizadas**

**Frontend**: React.js

**Backend**: Nest.js

**Banco de Dados**: PostgreSQL

**ORM**: Prisma

**Upload de Arquivos**: Multer

**Integração com API Externa**: Axios

### **Frontend**

- Página de formulário para submissão de simulações (`/simular`).
- Página de listagem de simulações (`/listagem`), com filtros por nome, email e com botão para mostras mais detalhes como código da unidade consumidora e etc.
- Integração com o backend para enviar e buscar dados.

### **Backend**

- **Endpoints disponíveis**:

  1. **Registrar Simulação**: Recebe os dados do formulário e processa as informações.
  2. **Listar Simulações**: Retorna todas as simulações, com suporte a filtros.
  3. **Buscar Simulação por ID**: Retorna os detalhes de uma simulação específica.
  4. **Delete**: Delete colocado para caso precisa deletar para fazer outro teste

    #### **Banco de Dados: postgresql**

     O projeto utiliza **postgresql** como banco de dados, uma solução leve e eficiente que não requer configuração de servidor.

### **Serviço de Leads**

O LeadsService gerencia as operações relacionadas à simulação de compensação energética, incluindo:

**Decodificação de Conta de Energia**: Processamento do PDF enviado pelo usuário, extraindo dados relevantes via API externa.

**Criação de Leads**: Armazena os dados extraídos e as informações fornecidas pelo usuário.

**Filtragem e Listagem**: Retorna os registros com opções de filtragem dinâmicas.

**Histórico de Consumo**: Organiza os dados de consumo por período.

## **Utilitário Moth**

A função Moth organiza os registros de consumo de energia, garantindo que os dados sejam ordenados corretamente e limitando a quantidade de resultados retornados.

```javascript
export const Moth = <T extends string>(
  field: T,
  limit: number = 12,
): { orderBy: { [key in T]: 'desc' }; take: number } => {
  if (typeof field !== 'string' || field.trim() === '') {
    throw new Error('Field must be a non-empty string.');
  }

  if (typeof limit !== 'number' || limit <= 0) {
    throw new Error('Limit must be a positive number.');
  }

  return {
    orderBy: { [field]: 'desc' } as { [key in T]: 'desc' },
    take: limit,
  };
};
```

## Como Executar o Projeto

### **Pré-requisitos**

- Node.js 21 ou superior.
- Docker (opcional, para execução em contêiner).

## **Configuração do Ambiente**
O projeto usa variáveis de ambiente definidas no arquivo **.env.local**:
```.env
PORT=3000

DB_HOST=localhost
DB_PORT=5436
DB_USER=test
DB_PASS=admin
DB_NAME=newsun
REDIS_PORT=6379

DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public
```

A conexão com o banco de dados PostgreSQL é feita por meio da variável **DATABASE_URL**.
O Redis também está configurado para rodar na porta **6379**.

##  **Execução com Docker**
O projeto pode ser executado facilmente usando Docker. Para subir os serviços, basta rodar:
```sh
docker-compose up -d
```
Isso inicializará o banco de dados PostgreSQL e o Redis dentro de contêineres, garantindo que os serviços estejam prontos para o uso.

## Frontend

#### Tecnologias utilizadas:

-Next.js
-Tailwind CSS
-Zod
-Fetch API

**Conclusão**

O projeto de Simulação de Compensação Energética implementa uma solução eficiente para registrar, listar e buscar simulações de consumo de energia.
 Com uma arquitetura bem estruturada e tecnologias modernas, ele proporciona uma experiência fluida e eficiente para os usuários.


