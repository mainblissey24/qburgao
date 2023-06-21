module.exports = app => {
    const produto_pedidoController = require("../controllers/produtos_pedidos.controller");
    app.post("/produtos_pedidos", produto_pedidoController.create);
    app.get("/produtos_pedidos", produto_pedidoController.findAll);
    app.get("/produtos_pedidos/:produto_pedidoId", produto_pedidoController.findById);
    app.put("/produtos_pedidos/:produto_pedidoId", produto_pedidoController.update);
    app.delete("/produtos_pedidos/:produto_pedidoId", produto_pedidoController.delete);
    app.delete("/produtos_pedidos", produto_pedidoController.deleteAll);
}