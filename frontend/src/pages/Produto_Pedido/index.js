import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const { id } = useParams();

    useEffect(() => {
        async function getSelect(){
            try{
                 //Carrega combobox produtos
            let response = await api.get('/produtos');
            setTableProdutos(response.data);

            //Carrega combobox pedidos
            response = await api.get('/pedidos');
            setTablePedidos(response.data);
            }catch(err){
                setError("Houve um erro ao encontar pedido e produto")
            }
        }
        getSelect();
        if (!id) return;

        async function getData() {
            try {
                const { data } = await api.get(`/produtos_pedidos/${id}`);
                setIdProduto(data.produtos_idprodutos);
                setIdPedido(data.pedidos_idpedidos);
                setObservacao(data.observacao);
            } catch (err) {
                setError("Houve um problema ao carregar os dados do produto: " + err);
            }
            //Carrega combobox produtos
            let response = await api.get('/produtos');
            setTableProdutos(response.data);

            //Carrega combobox pedidos
            response = await api.get('/pedidos');
            setTablePedidos(response.data);
        }
        getData();
    }, []);

    const handleProduto = async e => {
        e.preventDefault();
        if (!produtos_idprodutos || !pedidos_idpedidos || !observacao) {
            setError("Preencha todos os dados para cadastrar");
        } else {
            try {
                await api.post("/produtos_pedidos", { produtos_idprodutos, pedidos_idpedidos, observacao });
                navigate("/produtos_pedidos");
            } catch (err) {
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
                    <img src={Logo} alt="logo_senac" />
                    <select onChange={e => setIdProduto(e.target.value)} value={produtos_idprodutos}>
                        <option value="">Selecione um Produto</option>
                        {produtos.map(produto =>(
                            <option key={produtos.idprodutoss} value={produtos.idprodutoss}>
                                {produto.idprodutos}
                            </option>
                        ))}
                    </select>
                    <select onChange={e => setIdPedido(e.target.value)} value={pedidos_idpedidos}>
                        <option value="">Selecione um Pedido</option>
                        {pedidos.map(pedido =>(
                            <option key={pedido.idpedidos} value={pedido.idpedidos}>
                                {pedido.idpedidos}
                            </option>
                        ))}
                    </select>
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