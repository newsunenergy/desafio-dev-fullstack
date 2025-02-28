# NewSun Energy Brazil

## Executando o Projeto Localmente

Para executar o projeto localmente em sua máquina, serão mostradas duas formas de inicializar o projeto: uma com Docker e outra sem. É recomendado usar o Docker, pois proporciona um ambiente mais rápido e isolado para a execução da aplicação.

### Pré-requisitos

- Ter o Docker em sua máquina antes de prosseguir. (pré-requisito para quem deseja usar a opção com Docker)
- Certifique-se de ter as portas 3000 e 5000 livres em sua máquina antes de prosseguir.

### Iniciando com Docker

1. Clone o repositório do projeto para o seu ambiente de desenvolvimento:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório raiz do projeto;

3. Inicie o projeto usando o Docker Compose:

   ```bash
   docker compose up
   ```

   Isso iniciará os contêineres necessários para executar o frontend e o backend do projeto;

4. Após o processo de inicialização ser concluído, você poderá acessar a plataforma em seu navegador web através do seguinte endereço:

   ```bash
   http://localhost:3000
   ```

### Iniciando sem Docker

1. Clone o repositório do projeto para o seu ambiente de desenvolvimento:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do backend;

3. No arquivo .env, atualize a variável DATABASE_URL para um banco PostgreSQL no formato:

   ```bash
   DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORT/NOME_DO_BANCO"
   ```

4. Sincronize o banco de dados com Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o backend:

   ```bash
   npm run start
   ```

6. Navegue até o diretório do frontend;

7. Inicie o frontend:

   ```bash
   npm run start
   ```

   Isso iniciará os serviços necessários para executar o projeto;

8. Após o processo de inicialização ser concluído, você poderá acessar a plataforma em seu navegador web através do seguinte endereço:

   ```bash
   http://localhost:3000
   ```
