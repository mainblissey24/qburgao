module.exports = app => {
    const produtoController = require("../controllers/produto.controller");
    const authJwt = require("../middlewares/auth_jwt_middleware.js");
    app.post("/produtos", [authJwt.verifyToken, authJwt.isAdmin], produtoController.create);
    app.get("/produtos", produtoController.findAll);
    app.get("/produtos/:produtoId", produtoController.findById);
    app.put("/produtos/:produtoId", [authJwt.verifyToken], produtoController.update);
    app.delete("/produtos/:produtoId", [authJwt.verifyToken], produtoController.delete);
    app.delete("/produtos", [authJwt.verifyToken], produtoController.deleteAll);
}