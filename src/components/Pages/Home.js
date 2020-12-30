import React from 'react';
import GameCard from '../Parts/Profile/GazeboSquare'
import {Paper, Grid, TextField,Typography,Slide,Zoom,IconButton,Modal,Backdrop,Fade} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {useAppState} from '../../AppState.js'
import AddIcon from '@material-ui/icons/Add';
import Favorites from '../Parts/HomePage/favoritesBar'
import Collage from '../../images/profile_backgrounds/collage.png'
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
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
    const {state, dispatch} = useAppState()
    const {token} = state
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (

    <div className={classes.root}>      
    <Grid container justify="space-between" direction = "row" spacing={2}>
        {/* The Feed bar */}
        
        <Slide in={'true'} direction={"right"} timeout={1200}>
         <Grid container item direction ="column" xs={12} sm={9}>
         
            <Paper className={classes.paperComponents}>
                <Grid item xs={12}>
                            <Typography variant="h5" style={{textAlign: 'center'}}>
                                Following Feed:
                            </Typography>
                </Grid>
            <Paper>
                <Grid container item xs={12}>
                    <Grid item xs={10}> 
                        <form className={classes.root} noValidate autoComplete="off" style={{padding: '10 auto'}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Write a status"
                                    multiline
                                    fullWidth="true"
                                    rows={4}
                                    placeholder="write a status"
                                    variant="outlined"
                                />
                            </form>
                    </Grid>
                    <Grid item xs={2} alignItems="center" justify="center">
                        <SendIcon />
                    </Grid>  
                </Grid>
            </Paper> 
            </Paper>

            <Paper className={classes.paperComponents} style={{height: '100vh'}}>
                <Grid container item xs={12} style={{marginTop: '30'}}>
                            
                            <Typography variant="h5" style={{textAlign: 'center'}}>
                            
                            </Typography>
                </Grid>
            </Paper>
            
         </Grid>
         </Slide>

        
        {/* The Favorites bar */}
        <Slide in={'true'} direction={"left"} timeout={1000}>
        <Grid container item direction="column" xs={12} sm={3}>
        <Paper className={classes.paperComponents} style={{height: '100vh', backgroundImage: `url(${Collage})`}}>
            <Paper>
            <Grid item xs={12} alignItems="center" className={classes.columns}>
                    <Typography variant="h5"style={{textAlign: 'center'}}>
                            Who are you following?
                    </Typography>       
            </Grid>
            </Paper>
            <Grid container item xs={12} spacing={1} justify="center">
                <Favorites />
            </Grid>
        </Paper>                   
        </Grid>
        </Slide>
    </Grid>
    </div>
    )
}

export default Home