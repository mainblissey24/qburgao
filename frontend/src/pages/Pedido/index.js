import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Logo from "../../assets/senac.png";

const Pedidos = () => {
    const [hora, setHora] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async e => {
        e.preventDefault();
        if (!status || !hora){
            setError("Preencha todos os dados para cadastrar");
        } else {
            try {
                await api.post("/pedidos", {hora, status});
                navigate("/pedidos");
            } catch (err){
                console.log(err);
                setError("Ocorreu um erro ao cadastrar produto.")
            }
        }

    }


return (
    <div>
        <Navbar />
        <Container>
            <Form onSubmit={handleSignUp}>
                {error && <p>{error}</p>}
                <img src={Logo} alt="logo_senac"/>
                <input
                    type="datetime-local"
                    placeholder="Hora"
                    onChange={e => setHora(e.target.value)}
                />    
                <input 
                    type="number"
                    placeholder="Status"
                    onChange={e => setStatus(e.target.value)}
                />
                <button type="submit">Cadastro de Pedidos</button>
            </Form>
        </Container>
    </div>    
)
}

export default Pedidos;