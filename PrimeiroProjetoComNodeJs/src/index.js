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

//Função para calcular o crédito e o débito feito pelo usuário
function getBalance(statement){
      //Se o tipo de operação for igual a crédito acumulamos os valores
      const balance = statement.reduce((acumulador,operation) => {
      if(operation.type === 'credit'){
          return acumulador + operation.amount;
      //Se não,retiramos dinheiro da conta
      }else{
          return acumulador - operation.amount;
      }
   },0);

   return balance;
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

app.post("/withdraw",verifyIfExistsAccountCPF,(request, response) => {
    //Pegamos a quantia pelo body
    const { amount } = request.body;
    //Acessamos o valor disponível na conta 
    const { customer } = request;
    //fazemos o cálculo de crédito ou débito
    const balance = getBalance(customer.statement);

    //Se existir divergência nos valores retornamos um erro
    if(balance < amount){
      return response.status(400).json({error: "Insufficient funds!"});
    }

    //registramos os dados no customers
    const statementOperation = {
      amount,
      created_at: new Date(),
      type: "debit"
    };

    customer.statement.push(statementOperation);
    //retornamos um status code de 201
    return response.status(201).send();
});

app.get("/statement/date",verifyIfExistsAccountCPF,(request,response) => {
  //Conseguimos ter acesso ao CPF pq o declaramos no Middleware
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");
  const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString());
  return response.json(statement);
});

app.put("/account",verifyIfExistsAccountCPF,(request,response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;
  return response.status(201).send();
});

app.get("/account",verifyIfExistsAccountCPF,(request,response) => {
  const { customer } = request;

  return response.json(customer);
});

app.delete("/account",verifyIfExistsAccountCPF,(request,response)=>{
  const { customer } = request;

  // Splice(Começa em,termina em)
  customers.splice(customer,1);
  return response.status(200).json(customers);
});

app.listen(3000);