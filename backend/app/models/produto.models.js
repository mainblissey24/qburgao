const sql = require("./db.js");

const ProdutoModel = function(produto){
    this.nome = produto.nome;
    this.valor = produto.valor;

}

ProdutoModel.create = (produto, result) => {
    sql.query("insert produtos set ?", produto, (err, res) =>{
        if (err){
            console.log("Erro: ", err);
            result(err, null);
            return;
        }
        console.log("Produto criado: ", {idprodutos: res.insertId, ...produto});
        result(null, {idprodutos: res.insertId, ...produto});
    })


};
ProdutoModel.findById = (produtoId, result) => {
    sql.query("Select * from produtos where idprodutos = "+produtoId, (err, res) =>{
        if(err){
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if(res.length){
            console.log("Produto Encontrado", res[0]);
            result(null,res[0]);
        }else {
            result({type: "not_found"}, null);
            console.log("Produto não encontrado");
        }
    })
};
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
ProdutoModel.updateById = (produtoId, produto,result) => {
    sql.query("UPDATE produtos SET nome = ?, valor = ? WHERE idprodutos = ?",
    [produto.nome, produto.valor, produtoId], (err, res) =>{
        if (err){
            console.log("erro: ", err);
            result(null, err);
        }else if(res.affectedRows == 0){
            result({type: "not_found"}, null);
        }else {
            console.log("Produto atualizado: ",{idprodutos: produtoId, ...produto});
            result(null, {idprodutos: produtoId, ...produto});
        }
            
        
    })
};
ProdutoModel.remove = (produtoId, result) => {
    sql.query("DELETE FROM produtos WHERE idprodutos = ?", produtoId, (err, res) => {
        if(err){
            console.log("erro: ", err);
            result(err, null);
        }else if (res.affectedRows == 0){
            result ({ type: "not_found"}, null);
        }else {
            result(null, res);
        }
    });
};

ProdutoModel.removeAll = (result) => {
    sql.query("DELETE FROM produtos", produtoId, (err, res) => {
        if(err){
            console.log("erro: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports=ProdutoModel;