import React from 'react';
import GameCard from '../Parts/Profile/GazeboSquare'
import {Paper, Grid, Container, Card,CardContent,Slide, Typography,CircularProgress, Avatar, Divider,Tooltip,IconButton,Modal,Backdrop,Fade} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {useAppState} from '../../AppState.js'
import AddIcon from '@material-ui/icons/Add';
import FormGS from '../Parts/Profile/FormGS'
import Collage from '../../images/profile_backgrounds/collage.png'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      color: theme.palette.text.primary,
      background:theme.palette.secondary.dark,
      marginTop: 10,
      paddingBottom: 10

    },
    paperComponents: {
        background: '#39203C',
        textAlign: 'center'
    },
    grid: {
     marginTop: 15,
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    columns: {
        textAlign:'center'
    }
  }));

const Home = () => {
    const classes = useStyles();


    const loaded = () => {
       
    }

    return (

    <div className={classes.root}>      
    <Container>
    <Grid container justify="space-between" direction = "row" xs={12}>
        {/* The News bar */}
        <Paper className={classes.paperComponents}>
            <Grid container item direction ="column" sm={3}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </Paper>
        {/* The Feed bar */}
        <Paper className={classes.paperComponents}>
             <Grid container item direction ="column" sm={7}>
             <Grid item xs={12}>
                    Feed
                </Grid>
            </Grid>
        </Paper>
        {/* The Favorites bar */}
            <Grid container item direction="column" sm={3}>
            <Paper className={classes.paperComponents}>
                <Grid item xs={12} alignItems="center" className={classes.columns}>
                        <Typography variant="h5"style={{textAlign: 'center'}}>
                            Favorites
                        </Typography>
                </Grid>
                <Divider orientation="horizontal" flexItem />
                
            </Paper>                   
            </Grid>
    </Grid>
    </Container> 
    </div>
    )
}

export default Home