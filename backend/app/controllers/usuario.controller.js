const bcrypt = require("bcryptjs");
const usuarioModel = require("../models/usuarios.model.js");
const config = require("../configs/auth.config.js");
const jwt = require("jsonwebtoken");

exports.signUp = (re, res)=>{
    if(!req.body.email || !req.body.senha || !req.body.tipo){
        res.status(400).send({
            message: "E-mail, senha ou tipo não enviados."
        })
    }else{
        const usuario = new usuarioModel({
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, 8),
            tipo: req.body.tipo
        })

        usuarioModel.create(usuario, (err, data)=>{
            if(err){
                res.status(500).send({
                    message: err.message || "Ocorreu um erro."
                })
            }else{
                res.send(data);
            }
        })
    }
}

exports.signIn = (req, res)=>{
    usuarioModel.findByEmail(req.body.email, (err, data)=>{
        if(err){
            if(err == "not_found"){
                re.status(404).send({
                    message:"Não foi encontrado usurio com o email digitado."
                })
            }else{
                res.status(500).send({
                    message: "Ocorreu um erro ao buscar email do usuario no sistema."
                })
            }
        }else{
            let validPassword = bcrypt.compareSync(req.body.senha, data.senha);
            if(!validPassword){
                res.status(401).send({
                    accessToken: null,
                    message: "Senha inválida!"
                })
            }else{
                let token = jwt.sign({id: data.idusuarios}, config.secret, {expiresIn: 86400}); //24H
                res.status(200).send({
                    accessToken: token,
                    id: data.idusuarios,
                    email: data.email,
                    tipo: data.tipo
                })
            }
        }
    })
}