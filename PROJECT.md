Para executar o projeto siga os passos abaixo:

1 - Clone o projeto.

2 - Entre no diretorio principal e utilize o comando **git checkout develop**.

3 - Entre no Diretório backend, via terminal digite o comando **npm install** para instalar as dependências do projeto.

4 - Dentro do Diretório backend crie um arquivo **.env** na raiz do projeto e copie para dentro dele as informações contidas no arquivo **.env.exemple**.

5 - Entre no Diretório frontend-new-sun e digite o comando **npm install** via terminal para instalar as dependências do projeto.

6 - Volte para o diretório principal **desafio-dev-fullstack-12-2023** e digite o comando docker-compose up.

7 - Entre no diretório backend e rode o comando **npm run migrate:dev** via terminal.

8 - Volte para o diretório principal e interrompa o processo do **docker-compose up** apertando as teclas ctrl + c.

9 - Execute novamente o comando **docker-compose up** e a aplicação já deve estar funcionando, sendo possível acessar o client pela url **http://localhost:3333**.