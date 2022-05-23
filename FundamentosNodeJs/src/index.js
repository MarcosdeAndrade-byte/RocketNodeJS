const { response, request } = require("express");
const express = require("express");

const app = express();


app.use(express.json());

//Localhost: 3333

app.get("/courses",(request,response)=> {
    const query = request.query;
    return response.json(["Curso 1","Curso 2","Curso 3"]);
});

app.post("/courses",(request,response)=> {
    const body = request.body;
     return response.json(["Curso 1","Curso 2","Curso 3"]);
});

app.put("/courses/:id",(request,response)=> {
    return response.json(["Curso 6","Curso 2","Curso 3"]);
});

app.patch("/courses/:id",(request,response)=> {
    return response.json(["Curso 1","Curso 7","Curso 3"]);
});

app.delete("/courses/:id",(request,response)=> {
    return response.json(["Curso 1","Curso 7","Curso 3"]);
});

app.listen(3333);