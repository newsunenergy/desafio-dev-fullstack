## O que foi feito no projeto

- Montei o backend em NestJS (com o prisma ORM) e segui a arquitetura MVC padrão do framework, justamente por ser mais simples. Utilizei a biblioteca "class-validator" para realizar a validação dos dados que chegam da API, facilitando meu trabalho na ferramenta. O arquivo de entrypoint do container já roda as migrations e inicia o projeto.

- Fiz a estrutura do frontend em React do zero, utilizei a biblioteca @chakra-ui para facilitar a criação das telas, apliquei contexts nas páginas para evitar prop drilling nos componentes. Utilizei o vite para rodar o frontend e fazer o proxy com a API do backend, o backend pode ser acessado via proxy passando a rota "/api".

  - Na página de formulário, optei por fazer algo simples e intuitivo, visando uma boa experiência do usuário.
  - Na página de listagem, optei por adicionar um filtro de ordenação dos campos e ID do lead, pois como era uma listagem simples, acabou sendo melhor e mais rápido fazer dessa maneira.

- Criei um ambiente de desenvolvimento com docker, e automatizei o setup inicial para facilitar novas instalações.

## Como rodar o projeto

Execute os seguintes comandos no terminal:

```
yarn
docker compose up -d --build
```

Após rodar os comandos acima, espere o ambiente subir e acesse http://localhost:9900
