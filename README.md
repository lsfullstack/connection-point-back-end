# Connection Point

A Connection Point é uma API voltada para o usuário se cadastrar, podendo registrar inúremos clientes, ao mesmo tempo que para cada cliente é possivel relacionar vários contatos.

<br/>

> ### <h2>SUMÁRIO:</h2>

* <a href="#techs" target="_self">Tecnologias</a>
* <a href="#tables" target="_self">Diagramas de Relacionamento</a>
* <a href="#config" target="_self">Como executar a aplicação</a>
* <a href="#requests" target="_self">Requisições</a>

<br/>

> ### <h2 id="techs">TECNOLOGIAS:</h2>

* Express Js;
* TypeScript;
* TypeORM;
* JsonWebToken;
* Bcrypt.Js
* Dotenv;
* Ts-node-dev
* Pg;
* Reflect-Metadata;
* Class-Tranformer;
* Express-async-errors.

<br/>

> ### <h2 id="tables">DIAGRAMAS DE RELACIONAMENTO:</h2>

<br/>

<img src="./src/assets/connection-point.drawio.png"/>

<br/>

> ### <h2 id="config">COMO EXECUTAR A APLICAÇÃO:</h2>

* Faça clone desse repositório na máquina;
* Acesse a pasta do projeto;
* Instale as dependências:
  <br/>

  ```
  yarn install
  ```

* Renomeie o arquivo `.env.example` para `.env`;
* Insira as informações nas variávies de ambiente do `.env`;
* Crie um banco de dados postgres com o nome usado na variável de ambiente;
* Execute as migrations:
  <br/>

  ```
  yarn typeorm migration:run -d src/data-source
  ```

* Execute a aplicação:
  <br/>

  ```
  yarn dev
  ```

  * Você receberá as seguintes mensagem no terminal, indicando que a aplicação está sendo executada e que conectou-se ao banco de dados:
    * `Server running in port 3000`
    * `Database connected`
  
  * Utilize a URL http://localhost:3000 para fazer as requisições.
  
* Por fim, execute as requisições conforme instruções abaixo.
  
<br/>

> ### <h2 id="requests">REQUISIÇÕES:</h2>

<br>

> ## Create User - POST `/users`
>> Formato da requisição:
>
> * O `email` deve ser único;
> * Todos os campos são `obrigatórios`;
>
>```json
> {
>  	"name": "Gabriel",
>  	"username": "gabriel",
>  	"email": "gabriel@mail.com",
>   "password": "1234",
>  	"isAdm": false,
> }
>```
>
>> Formato da resposta:
>
> * Status: `201 CREATED`;
> * A `password` do usuário será armazenada como `hash` e `não será retornada` na resposta;
>
>```json
>  {
>  	 "id": "c87478af-e26a-4e14-a15c-1893f2f23124",
>  	 "name": "Gabriel",
>  	 "username": "gabriel",
>  	 "email": "gabriel@mail.com",
>  	 "isAdm": false,
>  	 "isActive": true,
>  	 "createdAt": "2023-02-06T10:50:19.606Z",
>  	 "updatedAt": "2023-02-06T10:50:19.606Z"
>  }
>```
>
> ### E-mail já cadastrado
>> Formato da resposta:
>
> * Status: `409 CONFLICT`;
>
>```json
> {
>   "message": "E-mail already exists"
> }
>```
>---

<br/>

> ## Profile User - GET `/users/profile`
>> Formato da requisição:
>
> * Necessário autenticação por `token`
>
>> Formato da resposta:
>
> * Status: `200 OK`;
> * A `password` do usuário `não será retornada` na resposta;
>
>```json
>  {
>  	 "id": "c87478af-e26a-4e14-a15c-1893f2f23124",
>  	 "name": "Gabriel",
>  	 "username": "gabriel",
>  	 "email": "gabriel@mail.com",
>  	 "isAdm": false,
>  	 "isActive": true,
>  	 "createdAt": "2023-02-06T10:50:19.606Z",
>  	 "updatedAt": "2023-02-06T10:50:19.606Z"
>  }
>```
> ### Sem token / token inválido
>> Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
>---

