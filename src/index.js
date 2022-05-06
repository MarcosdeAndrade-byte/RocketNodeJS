const express = require("express");

const app = express();

//Localhost: 3333

app.get("/",(request,response)=> {
    return response.json({mensagem: "Hello"});
});

app.listen(3333);