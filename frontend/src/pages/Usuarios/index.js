import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import api from '../../services/api';
import { UsuarioContainer } from "./style";

const Usuarios = () =>{
    const[usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');

    useEffect(() =>{
        async function getData(){
            const response = await api.get('/usuarios');
            setUsuarios(response.data);
        }
        getData();
    }, []);

    const handleDeleteAsk = (e) =>{
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.seAttribute('display', 'block');
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) =>{
        e.persist();
        let response = '';
        try{
            response = await api.delete(`/usuarios/${id}`);
            const novosUsuarios = [...usuarios];
            setUsuarios(novosUsuarios);
        }catch(err){
            setError('Houve um problema ao excluir os dados.' + response);
        }
    };
    return(
        <div>
            <h1>Listagem de Usuários</h1>
            {error && <p>{error}</p>}
            <UsuarioContainer>
                <div>
                    <span>Id</span>
                    <span>Email</span>
                    <span>Tipo</span>
                    <span>Editar</span>
                    <span>Excluir</span>
                </div>
                {usuarios.map((usuario, index) =>(
                    <div key={String(usuario.idusuarios)}>
                    <span>{usuario.idusuarios}</span>
                    <span>{usuario.email}</span>
                    <span>{usuario.tipo}</span>
                    <Link to={'/usuario/${usuario.idusuarios}'}>
                        <FaEdit size={16} />
                    </Link>
                    <Link onClick={handleDeleteAsk} to={'/usuario/${usuario.idusuarios}'}>
                        <FaWindowClose size={16} />
                    </Link>
                    <FaExclamation
                    size={16}
                    display="none"
                    cursor="pointer"
                    onClick={(e) => handleDelete(e, usuario.idusuarios, index)}
                  />
                    </div>
                ))}
            </UsuarioContainer>
        </div>
    );
};

export default Usuarios;