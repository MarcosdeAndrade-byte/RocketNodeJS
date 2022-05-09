const express=require("express");

const{v4: uuidv4}=require("uuid");

const app=express();

app.use(express.json());

const customers=[];

// app.post('/account',(request,response)=>{
//     //Para inserir dados através do Body (Utilização de desconstrução)
//     const {cpf,name} = request.body;

//     const id = id();

//     customers.push({
//         cpf,
//         name,
//         id,
//         statement: []
//     });
//     return response.status(201).send();
// });

app.post("/account",(request, response)=>{
  const {cpf, name} = request.body; 
  const id = uuidv4();
  customers.push({
    cpf,
    name,
    id,
    statement: []
  });
  return response.status(201).send();
});

app.get('/return',(request,response)=>{
    return response.send("<h1>Olá mundo<h1>");
});

app.listen(3000);


PrimeiroProjetoComNodeJs/package.json
PrimeiroProjetoComNodeJs/src/index.js
PrimeiroProjetoComNodeJs/yarn.lock