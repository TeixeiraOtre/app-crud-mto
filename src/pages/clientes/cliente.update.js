import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GoBackButton from '../../components/goBackButton';
import { useHistory } from 'react-router';

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
  const [error, setError] = useState(false);

  const { idCliente } = useParams();

  const history = useHistory();

  useEffect(() => {
    async function getCliente(){
      var response = await api.get('/api/clientes.details/'+idCliente);

      setNome(response.data.cliente.nome_cliente);
      setEmail(response.data.cliente.email_cliente);
      setTelefone(response.data.cliente.telefone_cliente);
    }
    getCliente();
  }, [])

  const validateEmail = ( email ) => {
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if ( !re.test(email) ) {
      setError(true);
    }else{
      setError(false);
    }
  }

  const maskPhone = value => {
    setTelefone( value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})(\d)/, "$1$2"))
  };

  async function handleSubmit(){
    const data = {
      _id:idCliente,
      nome_cliente:nome, 
      email_cliente:email, 
      telefone_cliente:telefone
    }

    if ( (nome === '') || (nome.length < 3) ) {
      alert('Existem campos com conteúdo INVÁLIDO. Corrija-os e tente novamente!');
    }else{
      if ( (email === '') || (email.length < 3) || error) {
        alert('Existem campos com conteúdo INVÁLIDO. Corrija-os e tente novamente!');
      }else{
        if ( (telefone === '') || (telefone.length < 3) || error) {
          alert('Existem campos com conteúdo INVÁLIDO. Corrija-os e tente novamente!');
        }else{
          const response = await api.put('/api/clientes', data);

          if(response.status === 200){
            alert('SUCESSO! Cliente atualizado.');
            history.go(-1);
          }else{
            alert('ERRO! Tente novamente em alguns minutos.');
          }
        }
      }
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
                                error={(nome === '') || (nome.length < 3)}
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
                                onBlur={ e => validateEmail(e.target.value)}
                                error={error || (email === '')}
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
                                onChange={e => maskPhone(e.target.value)}
                                error={(telefone === '') || (telefone.length < 10)}
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
