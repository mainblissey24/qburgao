import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { Container } from './style';

const Produtos_Pedidos = () => {
    const [produtos_pedidos, setProdutos_Pedidos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getData(){
            const response = await api.get('/produtos_pedidos');
            setProdutos_Pedidos(response.data);
        }
        getData();
    }, []);

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) => {
        e.persist();
        let response = '';
        try{
            response = await api.delete(`/produtos_pedidos/${id}`);
            const novosProdutos_Pedidos = [...produtos_pedidos];
            novosProdutos_Pedidos.splice(index, 1);
            setProdutos_Pedidos(novosProdutos_Pedidos);
        }catch(err){
            setError('Houve um problema ao excluir os dados: '+response);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Listagem de Produtos_Pedidos (Status)</h1>
            {error && <p>{error}</p>}
            <Container>
                <div>
                    <span>ID</span>
                    <span>ID Produtos</span>
                    <span>ID Pedidos</span>
                    <span>Observação</span>
                    <span>Editar</span>
                    <span>Excluir</span>
                </div>
                {produtos_pedidos.map((produto_pedido, index) => (
                    <div key={String(produto_pedido.idprodutos_pedidos)}>
                        <span>{produto_pedido.produtos_idprodutos}</span>
                        <span>{produto_pedido.pedidos_idpedidos}</span>
                        <span>{produto_pedido.observacao}</span>
                        <Link to={`/produtos_pedidos/${produto_pedido.idprodutos_pedidos}`}>
                            <FaEdit size={16} />
                        </Link>
                        <Link onClick={handleDeleteAsk} to={`/produtos_pedidos/${produto_pedido.idprodutos_pedidos}`}>
                            <FaWindowClose size={16} />
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="pointer"
                            onClick={(e) => handleDelete(e, produto_pedido.idprodutos_pedidos, index)}
                        />    
                    </div>
                ))}
            </Container>
        </div>
    );
};

export default Produtos_Pedidos;