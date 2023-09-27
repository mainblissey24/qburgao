import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Produto_Pedido = () => {
    const [produtos_idprodutos, setIdProduto] = useState("");
    const [pedidos_idpedidos, setIdPedido] = useState("");
    const [observacao, setObservacao] = useState("");

    const [produtos, setTableProdutos] = useState([]);
    const [pedidos, setTablePedidos] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            //Carrega combobox produtos
            let response = await api.get('/produtos');
            setTableProdutos(response.data);
                        //Carrega combobox pedidos
                        response = await api.get('/pedidos');
                        setTablePedidos(response.data);
                        console.log(pedidos);
        }
        getData();
    }, []);

    const handleProduto = async e => {
        e.preventDefault();
        if (!produtos_idprodutos || !pedidos_idpedidos || !observacao){
            setError("Preencha todos os dados para cadastrar");
        } else {
            try {
                await api.post("/produtos_pedidos", {produtos_idprodutos, pedidos_idpedidos, observacao});
                navigate("/produtos_pedidos");
            } catch (err){
                console.log(err);
                setError("Ocorreu um erro ao cadastrar produtos_pedidos.")
            }
        }
    }

return (
    <div>
        <Navbar />
        <Container>
            <Form onSubmit={handleProduto}>
                {error && <p>{error}</p>}
                <img src={Logo} alt="logo_senac"/>
                <input
                    type="number"
                    placeholder="ID Produto"
                    onChange={e => setIdProduto(e.target.value)}
                />  
                <input
                    type="number"
                    placeholder="ID Pedido"
                    onChange={e => setIdPedido(e.target.value)}
                />   
                <input 
                    type="text"
                    placeholder="Observação"
                    onChange={e => setObservacao(e.target.value)}
                />
                <button type="submit">Cadastro de Produtos_Pedidos</button>
            </Form>
        </Container>
    </div>    
)
}

export default Produto_Pedido;