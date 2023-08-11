const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) =>{
    res.header("Access-Control-Alow-Origin", "*");
    res.header("Acess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    app.use(cors());
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.json({
        message: "Bem vindo à API MVC do SENAC"
        })
    });


require("./app/routes/produto.routes.js")(app);
require("./app/routes/pedido.routes.js")(app);
require("./app/routes/produto_pedido.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);


app.listen(3001, ()=> {
    console.log("Servidor rodando na porta 3001");
});