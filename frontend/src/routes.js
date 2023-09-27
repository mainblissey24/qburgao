import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate }
    from 'react-router-dom';
import { isAuthenticated } from "./services/auth";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import Produto from './pages/Produto';
import Produtos from './pages/Produtos';
import Pedidos from "./pages/Pedidos";
import Pedido from "./pages/Pedido";
import Produtos_Pedidos from "./pages/Produtos_Pedidos";

const LoginPage = () => <Login />;
const SignUpPage = () => <SignUp />;
const UsuariosPage = () => <Usuarios />
const ProdutoPage = () => <Produto />
const ProdutosPage = () => <Produtos />
const PedidosPage = () => <Pedidos />
const PedidoPage = () => <Pedido />
const PedidoProdutoPage = () => <Produtos_Pedidos />
const NotFoundPage = () => <h1>Page not found.</h1>
    const AppPage = () => {
        if (!isAuthenticated()) {
            return <Navigate to="/" replace />
        }
        return <h1>App</h1>;
    }

    const Rotas = () => (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/app' element={<AppPage />} />
                <Route path='/usuarios' element={<UsuariosPage />} />
                <Route path='/signup/:id' element={<SignUpPage />} />
                <Route path='/produtos' element={<ProdutosPage />} />
                <Route path='/produtos/:id' element={<ProdutoPage />} />
                <Route path='/produto' element={<ProdutoPage />} />
                <Route path='/pedidos' element={<PedidosPage />} />
                <Route path='/pedido' element={<PedidoPage />} />
                <Route path='/produtos_pedidos' element={<PedidoProdutoPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    );

    export default Rotas;
