## O que foi feito no projeto

- Montei backend em NestJS, com o prisma ORM e segui a arquitetura MVC padrão do NestJS justamente por ser mais simples. Utilizei a biblioteca "class-validator" para realizar a validação do input, facilitando meu trabalho na ferramenta. O arquivo de entrypoint do container já roda as migrations e inicia o projeto.

- Fiz a estrutura do frontend em React do zero, utilizei a biblioteca @chakra-ui para facilitar a criação das telas, utilizei contexts nas páginas para evitar prop drilling nos componentes. Utilizei o vite para rodar o frontend e fazer o proxy com o backend.

  - Na página de formulário, optei por fazer algo simples e intuitivo.
  - Na página de listagem, optei por adicionar um filtro de ordenação dos campos e ID do lead, pois como era uma listagem simples, acabou sendo melhor e mais rápido fazer dessa maneira.

- Criei um ambiente de desenvolvimento com docker, e automatizei o setup inicial para facilitar novas instalações.

## Como rodar o projeto

Execute os seguintes comandos no terminal:

```
yarn
docker compose up -d --build
```

Após rodar os comandos acima, espere o ambiente subir e acesse http://localhost:9900
