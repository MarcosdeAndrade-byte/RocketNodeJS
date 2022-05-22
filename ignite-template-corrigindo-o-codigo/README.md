# <img align="center" alt="marcos-Js" height="40px" width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"/> Corrigindo o código 
### :point_right: Objetivo: 

Nesse desafio, temos uma aplicação Node.js que está em processo de desenvolvimento e precisa ser corrigido 

### :wrench: Instalação: 

1. Para utilizar o servidor clone o projeto ou baixe o .Zip
2. Descompacte o arquivo e adicione na sua IDE
3. Para adicionar os modulos no projeto execute o comando: yarn init
4. Para rodar o servidor digite yarn dev

### GET repositories 
```
localhost:3000/repositories 
```
Método criado para retornar todos os repositórios,não é necessário utilizar parâmetros ou qualquer outra coisa...

### POST repositories  
```
localhost:3000/repositories
```
Para criar um repositório,temos que adicionar através do body: Titulo,Url e Tecnologias. Como requisito para criar o
repositório, a url deve conter uma referência ao título do repositório e as tecnologias devem estar dentro de um Array.

#### Body raw _(json) json_
```
"title": "umbriel",

"url": "https://github.com/Rocketseat/umbriel",

"techs": [ "React", 
           "ReactNative", 
           "TypeScript", 
           "ContextApi"]
}
```
Perceba que o título do repositório está sendo referenciado na Url! Cuidado com palavras maiúsculas e minúsculas, elas são \n
diferentes! Os elementos do campo "techs": devem estar dentro de um Array!

Exemplo de como não criar um repositório:
```
{

"title": "umbriel",

"url": "https://github.com/Rocketseat/Umbriel",

"techs": "React", 
         "ReactNative", 
         "TypeScript", 
         "ContextApi"
}
```

### PUT repositories 
```
localhost:3000/repositories/6b0fc991-59c1-4e0b-9b92-cda2b5d45356?id=
localhost:3000/repositories/6b0fc991-59c1-4e0b-9b92-cda2b5d45356?id=8e0c5107-616f-440c-ace4-c9c30e0935e3
```
Para alterar um repositório basta adicionar o Id do repositório no campo Query Params e no Body o campo que gostaria de mudar

#### Query Params
<table>
  <td>id</td>  <td>8e0c5107-616f-440c-ace4-c9c30e0935e3</td>
</table>

### Body raw _(json) json_
```
{
  "title": "Alterar Titulo"
}
```

### DEL repositories 
```
localhost:3000/repositories/id
localhost:3000/repositories/8e0c5107-616f-440c-ace4-c9c30e0935e3
```
Para deletar um repositório basta adicionar o Id do usuário no final da url

### POST repositories 
```
localhost:3000/repositories/id/like
localhost:3000/repositories/cacbcb00-f137-4cf0-bde2-800c1f8c675c/like
```
Para adicionar um like no repositório basta adicionar o Id do repositório entre /repositories/ e /like

## :handshake: Contribuições
* Agradeço aos meus pais por apoiarem minha carreira como desenvolvedor ❤.
* Agradeço a [Dataside](https://www.dataside.com.br/) e [Sidelab](https://www.sidelab.com.br/) por apoiarem minha carreira como desenvolvedor 💚💙. 

## :open_book: Licenças
[MIT](https://choosealicense.com/licenses/mit/)
