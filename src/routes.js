import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Rotas de Clientes
import Clientes from './pages/clientes/clientes.listagem';
import ClienteEditar from './pages/clientes/cliente.update';
import ClienteDetalhes from './pages/clientes/cliente.details';
import ClienteCadastrar from './pages/clientes/cliente.create';

// Rotas de Endereços
import EnderecoEditar from './pages/enderecos/endereco.update';
import EnderecoDetalhes from './pages/enderecos/endereco.details';
import EnderecoCadastrar from './pages/enderecos/endereco.create';

// Rota Home
import Home from './pages/home/home';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                {/* <Route path="/produtos/:idProduto" exact component={ProdutoDetalhes} /> */}
                
                <Route path="/clientes" exact component={Clientes} />
                <Route path="/clientes/cadastrar" exact component={ClienteCadastrar} />
                <Route path="/clientes/detalhes/:idCliente" exact component={ClienteDetalhes} />
                <Route path="/clientes/editar/:idCliente" exact component={ClienteEditar} />
                
                <Route path="/enderecos/cadastrar" exact component={EnderecoCadastrar} />
                <Route path="/enderecos/detalhes/:idEndereco" exact component={EnderecoDetalhes} />
                <Route path="/enderecos/editar/:idEndereco" exact component={EnderecoEditar} />
            </Switch>
        </BrowserRouter>
    )
}
