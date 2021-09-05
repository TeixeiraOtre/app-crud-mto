import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GoBackButton from '../../components/goBackButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

export default function ClienteDetalhes() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [enderecos, setEnderecos] = useState([]);

  const { idCliente } = useParams();

  useEffect(() => {
    async function getCliente(){
      var response = await api.get('/api/clientes.details/'+idCliente);

      setNome(response.data.cliente.nome_cliente);
      setEmail(response.data.cliente.email_cliente);
      setTelefone(response.data.cliente.telefone_cliente);
      setEnderecos(response.data.cliente.enderecos);
    }
    getCliente();
  }, [])

  async function handleDelete(id){
    if(window.confirm("Realmente deseja deletar este cliente?")){
      var result = await api.delete('/api/clientes/'+id);
      if(result.status === 200){
        window.location.href = '/clientes';
      }else{
        alert('ERRO! Por favor, tente novamente!')
      }
    }
  }

  async function handleDeleteEndereco(id){
    if(window.confirm("Realmente deseja deletar este endereço?")){
      var result = await api.delete('/api/enderecos/'+id);
      if(result.status === 200){
        window.location.reload();
      }else{
        alert('ERRO! Por favor, tente novamente!')
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
                <h1>Detalhes de Cliente</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="nome"
                                name="nome"
                                label="Nome Completo"
                                fullWidth
                                autoComplete="nome"
                                value={nome}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="email"
                                name="email"
                                label="E-mail"
                                fullWidth
                                autoComplete="email"
                                value={email}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="telefone"
                                name="telefone"
                                label="Telefone"
                                fullWidth
                                autoComplete="telefone"
                                value={telefone}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} container justifyContent="space-between">
                          <Button variant="contained" href={'/clientes/editar/'+idCliente} color="primary">
                            EDITAR
                          </Button>
                          <Button ml="auto" variant="contained" onClick={() => handleDelete(idCliente)} color="secondary">
                            DELETAR
                          </Button>
                        </Grid>
                    </Grid>
                <h1>Endereços do Cliente</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>CEP</TableCell>
                              <TableCell align="center">Logradouro</TableCell>
                              <TableCell align="center">Número</TableCell>
                              <TableCell align="center">Complemento</TableCell>
                              <TableCell align="center">Bairro</TableCell>
                              <TableCell align="center">Localidade</TableCell>
                              <TableCell align="center">Estado</TableCell>
                              <TableCell align="center">Data Cadastro</TableCell>
                              <TableCell align="center">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {enderecos.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.cep}
                                </TableCell>
                                <TableCell align="center">{row.logradouro}</TableCell>
                                <TableCell align="center">{row.numero_endereco}</TableCell>
                                <TableCell align="center">{row.complemento}</TableCell>
                                <TableCell align="center">{row.bairro}</TableCell>
                                <TableCell align="center">{row.localidade}</TableCell>
                                <TableCell align="center">{row.uf}</TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                <TableCell align="center">
                                  <ButtonGroup size="small" aria-label="text primary button group">
                                    <Button href={'/enderecos/detalhes/'+row._id}><VisibilityIcon/></Button>
                                    <Button color="primary" href={'/enderecos/editar/'+row._id}><EditIcon/></Button>
                                    <Button color="secondary" onClick={() => handleDeleteEndereco(row._id)}><DeleteForeverIcon/></Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={12} container justifyContent="flex-end">
                      <Button variant="contained" color="primary" href={'/enderecos/cadastrar/'} onClick={() => localStorage.setItem('cliente', idCliente)}>CADASTRAR</Button>
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
