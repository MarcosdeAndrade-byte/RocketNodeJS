const express=require("express");

const{v4: uuidv4}=require("uuid");

const app=express();

app.use(express.json());

const customers=[];

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

  console.log(customers);
  return response.status(201).send();
});

app.get("/statement/:cpf", (request,response) => {
    const {cpf} = request.params;
    const customer = customers.find((customer) => customer.cpf === cpf);
    return response.json(customer.statement);
});

app.listen(3000);