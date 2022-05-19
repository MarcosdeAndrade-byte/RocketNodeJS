const express = require("express");

const { v4: uuid, validate: uuidValidate } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

function creationChecker(request, response ,next){
  const { title, url, techs } = request.body

  if(!Array.isArray(techs) || url.indexOf(title) == -1){
    return response.status(404).send()
  }

  return next()
}

//Pegar todos os repositórios 
app.get("/repositories", (request, response) => {
  return response.status(201).json(repositories);
});

//Criar um repositório
app.post("/repositories",creationChecker,(request, response) => {
  const { title, url, techs } = request.body;

  repositories.push({
    id: uuid(),
    title : title,
    url : url,
    techs : techs,
    likes: 0
  });

  return response.status(201).json(repositories).send();
});

app.put("/repositories/:id", (request, response) => {
  const id  = request.query['id'];
  const {title,url,techs} = request.body;


  //Lógica para encontrar o elemento do repositório certo
  const repo = repositories.find((repo,index) => repo.id === id);

  if(repo == undefined){
    return response.status(404).json("Repositório não encontrado").end()
  }else if(title != undefined){
    repo.title = title;
  }else if(url != undefined){
    repo.url = url;
  }else if(techs != undefined){
    repo.techs = techs;
  }

  return response.status(201).json(repositories).end();
});

app.delete("/repositories/:id", (request, response) => {
  const { id }  = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);


  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;