<br/>

> ## Retrieve User - GET `/users/:user_id`
>> Formato da requisição:
>
> * Necessário autenticação por `token`
>
>> Formato da resposta:
>
> * Status: `200 OK`;
> * Apenas `administradores` podem acessar;
>
>```json
>  {
>  	 "id": "25cf0e7f-9309-4257-a99a-94ffa9d4c205",
>  	 "name": "Lucas",
>  	 "username": "lucas",
>  	 "email": "lucas@mail.com",
>  	 "isAdm": false,
>  	 "isActive": true,
>  	 "createdAt": "2023-02-06T10:49:09.505Z",
>  	 "updatedAt": "2023-02-06T10:49:09.505Z"
>  }
>```
> ### Sem token / token inválido
>> Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ### Sem ser Administrador
>> Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "User is not admin"
> }
>```
> ### Id Inválido
>> Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "User not found"
> }
>```
>---

<br>

> ## List Users - GET `/users/`
>> Formato da requisição:
>
> * Necessário autenticação por `token`
>
>> Formato da resposta:
>
> * Status: `200 OK`;
> * Apenas `administradores` podem acessar;
>
>```json
>  [
>  	 {
>  	 	 "id": "25cf0e7f-9309-4257-a99a-94ffa9d4c205",
>  	 	 "name": "Lucas",
>  	 	 "username": "lucas",
>  	 	 "email": "lucas@mail.com",
>  	 	 "isAdm": false,
>  	 	 "isActive": true,
>  	 	 "createdAt": "2023-02-06T10:49:09.505Z",
>  	 	 "updatedAt": "2023-02-06T10:49:09.505Z"
>  	 },
>  	 {
>  	 	 "id": "c87478af-e26a-4e14-a15c-1893f2f23124",
>  	 	 "name": "Gabriel",
>  	 	 "username": "gabriel",
>  	 	 "email": "gabriel@mail.com",
>  	 	 "isAdm": false,
>  	 	 "isActive": true,
>  	 	 "createdAt": "2023-02-06T10:50:19.606Z",
>  	 	 "updatedAt": "2023-02-06T10:50:19.606Z"
>  	 }
>  ]
>```
> ### Sem token / token inválido
>> Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ### Sem ser Administrador
>> Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "User is not admin"
> }
>```
>---

<br>

> # Update User - PATCH `/users/:user_id`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
> * Apenas o `administrador` pode atualizar `outros usuários`;
> * Apenas os campos de `name`, `username`, `email` e `password` podem ser alterados;
>  
>```json
>  {
>  	 "name": "Lucas Silva",
>  	 "username": "lucas_silva",
>  	 "email": "lucas.silva@mail.com",
>  	 "password": "123456"
>  }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;  
> * A `password` do usuário `não deve ser retornada` na resposta;
>
>```json
>  {
>  	 "id": "25cf0e7f-9309-4257-a99a-94ffa9d4c205",
>  	 "name": "Lucas Silva",
>  	 "username": "lucas_silva",
>  	 "email": "lucas.silva@mail.com",
>  	 "isAdm": false,
>  	 "isActive": true,
>  	 "createdAt": "2023-02-06T10:49:09.505Z",
>  	 "updatedAt": "2023-02-06T13:09:19.645Z"
>  }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>  
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>  
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "User not found"
> }
>```
> ## Atualizando outro usuário sem ser administrador
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "User is not admin"
> }
>```
>---

<br>

> # Delete User - DELETE `/users/:user_id`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
> * Apenas o `administrador` pode deletar `outros usuários`;
> 
>> ## Formato da resposta:
>
> * Propriedade isActive passa para `false`;
> * Status: `204 NO CONTENT`;
>
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido | Usuário que já está desativado - `(IsActive = false)`
>> ## Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "User not found"
> }
>```
> ## Deletando outro usuário sem ser administrador
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "User is not admin"
> }
>```
>---

<br>

---
---

<br>

> # Login - POST `/login`
>> ## Formato da requisição:
>```json
> {
>   "username": "lucas",
>   "password": "1234"
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>```json
> {
>   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTY2NzE0OTIzNiwiZXhwIjoxNjY3MjM1NjM2LCJzdWIiOiI3YTZiNTk0MS04YjdjLTQyZjItYWYyZC1jODAxNjMzYjdhNWYifQ.QYCFK6a9u-3cUkNgZ9yo5NmCBQ3afyutsRqDeO-_b_M"
> }
>```
> ## Usuário ou senha inválidos
>> ## Formato da resposta:
>
> * Status: `403 FORBIDDEN`;
>
>```json
> {
>   "message": "Invalid username or password"
> }
>```
>---

<br>

---
---

<br>

> # Create Client - POST `/clients`
>> ## Formato da requisição:
> 
> * Necessário autenticação por `token`;
> 
>```json
> {
> 	"name": "Felipe Sampaido de Oliveira",
> 	"email": "felipeoliveira@mail.com",
> 	"phone": "24992569845",
> 	"age": 28
> }
>```
>> ## Formato da resposta:
> 
> * Status: `201 CREATED`;
> 
>```json
> {
> 	"name": "Felipe Sampaido de Oliveira",
> 	"email": "felipeoliveira@mail.com",
> 	"phone": "24992569845",
> 	"age": 28,
> 	"user": {
> 		"id": "daca1307-757c-4dd1-abb2-bf9eae266bfc",
> 		"name": "Gabriel",
> 		"username": "gabriel",
> 		"email": "gabriel@mail.com",
> 		"isAdm": false,
> 		"isActive": true,
> 		"createdAt": "2023-02-07T01:49:40.419Z",
> 		"updatedAt": "2023-02-07T01:49:40.419Z"
> 	},
> 	"contacts": [],
> 	"id": "db3534f7-c036-4733-a6bc-717a4862791f",
> 	"createdAt": "2023-02-07T01:51:32.955Z",
> 	"updatedAt": "2023-02-07T01:51:32.955Z"
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
> 
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
>---

<br>

> # List Clients - GET `/clients`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
>
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> [
> 	{
> 		"id": "951ccceb-dfc4-474e-9a8c-313319831277",
> 		"name": "Maria Alice Santos",
> 		"email": "maria.alice@mail.com",
> 		"phone": "22999658598",
> 		"age": 22,
> 		"createdAt": "2023-02-07T01:53:58.535Z",
> 		"updatedAt": "2023-02-07T01:53:58.535Z",
> 		"user": {
> 			"id": "daca1307-757c-4dd1-abb2-bf9eae266bfc",
> 			"name": "Gabriel",
> 			"username": "gabriel",
> 			"email": "gabriel@mail.com",
> 			"isAdm": false,
> 			"isActive": true,
> 			"createdAt": "2023-02-07T01:49:40.419Z",
> 			"updatedAt": "2023-02-07T01:49:40.419Z"
> 		},
> 		"contacts": []
> 	},
> 	{
> 		"id": "db3534f7-c036-4733-a6bc-717a4862791f",
> 		"name": "Felipe Sampaido de Oliveira",
> 		"email": "felipeoliveira@mail.com",
> 		"phone": "24992569845",
> 		"age": 28,
> 		"createdAt": "2023-02-07T01:51:32.955Z",
> 		"updatedAt": "2023-02-07T01:51:32.955Z",
> 		"user": {
> 			"id": "daca1307-757c-4dd1-abb2-bf9eae266bfc",
> 			"name": "Gabriel",
> 			"username": "gabriel",
> 			"email": "gabriel@mail.com",
> 			"isAdm": false,
> 			"isActive": true,
> 			"createdAt": "2023-02-07T01:49:40.419Z",
> 			"updatedAt": "2023-02-07T01:49:40.419Z"
> 		},
> 		"contacts": []
> 	}
> ]
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
> 
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
>---

<br>

> # Retrieve Client - GET `/clients/:client_id`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
> 	"id": "951ccceb-dfc4-474e-9a8c-313319831277",
> 	"name": "Maria Alice Santos",
> 	"email": "maria.alice@mail.com",
> 	"phone": "22999658598",
> 	"age": 22,
> 	"createdAt": "2023-02-07T01:53:58.535Z",
> 	"updatedAt": "2023-02-07T01:53:58.535Z",
> 	"user": {
> 		"id": "daca1307-757c-4dd1-abb2-bf9eae266bfc",
> 		"name": "Gabriel",
> 		"username": "gabriel",
> 		"email": "gabriel@mail.com",
> 		"isAdm": false,
> 		"isActive": true,
> 		"createdAt": "2023-02-07T01:49:40.419Z",
> 		"updatedAt": "2023-02-07T01:49:40.419Z"
> 	},
> 	"contacts": []
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
> 
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>  
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Client not found"
> }
>```
>---

<br/>

> # Update Client - PATCH `/clients/:client_id`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> * Apenas `name`, `email`, `phone` e `age` podem ser alterados;
>
>```json
> {
> 	"name": "Maria Alice Neves",
> 	"email": "contato.alice@mail.com",
> 	"phone": "24999659471",
> 	"age": 21
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
> 	"id": "951ccceb-dfc4-474e-9a8c-313319831277",
> 	"name": "Maria Alice Neves",
> 	"email": "contato.alice@mail.com",
> 	"phone": "24999659471",
> 	"age": 21,
> 	"createdAt": "2023-02-07T01:53:58.535Z",
> 	"updatedAt": "2023-02-07T02:06:09.296Z",
> 	"user": {
> 		"id": "daca1307-757c-4dd1-abb2-bf9eae266bfc",
> 		"name": "Gabriel",
> 		"username": "gabriel",
> 		"email": "gabriel@mail.com",
> 		"isAdm": false,
> 		"isActive": true,
> 		"createdAt": "2023-02-07T01:49:40.419Z",
> 		"updatedAt": "2023-02-07T01:49:40.419Z"
> 	}
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
> 
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>  
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Client not found"
> }
>```
>---

<br>

> # Delete Client - DELETE `/clients/:client_id`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Status: `204 NO CONTENT`;
>
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
> 
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>  
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Client not found"
> }
>```
>---

<br>

---
---

<br>

> # Create Contact - POST `/contacts/:client_id`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>
>```json
> {
> 	"name": "Lucas Almeida Galvão",
> 	"email": "lucasgalvao@mail.com",
> 	"phone": "21993744845"
> }
>```
>> ## Formato da resposta:
>
> * Status: `201 CREATED`;
>
>```json
> {
> 	"name": "Lucas Almeida Galvão",
> 	"email": "lucasgalvao@mail.com",
> 	"phone": "21993744845",
> 	"client": {
> 		"id": "db3534f7-c036-4733-a6bc-717a4862791f",
> 		"name": "Felipe Sampaido de Oliveira",
> 		"email": "felipeoliveira@mail.com",
> 		"phone": "24992569845",
> 		"age": 28,
> 		"createdAt": "2023-02-07T01:51:32.955Z",
> 		"updatedAt": "2023-02-07T01:51:32.955Z"
> 	},
> 	"id": "59bb3a0b-d712-452a-8750-f5c7c7731ace",
> 	"createdAt": "2023-02-07T02:12:01.866Z",
> 	"updatedAt": "2023-02-07T02:12:01.866Z"
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Client not found"
> }
>```
>---

<br>

> # List Contacts - GET `/contacts/:client_id`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>      
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> [
> 	{
> 		"id": "59bb3a0b-d712-452a-8750-f5c7c7731ace",
> 		"name": "Lucas Almeida Galvão",
> 		"email": "lucasgalvao@mail.com",
> 		"phone": "21993744845",
> 		"createdAt": "2023-02-07T02:12:01.866Z",
> 		"updatedAt": "2023-02-07T02:12:01.866Z",
> 		"client": {
> 			"id": "db3534f7-c036-4733-a6bc-717a4862791f",
> 			"name": "Felipe Sampaido de Oliveira",
> 			"email": "felipeoliveira@mail.com",
> 			"phone": "24992569845",
> 			"age": 28,
> 			"createdAt": "2023-02-07T01:51:32.955Z",
> 			"updatedAt": "2023-02-07T01:51:32.955Z"
> 		}
> 	},
> 	{
> 		"id": "551fa11e-b6bf-4171-90e6-5b2fa37c4476",
> 		"name": "Victória Santana Ferreira",
> 		"email": "vic.santana@mail.com",
> 		"phone": "22981497468",
> 		"createdAt": "2023-02-07T02:16:09.376Z",
> 		"updatedAt": "2023-02-07T02:16:09.376Z",
> 		"client": {
> 			"id": "db3534f7-c036-4733-a6bc-717a4862791f",
> 			"name": "Felipe Sampaido de Oliveira",
> 			"email": "felipeoliveira@mail.com",
> 			"phone": "24992569845",
> 			"age": 28,
> 			"createdAt": "2023-02-07T01:51:32.955Z",
> 			"updatedAt": "2023-02-07T01:51:32.955Z"
> 		}
> 	}
> ]
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>
>> ## Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Client not found"
> }
>```
>---

