import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 35,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    minWidth: 650,
  },
}));

export default function ClientesListagem() {
  const classes = useStyles();

  const [clientes, setClientes] = useState([]);

  useEffect(() =>{

    async function loadClientes(){
      const response = await api.get('/api/clientes');
      setClientes(response.data.clientes);
    }
    loadClientes();
  }, []);

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

  return (
    <div className={classes.root}>
      <MenuHome title={'CLIENTES'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12} sm={12}>
                  <GoBackButton />
                </Grid>
                <h1>Listagem de Clientes</h1>
                    <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center">Telefone</TableCell>
                              <TableCell align="center">Data Cadastro</TableCell>
                              <TableCell align="center">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {clientes.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.nome_cliente}
                                </TableCell>
                                <TableCell align="center">{row.email_cliente}</TableCell>
                                <TableCell align="center">{row.telefone_cliente}</TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                <TableCell align="center">
                                  <ButtonGroup size="small" aria-label="text primary button group">
                                    <Button href={'/clientes/detalhes/'+row._id}><VisibilityIcon/></Button>
                                    <Button color="primary" href={'/clientes/editar/'+row._id}><EditIcon/></Button>
                                    <Button color="secondary" onClick={() => handleDelete(row._id)}><DeleteForeverIcon/></Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={12} container justifyContent="flex-end">
                      <Button variant="contained" color="primary" href={'/clientes/cadastrar/'}>CADASTRAR</Button>
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
