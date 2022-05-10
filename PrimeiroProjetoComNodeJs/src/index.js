const { request, response, json } = require("express");
const express = require("express");

const{v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

// Middleware para verificação do cpf
function verifyIfExistsAccountCPF(request, response, next){
    const {cpf} = request.headers;
    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer){
        return response.status(400).json({ error: "Customer not found" });
    }
   
    request.customer = customer;
    return next();
}

app.post("/account", (request, response)=>{
  const {cpf, name} = request.body; 

  //Função para verificar se não existe um cpf duplicado (retorna um boolean) --> some(Se algum)
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  //Se o CPF já existir retornamos um erro
  if(customerAlreadyExists){
    return response.status(400).json({error: "Customer already Exists!"});
  }

  //Estamos utilizando o push para inserir os dados vindos do body no objeto 
  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  //console.log(customers); <-- Retorna o usuário que foi criado
  return response.status(201).send();
});

/*app.use(verifyIfExistsAccountCPF); outra forma de usar o Middleware é 
quando queremos que todas as rotas sejam verificadas
*/

app.get("/statement",verifyIfExistsAccountCPF,(request,response) => {
    //Conseguimos ter acesso ao CPF pq o declaramos no Middleware
    const { customer } = request;
    //console.log(customer); <-- Retorna o deposito e conta juntos
    //console.log(customer.statement); <-- Retornar apenas o depósito
    return response.json(customer.statement);
});

app.post("/deposit",verifyIfExistsAccountCPF,(request,response) => {
    const { description, amount } = request.body;
    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);
    //console.log(customer); <-- Verificar se o depósito foi feito
    return response.status(201).send();
});

app.listen(3000);