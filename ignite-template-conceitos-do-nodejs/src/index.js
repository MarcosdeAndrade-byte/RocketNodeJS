const express = require('express');
const cors = require('cors');

 const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

 const users = [];

//middleware para verificar se o usuário existe
function checksExistsUserAccount(request, response, next) {
   //recebemos o header 
   const { username } = request.headers;

   //procuramos o usuário no array (boolean) 
   const ExistsUser = users.find((ExistsUser) => ExistsUser.username === username);
   
   if(!ExistsUser){
      return response.status(400).json({error: "Usuário não encontrado" });
   }

   // https://programandosolucoes.dev.br/2021/04/06/req-e-res-express/#Req_request
   request.ExistsUser = ExistsUser;

   return next();
}

//middleware para impedir login de um mesmo usuário duas vezes
function checksExistsUserName(request, response, next) {
  //recebemos o username
  const { username } = request.body;

  //procuramos o usuário no array (boolean) 
  const ExistsUser = users.find((ExistsUser) => ExistsUser.username === username);
  
  if(ExistsUser){
    return response.status(400).json({error: "Já possui um usuário com esse nome" });
  }

  return next();
}

//Método para criar usuário
app.post('/users',checksExistsUserName,(request, response) => {
   const {name,username} = request.body;

    users.push({
     id : uuidv4(),
     name,
     username,
     todos: []
   });

   return response.status(201).json(users).send();
});

// Método para pegar todas as tarefas de um usuário
app.get('/todos', checksExistsUserAccount, (request, response) => {
   const { todos } = request.ExistsUser;
   return response.status(201).json(todos).send();
});

//Método para criar tarefa 
app.post('/todos', checksExistsUserAccount, (request, response) => {
  const user   = request.ExistsUser;
  const { title,deadline } = request.body;
 
  user.todos.push({
      id: uuidv4(),
      title: title,
      done: false,
      deadline: new Date(deadline),
      created_at: new Date
  });

  return response.status(201).json(user.todos).send();
});

// Método para atualizar title e deadline
app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { todos } = request.ExistsUser;
  const { title,deadline } = request.body;

  //Seleção da tarefa por Id 
  const todo_id = todos.find((tarefas) => tarefas.id === id);

  if(todo_id == undefined){
    return response.status(400).json({error : "Você não pode atualizar uma tarefa não existente"}).send();
  }

  //Atualização dos campos title e deadline
  todo_id.title = title
  todo_id.deadline = deadline

  return response.status(201).json(todo_id).send();
});

//Método para alterar status da tarefa
app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { todos } = request.ExistsUser;

  //Seleção da tarefa por Id
  const todo_id = todos.find((tarefas) => tarefas.id === id);

  if(todo_id == undefined){
    return response.status(400).json({error : "Você não pode atualizar uma tarefa não existente"}).send();
  }

  //Atualização dos campos title e deadline
  todo_id.done = "true";

  return response.status(201).json(todo_id).send();
});

//Método para deletar tarefa
app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { todos } = request.ExistsUser;

  //Função para achar a posição da tarefa no Array
  const todo_id = todos.findIndex((tarefas) => tarefas.id === id);

  if(todo_id == -1){
    return response.status(400).json({error : "Você não pode deletar um usuário não existente"}).send();
  }

  todos.splice(todo_id,1);

  return response.status(201).send();
});

module.exports = app;