import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import imageMongo from '../../assets/mongodb_logo.jpeg';
import imageNode from '../../assets/nodejs_logo.png';
import imageReact from '../../assets/reactjs_logo.jpeg';

import MenuHome from '../../components/menu-home';
import Footer from '../../components/footer';

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
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '99.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Inicio() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuHome title={'INÍCIO'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Grid item xs={12}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                BEM-VINDO!
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Este é um projeto-teste de um CRUD básico, utilizando das seguintes tecnologias:
              </Typography>
            </Grid>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card} onClick={() => window.open("https://nodejs.org/en/","_blank")}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={imageNode}
                    title="nodejs_logo"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      NodeJS
                    </Typography>
                    <Typography>
                      API construída com a Tecnologia NodeJS.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card} onClick={() => window.open("https://www.mongodb.com/pt-br","_blank")}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={imageMongo}
                    title="mongodb_logo"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      MongoDB
                    </Typography>
                    <Typography>
                      Banco de Dados estruturizado em MongoDB.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card} onClick={() => window.open("https://pt-br.reactjs.org/","_blank")}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={imageReact}
                    title="react_logo"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      ReactJS
                    </Typography>
                    <Typography>
                      Front-End construído com ReactJS,
                      utilizando da biblioteca Material UI.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} align='center'>
                <Button variant="contained" color={'primary'} href={'/clientes'}>Visualizar Clientes</Button>
              </Grid>
          </Grid>
        </Container>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
