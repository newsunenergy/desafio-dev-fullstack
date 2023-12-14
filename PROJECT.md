Para executar o projeto siga os passos abaixo:

1 - Clone o projeto 
2 - Entre no Diretório Backend, via terminal digite o comando **npm install** para instalar as dependências do projeto
3 - Dentro do Diretório backend crie um arquivo **.env** na raiz do projeto e copie para dentro dele as informações contidas no arquivo **.env.exemple**
4 - Entre no Diretório frontend-new-sun e digite o comando **npm install** via terminal para instalar as dependências do projeto
5 - Volte para o diretório principal **desafio-dev-fullstack-12-2023** e digite o comando docker-compose up
6 - Entre no diretório backend e rode o comando **npm run migrate:dev**
7 - Volte para o diretório principal e interrompa o processo do **docker-compose up** apertando as teclas ctrl + c
8 - Execute novamente o comando **docker-compose up** e a aplicação já deve estar funcionando, sendo possível acessar o client pela url **http://localhost:3333**