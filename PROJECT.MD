# Executando o Projeto

## Server

1. **Acesse a pasta do servidor:**
   Navegue até a pasta `/server`, que contém o servidor Node.js do projeto.

2. **Instale as dependências:**
   Execute o comando abaixo para instalar todas as dependências necessárias:
   - pnpm i

3. **Inicie o banco de dados com Docker:**
   Utilize o Docker Compose para inicializar o banco de dados. Execute o seguinte comando:
   - docker-compose up -d

   Caso precise personalizar as configurações do banco de dados, edite o arquivo `docker-compose.yml`.

4. **Execute as migrations:**
   Após o banco de dados estar rodando, execute as migrations para criar as tabelas no banco com o comando:
   - pnpm drizzle-kit migrate

5. **Visualize e gerencie as tabelas (opcional):**
   Você pode visualizar as tabelas do banco de dados com o Drizzle Studio executando:
   - pnpm drizzle-kit studio
   Para realizar alterações ou gerar novos arquivos de migration, use o comando:
   - pnpm drizzle-kit generate

6. **Inicie o servidor:**
   Com tudo configurado, basta rodar o servidor com o comando:
   - pnpm run dev
   O servidor ficará rodando e pronto para aceitar requisições.

---

## Web

1. **Acesse a pasta do frontend:**
   Abra um novo terminal e navegue até a pasta `/web`, que contém o frontend do projeto:
   - cd web/

2. **Instale as dependências do frontend:**
   Execute o seguinte comando para instalar as dependências necessárias:
   - pnpm i

3. **Inicie o frontend:**
   Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando:
   - pnpm run dev
   O frontend estará disponível e em execução.

--- 

#  Tecnologias


## 🚀 Technologies

-- Backend
     
- [fastify](https://fastify.dev/)
- [Node.js](https://nodejs.org/pt)
- [Drizzle ORM](https://orm.drizzle.team/) 
- [postgreSQL](https://www.postgresql.org/)    
- [ky](https://github.com/sindresorhus/ky) 
- [Zod](https://github.com/colinhacks/zod)
- [BiomeJS](https://biomejs.dev/pt-br/) -- Substitui eslint + prettier
- [Typescript](https://www.typescriptlang.org/)
 

 -- Frontend
 
- [NextJs 15 + server Actions](https://nextjs.org/)
- [React 19 RC](https://react.dev/)  -- Release Candidate
- [Radix UI](https://www.radix-ui.com/)  
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind](https://tailwindcss.com/) 
- [Zod](https://github.com/colinhacks/zod)
- [Typescript](https://www.typescriptlang.org/)
