import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";

const Produto = () => {
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async e => {
        e.preventDefault();
        if (!nome || !valor){
            setError("Preencha todos os dados para cadastrar");
        } else {
            try {
                await api.post("/produtos", {nome, valor});
                navigate("/produtos");
            } catch (err){
                console.log(err);
                setError("Ocorreu um erro ao cadastrar produto.")
            }
        }

    }


return (
    <div>
         <Navbar/>
    <Container>
        <Form onSubmit={handleSignUp}>
            {error && <p>{error}</p>}
            <img src={Logo} alt="logo_senac"/>
            <input
                type="text"
                placeholder="Nome"
                onChange={e => setNome(e.target.value)}
            />    
            <input 
                type="text"
                placeholder="Valor"
                onChange={e => setValor(e.target.value)}
            />
            <button type="submit">Cadastro de Produtos</button>
        </Form>
    </Container>
    </div>
)
}

export default Produto;