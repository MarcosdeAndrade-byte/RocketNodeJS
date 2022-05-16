const express = require('express');
const cors = require('cors');

 const { v4: uuidv4,validate: uuidValidate} = require('uuid');
const { query } = require('express');

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

function checksCreateTodosUserAvailability(request, response, next) {
  const  user  = request.ExistsUser;

  if(user.pro != "true" && user.todos.length > 9){
    return response.status(403).json("Assine o plano PRO para anotar mais tarefas!");
  }

  return next();
}

function checksTodoExists(request, response, next){
  const user_id = request.query["id"];
  const { username } = request.headers;
  const { todos } = request.ExistsUser;

  try{
     const userVerification = users.find(find => find.username === username);
     const { id } = todos.find((find) => find.id === user_id);
     uuidValidate(id);
  }catch(e){
    console.log("Erro encontrado: ",e.message);
    return response.status(404).json("Erro encontrado,consultar log do sistema").send()
  }

  return next();
}

function findUserById(request, response, next){
  const query_users_id = request.query["users_id"];
  const ExistsUser = users.find((ExistsUser) => ExistsUser.id === query_users_id);

  if(!ExistsUser){
    return response.status(404).json({error: "Usuário não encontrado" });
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
     pro : "false",
     todos: []
   });

   return response.status(201).json(users).send();
});

// Método para pegar todas as tarefas de um usuário
app.get('/todos',checksExistsUserAccount,checksTodoExists,findUserById,(request, response) => {
   const { todos } = request.ExistsUser;
   return response.status(201).json(todos).send();
});

//Método para criar tarefa 
app.post('/todos', checksExistsUserAccount,checksCreateTodosUserAvailability,(request, response) => {
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