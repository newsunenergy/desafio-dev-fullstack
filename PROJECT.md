
# Executando o projeto

Clone o projeto no diretório que desejar executando o comando abaixo:

    git clone https://github.com/tarcisioandrade/newsun-challenge.git

## Backend

Entre na pasta `/backend` e instale as dependências com `npm install`;

Crie o banco de dados executando o comando: `docker compose up -d`

Execute o comando `npx prisma migrate deploy` para criar as tabelas;
>[!NOTE]
>Já existe o arquivo `.env` com a string de conexão compatível com as informações no docker-compose.yaml 

Inicie o servidor com o comando `npm run dev`, o servidor será executado na porta **3333**

## Frontend

Entre na pasta `/frontend` e instale as dependências com `npm install`;

Inicie o o projeto com o comando `npm run dev`

>[!NOTE]
>O servidor deve permanecer ligado para utilizar os recursos disponíveis.
