const sql = require("./db.js");

const Usuario = function (usuario) {
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.tipo = usuario.tipo;
}

Usuario.create = (usuario, result) => {
    sql.query("INSERT INTO usuarios SET ?", usuario, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, "Usuario criado com sucesso");
        }
    })
}

Usuario.findByEmail = (idUSuario, result) => {
    sql.query("SLECT * FROM usurios WHERE email = ?", emailUsuario, (err, res) => {
        if (err) {
            result(err, null);
        } else if (res.length) {
            result(null, res[0])
        }else{
            result({type: "not_found"}, null);
        }
    })
}

Usuario.findById = (idUSuario, result) => {
    sql.query("SLECT * FROM usurios WHERE idusuario = ?", idUSuario, (err, res) => {
        if (err) {
            result(err, null);
        } else if (res.length) {
            result(null, res[0])
        }else{
            result({type: "not_found"}, null);
        }
    })
}

module.exports = Usuario;