# <img align="center" alt="marcos-Js" height="40px" width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"/> Ignite Template Conceitos Do Nodejs
### :handshake: Objetivo:
Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no Node.js!Essa será uma aplicação para gerenciar \
tarefas (em inglês *todos*). Será permitida a criação de um usuário com `name` e `username`, bem como fazer o CRUD de *todos*: 

- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*;

## :heavy_check_mark: POST Criar usuário
```
localhost:3333/users
```
Método para adicionar um *usuário*. Através do Body inserimos o *name* e *username*

Bodyraw (json) json
```
{
  "name": "Marcos",
  "username": "Junior"
}
```
## :heavy_check_mark: POST Adicionar Tarefa
```
localhost:3333/todos
```
Método para adicionar tarefa! É necessário inserir *title* e *deadline* através do Body. Além disso,temos que passar o *username* através do Query Params.

Request Headers
```
username
Junior
Bodyraw (json)
json
{
  "title": "Fazer Desafio 2",
  "deadline": "2022/05/15"
}
```
## :heavy_check_mark: PATCH Status da Tarefa
```
localhost:3333/todos/ab73dcc7-e868-48b8-aef7-bb9a7bfb143e/done
```
Método para mudar status da tarefa como feito. Para mudar o status da tarefa basta adicionar o *Id* entre todos e done

Request Headers
<table>
  <td>username</td>  <td>Junior</td>
</table>

## :heavy_check_mark: PATCH Ativar Plano Pro
```
localhost:3333/ChangeForPro/ffd1f3c9-2fea-4827-8306-23bfa9e4b32b/pro
```
Método para ativar plano pro! Colocar o *username* no Request Headers e dicionar o *Id* entre ChangeForPro/pro.

Request Headers
<table>
  <td>username</td>  <td>Junior</td>
</table>

## :heavy_check_mark: GET Acessar Tarefas Do Usuário
```
localhost:3333/todos?id=e0035416-80ca-4c94-8910-bac3a75140cc
```
Método para pegar todas as tarefas do usuário! Adicionar o *Id* do usuário no Query Params e *username* no Request Headers.

Request Headers
<table>
  <td>username</td>  <td>Junior</td>
</table>

Query Params
<table>
  <td>id</td>  <td>e0035416-80ca-4c94-8910-bac3a75140cc</td>
</table>

## :heavy_check_mark: PUT Alterar Title e Deadline Da Tarefa
```
localhost:3333/todos/ab73dcc7-e868-48b8-aef7-bb9a7bfb143e
```
Método para alterar Title e Deadline da tarefa. Adicionar *username* no Request Headers e *Id* no Query Params.

Request Headers
```
<table>
  <td>username</td>  <td>Junior</td>
</table>
Bodyraw (json) json
```
```
{
  "title": "Fazer Desafio Ignite",
  "deadline": "2022/05/10"
}
```
## :heavy_check_mark: DEL Deletar Tarefa
```
localhost:3333/todos/
```
Método para Deletar tarefa! Adicionar *id* no final da URL e passar o *username* pelo Request Headers.

Request Headers
<table>
  <td>username</td>  <td>Junior</td>
</table>

### :handshake: Contribuições: 
* Agradeço aos meus pais por apoiarem minha carreira como desenvolvedor ❤.
* Agradeço a [Dataside](https://www.dataside.com.br/) e [Sidelab](https://www.sidelab.com.br/) por apoiarem minha carreira como desenvolvedor 💚💙. 

## :open_book: Licenças: 
[MIT](https://choosealicense.com/licenses/mit/)
