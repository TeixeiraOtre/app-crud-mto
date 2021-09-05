import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GoBackButton from '../../components/goBackButton';

import MenuHome from '../../components/menu-home';
import Footer from '../../components/footer';

import api from '../../services/api';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 35,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function ClienteEditar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const { idCliente } = useParams();

  useEffect(() => {
    async function getCliente(){
      var response = await api.get('/api/clientes.details/'+idCliente);

      setNome(response.data.cliente.nome_cliente);
      setEmail(response.data.cliente.email_cliente);
      setTelefone(response.data.cliente.telefone_cliente);
    }
    getCliente();
  }, [])

  async function handleSubmit(){
    const data = {
      _id:idCliente,
      nome_cliente:nome, 
      email_cliente:email, 
      telefone_cliente:telefone
    }

    // FAZER A VALIDAÇÃO NECESSÁRIA PARA ENVIO!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const response = await api.put('/api/clientes', data);

    if(response.status === 200){
      window.location.href='/clientes'
    }else{
      alert('Erro ao atualizar cliente!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuHome title={'CLIENTES'} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
                <Paper className={classes.paper}>
                <Grid item xs={12} sm={12}>
                  <GoBackButton />
                </Grid>
                <h1>Atualização de Cliente</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="nome"
                                name="nome"
                                label="Nome Completo"
                                fullWidth
                                autoComplete="nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="E-mail"
                                fullWidth
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="telefone"
                                name="telefone"
                                label="Telefone"
                                fullWidth
                                autoComplete="telefone"
                                value={telefone}
                                onChange={e => setTelefone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} container justifyContent="flex-end">
                          <Button variant="contained" onClick={handleSubmit} color="primary">
                            SALVAR
                          </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
