const { response, request } = require("express");
const express = require("express");

const app = express();

//Localhost: 3333

app.get("/",(request,response)=> {
    return response.json(["Curso 1","Curso 2","Curso 3"]);
});

app.post("/courses",(request,response)=> {
    return response.json(["Curso 1","Curso 2","Curso 3"]);
});

app.put("/courses/:id",(request,response)=> {
    return response.json(["Curso 6","Curso 2","Curso 3"]);
});

app.patch("/courses/:id",(request,response)=>{
    return response.json(["Curso 1","Curso 7","Curso 3"]);
});

app.delete("/course/:id",(response,request)=>{
    return response.json(["Curso 1","Curso 7","Curso 3"]);
});

app.listen(3333);