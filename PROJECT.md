Para executar o projeto siga os passos abaixo:

- Vídeo demonstrando como rodar o projeto e detalhes do projeto: https://youtu.be/2pgivWDPUhg
- Vídeo demonstrando endpoints de busca do projeto: https://youtu.be/HOQX_bBbl_w

1 - Clone o projeto.

2 - Entre no diretorio principal e utilize o comando **git checkout develop**.

3 - Entre no Diretório backend, via terminal digite o comando **npm install** para instalar as dependências do projeto.

4 - Dentro do Diretório backend crie um arquivo **.env** na raiz do projeto e copie para dentro dele as informações contidas no arquivo **.env.exemple**.

5 - Entre no Diretório frontend-new-sun e digite o comando **npm install** via terminal para instalar as dependências do projeto.

6 - Volte para o diretório principal **desafio-dev-fullstack-12-2023** e digite o comando docker-compose up.

7 - Entre no diretório backend e rode o comando **npm run migrate:dev** via terminal.

8 - Volte para o diretório principal e interrompa o processo do **docker-compose up** apertando as teclas ctrl + c.

9 - Execute novamente o comando **docker-compose up** e a aplicação já deve estar funcionando, sendo possível acessar o client pela url **http://localhost:3333**.

Detalhes do projeto:

Utilizei as seguintes Tecnologias: NodeJS, ReactJS, Typescript, Docker, PrismaIO, Chakra UI, MySQL e Axios para requisições no Client.

Iniciei o desenvolvimento pelo Backend e implementei uma arquitetura que conheço tentando aplicar os conceitos de DDD, Clean Architecture, Clean Code e SOLID, dividindo o backend em diversas camadas, cada uma com suas responsabilidades específicas e isolando as regras de domínio da aplicação. Comecei criando a estrutura inicial de pastas, baixando algumas dependencias fundamentais e configurando o Prisma e o Docker para rodar tanto o Backend como o Banco de Dados. Eu criei todos os usecases, controllers e repositórios me baseando nas regras que estão descritas no README.md do projeto, começando pela parte de criação de um lead e depois as buscas por ID e por diferentes filtros. Após finalizar esse desenvolvimento inicial do backend, tive que fazer apenas algumas manutenções durante a criação do frontend, por conta de inconsistencias que percebi no funcionamento da API.

Quando finalizei o Backend, já dei inicio ao desenvolvimento do frontend, decidi utilizar Vite para rodar o react, pois é muito mais rápido para buildar o projeto e visualizar o frontend. Logo de inicio já instalei as dependencias que julguei fundamentais para o projeto e já criei a estrutura de rotas da aplicação com react-router-dom. Depois desenvolvi a tela de criação de lead, com o axios criei um serviço para decodificar os arquivos de conta, e depois um serviço para criar um Lead. Para genrenciar o formulário de criação de Lead, utilizei a lib react-hook-form. Depois de acertar uns detalhes da API a criação de Lead já era possível. Então comecei a desenvolver a tela de listagem de leads, me baseando no design da tela de criação de Lead. adicionei mais um serviço com o axio para consumir rota de listagem de lead filtrada, depois implementei na página de listagem. Depois adicionei no front a verificação de que cada conta decodificada possua 12 históricos de consumo dentro de si antes de colocar os dados dentro do state que depois seria enviado para API. Após isso apenas me atentei a alguns detalhes que faltavam na aplicação e componentizei os componentes que acreditei que poderiam ser reutilizados. 
