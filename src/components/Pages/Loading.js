import React from 'react';
import GameCard from '../Parts/Profile/GazeboSquare'
import {Paper, Grid, Container, Card,CardContent,Slide, Typography,CircularProgress, Avatar, Divider,Tooltip,IconButton,Modal,Backdrop,Fade} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {useAppState} from '../../AppState.js'
import AddIcon from '@material-ui/icons/Add';
import Favorites from '../Parts/HomePage/favoritesBar'
import Collage from '../../images/profile_backgrounds/collage.png'
import {useHistory} from 'react-router-dom'
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

 

const Loading = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const history = useHistory(); 
    const {state, dispatch} = useAppState()
    const {token} = state
  

React.useEffect(() => {
    if(state.user_id != 0 && state.username != null) {
        history.push(`/`)
    }
}, [state])


return (

    <div className={classes.root}>      
    <CircularProgress color="secondary" />
    </div>
    )
}

export default Loading