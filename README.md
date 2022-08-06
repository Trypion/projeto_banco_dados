## :briefcase:IMPLEMENTAÇÃO PROJETO BANCO DE DADOS 1 

##### criado por Israel Schmittt

#### INTRO :floppy_disk:

O projeto foi implementado em javascript com um banco de dados postgres no formato de uma API REST, utiliza de docker para subir a database e os serviços.

#### INFRA

```
- src
  |- infra
    |- database
    |- repositories
  |- models
  |- services
```

#### Rorando o projeto :computer:

Para rodar o projeto é necessario ter o docker ou ter um banco de dados postgres e executar o script de init.

#### Docker:

Na pasta raiz do projeto onde está o arquivo de docker-compose.yml basta rodar o comando:

```shellscript
docker-compose up -d --build
```

O compose vai subir um banco de dados postgres rodar o script init.sql se for a primeira vez que o container estiver subindo e o serviço de api.

As credenciais do banco de dados estão no compose no serviço "db_postgres", na parte de "enviroments".

```yml
environment:
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "postgres"
```

Depois que o compose terminal, o banco de dados vai estar disponivel na porta 5432 e a api na porta 5000. Para testar ler a seção de **teste** mais abaixo.

##### limpando:

Após os testes para limpar tudo basta rodar, irá excluir todos os container e imagens criados pelo projeto.

```shellScript
docker-compose down --rmi all
```

#### Sem docker:

Sem docker é preciso ter uma database *postgres* instalada ou fornecer uma em nuvem e ter o *nodejs 16+* instalado. Com uma database postgres disponivel agora é só rodar o script de init.sql ele vai criar uma database "dev" as tabelas e inserir alguns dados.

Antes de iniciar a aplicação é necessario fornecer através de variaveis de ambientes as credenciais e o host da database para a api.

```shellScript
DATABASE_HOST="localhost"
DATABASE_USER="postgres"
DATABASE_PASSWORD="postgres"
DATABASE_PORT=5432
DATABASE_NAME="dev"
```

Agora é necessario ter o nodejs e instalar as dependencias da aplicação, na pasta raiz do projeto

```shellScript
npm install
```

Com as dependecias instaladas é só rodar

```shellScript
npm run start
```

Se tudo der certo você verá uma mensagem que o servidor está rodando na porta 5000.


#### Testando :hammer:

Como o projeto é uma api rest, ela pode ser testada com um brower ou um software de terceiro como o postman.

Algumas rotas para testar:

- Listando bancos: GET [localhost:5000/banks](localhost:5000/banks)
```shellScript
curl --location --request GET 'localhost:5000/banks'
```

- Criando um banco: POST [localhost:5000/banks](localhost:5000/banks)
```shellScript
curl --location --request POST 'localhost:5000/banks' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "banco Fantasia"
}'
```

- Consultando o banco criado: GET [localhost:5000/banks/4](localhost:5000/banks/4)
```shellScript
curl --location --request GET 'localhost:5000/banks/4'
```

- Editando o banco criado: PUT [localhost:5000/banks/4](localhost:5000/banks/4)
```shellScript
curl --location --request PUT 'localhost:5000/banks/4' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "banco Fantasia editado"
}'
```

- Deletando um banco: DELETE [localhost:5000/banks](localhost:5000/banks/4)
```shellScript
curl --location --request DELETE 'localhost:5000/banks/4'
```

Algumas outras consultas:

- Detalhes de contratos: GET [localhost:5000/contracts/details](localhost:5000/contracts/details)
```shellScript
curl --location --request GET 'localhost:5000/contracts/details'
```

- Historico de um contrato: GET [localhost:5000/contracts/history/4](localhost:5000/contracts/history/4)
```shellScript
curl --location --request GET 'localhost:5000/contracts/history/4'
```

- Numero de contratos por status: GET [localhost:5000/contracts/count/status](localhost:5000/contracts/count/status)
```shellScript
curl --location --request GET 'localhost:5000/contracts/count/status'
```

- Valor em contratos por banco: GET [localhost:5000/banks/total-revenue](localhost:5000/banks/total-revenue)
```shellScript
curl --location --request GET 'localhost:5000/banks/total-revenue'
```