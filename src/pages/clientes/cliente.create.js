import React, { useState } from 'react';
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

export default function ClienteCadastro() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState(false);

  let validateEmail = ( email ) => {
    console.log(email);
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    console.log(re.test(email));
    if ( !re.test(email) ) {
      setError(true);
      setHelperText('Email inválido.');
      console.log('deu errado')
    }else{
      setError(false);
      setHelperText(null);
      console.log('deu certo')
    }
  }

  const maskPhone = value => {
    setTelefone( value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})(\d)/, "$1-$2"))
  };

  async function handleSubmit(){
    const data = {
      nome_cliente:nome, 
      email_cliente:email, 
      telefone_cliente:telefone
    }

    const maskOnlyNumbers = value => {
      setTelefone(value.replace(/\D/g, ""));
    };

    const response = await api.post('/api/clientes', data);

    if(response.status === 201){
      window.location.href='/clientes'
    }else{
      alert('Erro ao cadastrar cliente!');
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
                <h1>Cadastro de Cliente</h1>
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
                                onBlur={ e => validateEmail(e.target.value)}
                                error={error}
                                helperText={helperText}
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} container justifyContent="flex-end">
                          <Button variant="contained" onClick={() => handleSubmit()} color="primary">
                            NOVO CLIENTE
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