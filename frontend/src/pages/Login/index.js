import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';

const SignIn = () =>{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async e =>{
        e.preventDefault();
        if(!email || !senha){
            setError("Preencha email e senha para continuar!");
            return;
        }
        try{
            const response = await api.post("/signin", {email, senha});
            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/app");
        }catch (err){
            setError("Houve um problema com o login, verifique suas credenciais!!");
        }
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSignIn}>
                {error && <p>{error}</p>}
                <input
                type="email"
                placeholder='Endereço de email'
                onChange={e=>setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder='Senha'
                onChange={e=>setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}
export default SignIn;