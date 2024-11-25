# NewSun

![App Screenshot](frontend/public/image/image1.png)

<!-- #### Acesse o projeto aqui -> [Ensinio](https://ensinio-ten.vercel.app/)  -->

<br>

# 📋 Sobre

Esta aplicação foi desenvolvida como parte de um desafio técnico com o objetivo de gerenciar leads e suas respectivas unidades consumidoras de energia elétrica. Ela permite o cadastro e consulta, além de fornecer uma interface para visualizar informações detalhadas sobre cada unidade consumidora, incluindo o histórico de consumo energético.

<br>

# 🔮 Imagens

|                   Home                    |                   Simulação                    |                     Listagem                      |                          Detalhe do Lead                          | Consumo do Lead                              |     |
| :---------------------------------------: | :--------------------------------------------: | :-----------------------------------------------: | :---------------------------------------------------------------: | -------------------------------------------- | --- |
| ![Home](frontend/public/image/image1.png) | ![Simulação](frontend/public/image/image2.png) | ![Toggle Todos](frontend/public/image/image3.png) | ![Limpa as que estão completas](frontend/public/image/image4.png) | ![Consumo](frontend/public/image/image5.png) |

<br>

# ✏️ Design

- Protótipo feito no Figma - [Acesse aqui](https://www.figma.com/design/gTO4GRnWr2VfjjDQrATbPR/NewSun-Energy?node-id=0-1&t=kaOGtNBkz8tRYPEW-1)

<br>

# 🔧 Como rodar na minha máquina?

### Executando a Aplicação com Docker

- Clone o projeto `git clone <URL_DO_REPOSITORIO>`
- Rode `cd desafio-dev-fullstack`

#### Configure as imagens Docker:

#### Backend:

- Rode `cd backend`
- Rode `docker build -t api .`

#### Frontend:

- Rode `cd frontend`
- Rode `docker build -t newsun-front .`

#### Retorne á raiz do projeto.

- Rode `docker-compose up`
- Abra o navegador e acesse: `http://localhost3000` para o frontend

### Executando a Aplicação Manualmente

#### Executando o Backend:

- Rode `cd backend`
- Rode `pnpm install`
- Crie um arquivo `.env` com os seguintes valores:
  `DATABASE_URL="mysql://root:root@localhost:3306/newsun`
- Sincronize o banco de dados com Prisma: `pnpm prisma migrate dev`
- Inicie o servidor: `pnpm start:dev`

#### Executando o Frontend:

- Rode `cd frontend`
- Rode `pnpm install`
- Inicie o servidor: `pnpm dev`

<br>

# 🛠 Tecnologias Usadas

### Backend

- Node.js
- NestJS
- Prisma
- MySQL

### Frontend

- Next.js
- Tailwind CSS
- ShadCN
- React Query (useQuery)
- React Hook Form
