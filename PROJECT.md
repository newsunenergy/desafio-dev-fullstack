# Projeto NewSun Energy Brazil

## Tecnologias Utilizadas

### **Frontend**
- **Next.js** - Framework React para SSR e SSG
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Estilização rápida e eficiente
- **React Icons** - Ícones personalizados
- **Material UI** - Biblioteca de componentes para interface de usuário

### **Backend**
- **NestJS** - Framework Node.js para desenvolvimento escalável
- **Prisma ORM** - Gerenciamento do banco de dados
- **MySQL** - Banco de dados relacional
- **Docker** - Contêinerização para facilitar o gerenciamento do banco de dados

## Configuração do Ambiente

### Criando o arquivo `.env.local` para o frontend

Crie um arquivo `.env.local` na raiz do projeto e adicione suas variáveis:

```sh
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Criando o arquivo `.env` para o backend

Crie um arquivo `.env` na raiz do projeto e adicione:
```ini
DATABASE_URL="mysql://UserName:password@localhost:3306/dataBaseName"
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=dataBaseName
MYSQL_USER=UserName
MYSQL_PASSWORD=password
PORT="3001"
```

## Executando o Projeto

### Subir o banco de dados com Docker
```sh
docker-compose up -d
```

### Instalar dependências do frontend e backend
```sh
npm install
```

### Rodar as migrations do Prisma
```sh
npx prisma migrate dev --name init
```
Isso criará as tabelas no banco de dados.

### Rodar o servidor do backend
```sh
npm run dev
```

### Iniciar o servidor do frontend
```sh
npm run dev  
```
O projeto rodará em [**http://localhost:3000**](http://localhost:3000) por padrão.

## Funcionalidades do Backend

### **1. Criar um novo cliente (Lead)**
**Rota:** `POST /clients`

**Descrição:** Cria um novo cliente com unidades consumidoras associadas.

**Corpo da Requisição:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "unidades": [
    {
      "codigoDaUnidadeConsumidora": "123456",
      "modeloFasico": "Bifásico",
      "enquadramento": "Residencial",
      "historicoDeConsumoEmKWH": [
        { "consumoForaPontaEmKWH": 300, "mesDoConsumo": "2025-01-01" }
      ]
    }
  ]
}
```

### **2. Listar todos os clientes com filtro**
**Rota:** `GET /clients?page={page}&limit={limit}&search={search}&filter={filter}`

**Parâmetros:**
- `page` (opcional): Número da página.
- `limit` (opcional): Número de registros por página.
- `search` (opcional): Busca por nome, email ou código da unidade consumidora.
- `filter` (opcional): Filtra clientes pelo `modeloFasico` da unidade consumidora.

**Exemplo de uso:**
```sh
GET /clients?page=1&limit=10&search=joao&filter=Bifásico
```

### **3. Buscar um cliente por ID**
**Rota:** `GET /clients/{id}`

**Descrição:** Retorna os detalhes de um cliente específico com suas unidades consumidoras e histórico de consumo.

---

## Como funciona o sistema de filtros?

### **Busca por nome, e-mail ou código da unidade**
Se for passado o parâmetro `search`, o sistema buscará clientes que:
- Contenham o termo no nome;
- Contenham o termo no e-mail;
- Possuam unidades consumidoras cujo código contenha o termo.

### **Filtragem por `modeloFasico`**
Se for passado o parâmetro `filter`, o sistema retornará apenas clientes que tenham ao menos uma unidade consumidora com o `modeloFasico` informado.

**Exemplo:** Se `filter=Bifásico`, apenas clientes com pelo menos uma unidade com modelo bifásico serão retornados.


