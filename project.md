
# Sun Energy Company Challenge
Em resumo, a aplicação é composta por uma api que decodifica contas de luz, valida e realiza um lead caso tudo esteja nos conformoes.

As informações podem ser obtidas ao clicar na pagina de listagem, e podem ser filtrados por: 
* código da unidade 
* dados do usuário (nome, email, telefone)
Clicar em um usuário te redirecionará para a pagina de detalhes daquele usuário, mostrando todos os seus leads com suas devidas unidades e meses de consumo.

> [!CAUTION]
> * Não é possivel registar o mesmo email mais do que uma vez
> * O pdf enviado é obrigatório e deve ser uma conta válida
> * O código da unidade deve ser unico. Caso conste no sistema, o form é cancelado imediatamente
> * O pdf deve conter exatamente 12 faturas, ou seja, doze meses. Do contrario, também sera retornado um erro

# Primeiros passos
## Como instalo e utilizo a aplicação?
#### 1:  Clone ou Baixe o projeto [neste link](https://github.com/manolo-dias/desafio-dev-fullstack-12-2023). 
#### Você irá se deparar com 3 pastas na raíz do software. São elas:
* api
* frontend
* contas-de-energia
Essa ultima pasta serve apenas pra testes, outras faturas com o mesmo formato podem ser colocadas também.

#### 2: Com o software em mãos, navegue até a **raíz** do projeto, aonde se encontram os três itens mencionados, digite o comando a seguir
```bash
 docker compose up -d --build; yarn; yarn prisma db push
```

Após o processamento, a api e o site estão prontos para serem utilizados.
Você poderá consumir a api a partir de http://localhost:5173/


# Endpoints
* listagem
* \
* simular

Isso vale tanto pro site [5173](https://localhost:5173) quanto pra api [3000](https://localhost:3000) que funciona separadamente também.

O endpoint /listagem pode receber uma key e um valor como query e usará pra realizar uma busca. Ex: /listagem?parametroEx="valorEx"


    