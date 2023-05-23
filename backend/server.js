const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.json({
        message: "Bem vindo á API MVC do Senac"
    })
});

require("./app/routes/produto.routes.js")(app);

app.listen(3000, ()=>{
    console.log("servidor rodando na porta 3000");
})