<br>

> # Retrieve Contact - GET `/contacts/client/:contact_id`
>> ## Formato da requisição:
>
> * Necessário autenticação por `token`;
>
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
> 	"id": "59bb3a0b-d712-452a-8750-f5c7c7731ace",
> 	"name": "Lucas Almeida Galvão",
> 	"email": "lucasgalvao@mail.com",
> 	"phone": "21993744845",
> 	"createdAt": "2023-02-07T02:12:01.866Z",
> 	"updatedAt": "2023-02-07T02:12:01.866Z",
> 	"client": {
> 		"id": "db3534f7-c036-4733-a6bc-717a4862791f",
> 		"name": "Felipe Sampaido de Oliveira",
> 		"email": "felipeoliveira@mail.com",
> 		"phone": "24992569845",
> 		"age": 28,
> 		"createdAt": "2023-02-07T01:51:32.955Z",
> 		"updatedAt": "2023-02-07T01:51:32.955Z"
> 	}
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>
> * Status: `404 NOT FOUND`;
>```json
> {
>   "message": "Contact not found"
> }
>```
>---

<br>

> # Update Contact - PATCH `/contacts/:contact_id`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> * Apenas `name`, `email` e `phone` podem ser alterados;
>
>```json
> {
> 	"name": "Lucas Almeida",
> 	"email": "lucas.almeida@mail.com",
> 	"phone": "21992289564"
> }
>```
>> ## Formato da resposta:
>
> * Status: `200 OK`;
>
>```json
> {
> 	"id": "59bb3a0b-d712-452a-8750-f5c7c7731ace",
> 	"name": "Lucas Almeida",
> 	"email": "lucas.almeida@mail.com",
> 	"phone": "21992289564",
> 	"createdAt": "2023-02-07T02:12:01.866Z",
> 	"updatedAt": "2023-02-07T02:24:31.226Z",
> 	"client": {
> 		"id": "db3534f7-c036-4733-a6bc-717a4862791f",
> 		"name": "Felipe Sampaido de Oliveira",
> 		"email": "felipeoliveira@mail.com",
> 		"phone": "24992569845",
> 		"age": 28,
> 		"createdAt": "2023-02-07T01:51:32.955Z",
> 		"updatedAt": "2023-02-07T01:51:32.955Z"
> 	}
> }
>```
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
> 
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>  
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Contact not found"
> }
>```
>---

<br>

> # Delete Contact - DELETE `/contacts/:contact_id`
>> ## Formato da resposta:
>
> * Necessário autenticação por `token`;
> 
>> ## Formato da resposta:
>
> * Status: `204 NO CONTENT`;
>
> ## Sem token / token inválido
>> ## Formato da resposta:
>
> * Status: `401 UNAUTHORIZED`;
> 
>```json
> {
>   "message": "Missing authorization headers"
> }
>```
> ## Id inválido
>> ## Formato da resposta:
>  
> * Status: `404 NOT FOUND`;
>
>```json
> {
>   "message": "Contact not found"
> }
>```
>---
