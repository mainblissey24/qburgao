const sql = require("./db.js");
//Construtor
const ProdutoModel = function(produto){
    this.nome = produto.nome;
    this.valor= produto.valor;
}
//Cria novo produto no banco
ProdutoModel.create = (produto, result) => {};
//Seleciona produto por ID
ProdutoModel.findById = (produtoId, result) => {
    sql.query("Select * from produtos where idprodutos = "+produtoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Produto Encontrado", res[0]);
            result(null,res[0]);
        } else {
            result({type: "not_found"}, null);
            console.log("Produto não encontrado");
        }
    })
};


//Seleciona todos os produtos
ProdutoModel.getAll = result => {
    sql.query("SELECT * FROM produtos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("produto: ", res);
        result(null, res);
    })
};
//Atualizar produto por id
ProdutoModel.updateById = (produtoId, produto, result) => {};
//Remover produto por id
ProdutoModel.remove = (produtoId, result) => {};
//Remover todos os produtos
ProdutoModel.removeAll = (result) => {};

module.exports = ProdutoModel;