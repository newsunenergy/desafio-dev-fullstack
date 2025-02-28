# Desafio FullStack New Sun Energy

## Stack

### Backend

- Typescript
- NestJS
- PrismaORM
- MySQL
- Docker
- Jest
- Zod Pipe Validator (para criação de DTO's validados com Zod)

### Frontend

- NextJS
- Typescript
- TailwindCSS
- Shadcn/ui
- Lucide Icons
- Tanstack React Query
- Zod
- React Hook Form

## Setup do Projeto

### Backend

#### Entre no diretório do backend

```bash
cd backend
```

#### Crie o arquivo `.env`

Renomeie o arquivo `.env.example` para `.env`, que deve ficar algo assim:

```env

MYSQL_ROOT_PASSWORD = root

MYSQL_DATABASE = mydb
MYSQL_USER = user
MYSQL_PASSWORD = password
MYSQL_HOST = mysql

DATABASE_URL="mysql://root:${MYSQL_ROOT_PASSWORD}@${MYSQL_HOST}:3306/${MYSQL_DATABASE}"

PORT=9000
```

#### Inicialize os containers

```bash
docker compose up -d
```

### Frotend

#### Entre no diretório do frontend

```bash
cd frontend
```

#### Crie o arquivo `.env`

Renomeie o arquivo `.env.example` para `.env`, que deve ficar algo assim:

```env
NEXT_PUBLIC_API_URL=http://localhost:9000
```

#### Inicialize o container

```bash
docker compose up -d
```

Com isso, a API e o Web deverão estar de pé no http://localhost:9000 e http://localhost:3000, respectivamente.
