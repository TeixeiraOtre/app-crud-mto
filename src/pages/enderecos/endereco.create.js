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
import cepPromise from 'cep-promise';

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

export default function EnderecoCadastro() {
  const classes = useStyles();

  const [cep, setCEP] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUF] = useState('');
  const [cliente, setCliente] = useState('');


  useEffect(() => {
    setCliente(localStorage.getItem('cliente'));
  });

  const maskCEP = value => {
    setCEP(value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2"));
  };

  const history = useHistory();

  async function handleSubmit(){
    const data = {
      cep:cep, 
      logradouro:logradouro, 
      numero_endereco:numero, 
      complemento:complemento,
      bairro:bairro,
      localidade:localidade,
      uf:uf,
      cliente_id:cliente
    }

    if ( (cep === '') || (cep.length < 9) ) {
      alert('ERRO! Existem campos inválidos.');
    }else{
      if ( (logradouro === '') || (logradouro.length < 6) ) {
        alert('ERRO! Existem campos inválidos.');
      }else{
        if ( numero === '' ) {
          alert('ERRO! Existem campos inválidos.');
        }else{
          if( logradouro === '' ) {
            alert('ERRO! Existem campos inválidos.');
          }else{
            if ( bairro === '' ) {
              alert('ERRO! Existem campos inválidos.');
            }else{
              if ( localidade === '' ) {
                alert('ERRO! Existem campos inválidos.');
              }else{
                if ( uf === '' ) {
                  alert('ERRO! Existem campos inválidos.');
                }else{
                  const response = await api.post('/api/enderecos', data);
      
                  if(response.status === 201){
                    alert('SUCESSO! Endereço cadastrado.');
                    localStorage.removeItem('cliente');
                    history.go(-1);
                  }else{
                    alert('ERRO! Tente novamente em alguns minutos.');
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuHome title={'ENDEREÇOS'} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
                <Paper className={classes.paper}>
                <Grid item xs={12} sm={12}>
                  <GoBackButton />
                </Grid>
                <h1>Cadastro de Endereço</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={3} sm={3}>
                            <TextField
                                id="cep"
                                name="cep"
                                label="CEP"
                                fullWidth
                                autoComplete="CEP"
                                value={cep}
                                onChange={e => {
                                  maskCEP(e.target.value);
                                }}
                                onBlur={e => {
                                  cepPromise(e.target.value).then(res => {
                                    setUF(res.state);
                                    setLocalidade(res.city);
                                    setBairro(res.neighborhood);
                                    setLogradouro(res.street);
                                  });
                                }}
                                error={(cep === '') || (cep.length < 9)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="logradouro"
                                name="logradouro"
                                label="Logradouro"
                                fullWidth
                                autoComplete="logradouro"
                                value={logradouro}
                                onChange={e => setLogradouro(e.target.value)}
                                error={(logradouro === '') || (logradouro.length < 6)}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3}>
                            <TextField
                                id="numero_endereco"
                                name="numero_endereco"
                                label="Número"
                                fullWidth
                                autoComplete="numero_endereco"
                                value={numero}
                                required={true}
                                onChange={e => setNumero(e.target.value)}
                                error={numero === ''}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                id="complemento"
                                name="complemento"
                                label="Complemento"
                                fullWidth
                                autoComplete="complemento"
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                id="bairro"
                                name="bairro"
                                label="Bairro"
                                fullWidth
                                autoComplete="bairro"
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}
                                error={bairro === ''}
                            />
                        </Grid>
                        <Grid item xs={9} sm={9}>
                            <TextField
                                id="localidade"
                                name="localidade"
                                label="Localidade"
                                fullWidth
                                autoComplete="localidade"
                                value={localidade}
                                onChange={e => setLocalidade(e.target.value)}
                                error={localidade === ''}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3}>
                            <TextField
                                id="uf"
                                name="uf"
                                label="UF"
                                fullWidth
                                autoComplete="uf"
                                value={uf}
                                onChange={e => setUF(e.target.value)}
                                error={uf === ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} container justifyContent="flex-end">
                          <Button variant="contained" onClick={handleSubmit} color="primary">
                            NOVO ENDEREÇO
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
