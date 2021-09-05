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

export default function EnderecoEditar() {
  const classes = useStyles();

  const [cep, setCEP] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUF] = useState('');

  const { idEndereco } = useParams();

  useEffect(() => {
    async function getEndereco(){
      var response = await api.get('/api/enderecos.details/'+idEndereco);
      console.log(response.data);

      setCEP(response.data.endereco.cep);
      setLogradouro(response.data.endereco.logradouro);
      setNumero(response.data.endereco.numero_endereco);
      setComplemento(response.data.endereco.complemento);
      setBairro(response.data.endereco.bairro);
      setLocalidade(response.data.endereco.localidade);
      setUF(response.data.endereco.uf);

    }
    getEndereco();
  }, [])

  async function handleSubmit(){
    const data = {
      _id:idEndereco,
      cep:cep, 
      logradouro:logradouro, 
      numero_endereco:numero, 
      complemento:complemento,
      bairro:bairro,
      localidade:localidade,
      uf:uf
    }

    // FAZER A VALIDAÇÃO NECESSÁRIA PARA ENVIO!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const response = await api.put('/api/enderecos', data);

    if(response.status === 200){
      alert('Endereço atualizado com SUCESSO!');
      window.location.reload();
    }else{
      alert('Erro ao atualizar cliente!');
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
                <h1>Atualização de Endereço</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={3} sm={3}>
                            <TextField
                                id="cep"
                                name="cep"
                                label="CEP"
                                fullWidth
                                autoComplete="CEP"
                                value={cep}
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
                            />
                        </Grid>
                        <Grid item xs={3} sm={3}>
                            <TextField
                                id="numero_endereco"
                                name="numero_endereco"
                                label="Numero"
                                fullWidth
                                autoComplete="numero_endereco"
                                value={numero}
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
